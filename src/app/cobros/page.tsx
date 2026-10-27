"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CreditCard, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cobros } from "@/data/mock";
import { formatCLP } from "@/lib/utils";

export default function CobrosPage() {
  const totalRecibido = cobros
    .filter((c) => c.status === "recibido")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalPendiente = cobros
    .filter((c) => c.status === "pendiente")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalVencido = cobros
    .filter((c) => c.status === "vencido")
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <DashboardLayout title="Cobros y pagos">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Cobros recibidos</p>
                <p className="text-2xl font-bold text-text">${totalRecibido.toLocaleString("es-CL")}</p>
              </div>
              <CreditCard className="w-8 h-8 text-success" />
            </div>
            <div className="flex items-center gap-1 text-success text-sm">
              <ArrowUpRight className="w-3 h-3" />
              <span>Todos los pagos del mes registrados</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Pendientes de cobro</p>
                <p className="text-2xl font-bold text-text">${totalPendiente.toLocaleString("es-CL")}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
            <div className="flex items-center gap-1 text-warning text-sm">
              <span>2 pacientes con saldo pendiente</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Vencidos</p>
                <p className="text-2xl font-bold text-text">${totalVencido.toLocaleString("es-CL")}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-error" />
            </div>
            <div className="flex items-center gap-1 text-error text-sm">
              <ArrowDownRight className="w-3 h-3" />
              <span>1 pago vencido de Matías Fernández</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-semibold text-text mb-4">Historial de cobros</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Paciente</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Monto</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Fecha</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Método</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {cobros.map((c) => (
                    <tr key={c.id} className="hover:bg-secondary transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text">{c.patient}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text">${c.amount.toLocaleString("es-CL")}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-muted">{c.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-muted">{c.method}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant={
                            c.status === "recibido"
                              ? "success"
                              : c.status === "pendiente"
                              ? "warning"
                              : "error"
                          }
                          className="text-[10px]"
                        >
                          {c.status === "recibido" ? "Recibido" : c.status === "pendiente" ? "Pendiente" : "Vencido"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-sm font-semibold text-text mb-4">Resumen mensual</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm text-text">Total facturado este mes</span>
                </div>
                <span className="text-sm font-bold text-text">${totalRecibido.toLocaleString("es-CL")}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-sm text-text">Por cobrar</span>
                </div>
                <span className="text-sm font-bold text-text">${totalPendiente.toLocaleString("es-CL")}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error" />
                  <span className="text-sm text-text">Vencidos</span>
                </div>
                <span className="text-sm font-bold text-text">${totalVencido.toLocaleString("es-CL")}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
