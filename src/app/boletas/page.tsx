"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { FileText, Plus, ArrowRight, Clock, X, Search as SearchIcon } from "lucide-react";
import { boletas } from "@/data/mock";
import { formatCLP } from "@/lib/utils";

interface NewBoletaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NewBoletaModal({ isOpen, onClose }: NewBoletaModalProps) {
  const [patient, setPatient] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("sesión de psicología individual");
  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    if (!date) {
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Simulación: boleta emitida para ${patient} por ${formatCLP(parseInt(amount || "0"))}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full max-w-md p-6 rounded-xl border border-border shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">Emitir boleta nueva</h2>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-error transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-text">Paciente</label>
            <Input
              placeholder="Nombre del paciente"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text">Monto (CLP)</label>
            <Input
              type="number"
              placeholder="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text">Concepto</label>
            <Input
              placeholder="Sesión de psicología"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text">Fecha</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit" className="flex-1">Emitir boleta</Button>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface BoletaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  boleta: typeof boletas[0];
}

function BoletaDetailModal({ isOpen, onClose, boleta }: BoletaDetailModalProps) {
  if (!isOpen) return null;

  const handleChangeStatus = (newStatus: string) => {
    alert(`Simulación: boleta ${boleta.id} cambiada a ${newStatus}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full max-w-md p-6 rounded-xl border border-border shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">Detalle de boleta</h2>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-error transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Folio</span>
            <span className="text-sm font-mono text-text">{boleta.folio}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Paciente</span>
            <span className="text-sm font-medium text-text">{boleta.patient}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Monto</span>
            <span className="text-sm font-bold text-text">${formatCLP(boleta.amount)}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Fecha</span>
            <span className="text-sm text-text-muted">{boleta.date}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Estado actual</span>
            <Badge variant={boleta.status === "emitida" ? "success" : boleta.status === "pendiente" ? "warning" : "error"} className="text-[10px]">
              {boleta.status === "emitida" ? "Emitida" : boleta.status === "pendiente" ? "Pendiente" : "Anulada"}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Concepto</span>
            <span className="text-sm text-text">{boleta.description}</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Cambiar estado</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleChangeStatus("emitida")} disabled={boleta.status === "emitida"}>
              Emitida
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleChangeStatus("pendiente")} disabled={boleta.status === "pendiente"}>
              Pendiente
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleChangeStatus("anulada")} disabled={boleta.status === "anulada"}>
              Anulada
            </Button>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" size="sm" onClick={() => { alert("Simulación: descargando PDF"); }} className="flex-1">
            <FileText className="w-4 h-4 mr-2" /> Descargar PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="flex-1">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BoletasPage() {
  const [statusFilter, setStatusFilter] = React.useState("todos");
  const [search, setSearch] = React.useState("");
  const [newBoletaOpen, setNewBoletaOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [selectedBoleta, setSelectedBoleta] = React.useState<typeof boletas[0] | null>(null);

  const filtered = boletas.filter((b) => {
    const matchesSearch = b.patient.toLowerCase().includes(search.toLowerCase()) || b.folio.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === "todos" || b.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: boletas.length,
    emitidas: boletas.filter((b) => b.status === "emitida").length,
    pendientes: boletas.filter((b) => b.status === "pendiente").length,
    anuladas: boletas.filter((b) => b.status === "anulada").length,
  };

  return (
    <DashboardLayout title="Boletas de honorarios">
      <NewBoletaModal isOpen={newBoletaOpen} onClose={() => setNewBoletaOpen(false)} />
      <BoletaDetailModal
        isOpen={detailOpen}
        onClose={() => { setDetailOpen(false); setSelectedBoleta(null); }}
        boleta={selectedBoleta!}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar actions */}
        <div className="lg:w-1/4 flex flex-col gap-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-text">Acciones rápidas</h3>
              </div>
              <div className="space-y-3">
                <Button onClick={() => setNewBoletaOpen(true)} className="w-full flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Emitir boleta nueva
                </Button>
                <Button variant="outline" onClick={() => setStatusFilter("pendiente")} className="w-full flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Ver pendientes
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-auto p-6 bg-secondary/50 rounded-xl border border-border">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Resumen</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Total boletas</span>
                <span className="font-medium text-text">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Emitidas</span>
                <span className="font-medium text-success">{stats.emitidas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Pendientes</span>
                <span className="font-medium text-warning">{stats.pendientes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Anuladas</span>
                <span className="font-medium text-error">{stats.anuladas}</span>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text">Documentos emitidos</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar por folio o paciente"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
              <Button onClick={() => setNewBoletaOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> Nueva boleta
              </Button>
            </div>
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
                    <tr key={b.id} className="hover:bg-secondary transition-colors cursor-pointer group" onClick={() => { setSelectedBoleta(b); setDetailOpen(true); }}>
                      <td className="px-6 py-4">
                        <p className="text-sm font-mono text-text">{b.folio}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text">{b.patient}</p>
                        <p className="text-xs text-text-muted">{b.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text">${formatCLP(b.amount)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-muted">{b.date}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={b.status === "emitida" ? "success" : b.status === "pendiente" ? "warning" : "error"} className="text-[10px]">
                          {b.status === "emitida" ? "Emitida" : b.status === "pendiente" ? "Pendiente" : "Anulada"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="ghost" size="sm" className="p-1" onClick={(e) => { e.stopPropagation(); setSelectedBoleta(b); setDetailOpen(true); }}>
                          <FileText className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                        No se encontraron boletas
                      </td>
                    </tr>
                  )}
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
