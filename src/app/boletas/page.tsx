"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { FileText, Plus, ArrowRight, Clock } from "lucide-react";
import { boletas } from "@/data/mock";
import { formatCLP } from "@/lib/utils";

export default function BoletasPage() {
  const [statusFilter, setStatusFilter] = React.useState("todos");

  const filtered = boletas.filter(
    (b) => statusFilter === "todos" || b.status === statusFilter
  );

  return (
    <DashboardLayout title="Boletas de honorarios">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar actions */}
        <div className="lg:w-1/4 flex flex-col gap-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-text">Acciones rápidas</h3>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => {}}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Emitir boleta nueva
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {}}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Ver pendientes
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-auto">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Filtrar por estado</p>
            <div className="space-y-2">
              {[
                { value: "todos", label: "Todas" },
                { value: "emitida", label: "Emitidas" },
                { value: "pendiente", label: "Pendientes" },
                { value: "anulada", label: "Anuladas" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setStatusFilter(item.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    statusFilter === item.value
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:bg-secondary"
                  }`}
                >
                  <span>{item.label}</span>
                  {statusFilter === item.value && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text">Documentos emitidos</h2>
            <Button>
              Nueva boleta
            </Button>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Folio</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Paciente</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Monto</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Fecha</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Estado</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-secondary transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-mono text-text">{b.folio}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text">{b.patient}</p>
                        <p className="text-xs text-text-muted">{b.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text">
                          ${b.amount.toLocaleString("es-CL")}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-muted">{b.date}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant={
                            b.status === "emitida"
                              ? "success"
                              : b.status === "pendiente"
                              ? "warning"
                              : b.status === "anulada"
                              ? "error"
                              : "default"
                          }
                          className="text-[10px]"
                        >
                          {b.status === "emitida" ? "Emitida" : b.status === "pendiente" ? "Pendiente" : "Anulada"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/boletas/${b.id}`}
                            className="p-2 text-text-muted hover:text-primary transition-colors"
                            title="Ver detalle"
                          >
                            <FileText className="w-4 h-4" />
                          </Link>
                          <Button variant="ghost" size="sm" className="p-1">
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Concepto de boleta</CardTitle>
                <CardDescription>
                  Ejemplo de estructura de boleta de honorarios (simulación visual).
                </CardDescription>
              </CardHeader>
              <div className="p-6 border border-border rounded-xl bg-secondary/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Prestador</p>
                    <p className="text-sm font-medium text-text">Camila Rojas - Psicóloga</p>
                    <p className="text-xs text-text-muted">RUT: 12.345.678-9</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Boleta N°</p>
                    <p className="text-sm font-medium text-text">45.123.456-7</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Paciente</p>
                  <p className="text-sm text-text">Ana Torres</p>
                  <p className="text-xs text-text-muted">RUT: 98.765.432-1</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Detalle del servicio</p>
                  <p className="text-sm text-text">Sesión de psicología individual - 12 de mayo de 2025</p>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-border">
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Monto total</p>
                    <p className="text-lg font-bold text-text">${formatCLP(50000)}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Descargar PDF
                  </Button>
                </div>
                <p className="mt-4 text-xs text-text-muted">
                  Nota: Esta es una simulación visual. No se genera una conexión real con el SII.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
