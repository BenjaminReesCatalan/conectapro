"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Search as SearchIcon } from "lucide-react";
import { cobros } from "@/data/mock";
import { formatCLP } from "@/lib/utils";

interface CobroDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cobro: typeof cobros[0];
}

function CobroDetailModal({ isOpen, onClose, cobro }: CobroDetailModalProps) {
  if (!isOpen) return null;

  const handleMarkReceived = () => {
    alert(`Simulación: cobro ${cobro.id} de ${cobro.patient} marcado como recibido`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full max-w-md p-6 rounded-xl border border-border shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">Detalle del cobro</h2>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-error transition-colors">
            <span className="w-5 h-5">✕</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Paciente</span>
            <span className="text-sm font-medium text-text">{cobro.patient}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Monto</span>
            <span className="text-sm font-bold text-text">${formatCLP(cobro.amount)}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Fecha</span>
            <span className="text-sm text-text-muted">{cobro.date}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Método</span>
            <span className="text-sm text-text">{cobro.method}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Estado actual</span>
            <Badge variant={cobro.status === "recibido" ? "success" : cobro.status === "pendiente" ? "warning" : "error"} className="text-[10px]">
              {cobro.status === "recibido" ? "Recibido" : cobro.status === "pendiente" ? "Pendiente" : "Vencido"}
            </Badge>
          </div>
        </div>

        {cobro.status !== "recibido" && (
          <div className="mt-6">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Acción</p>
            <Button onClick={handleMarkReceived} className="w-full">
              Marcar como recibido
            </Button>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CobrosPage() {
  const [statusFilter, setStatusFilter] = React.useState("todos");
  const [search, setSearch] = React.useState("");
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [selectedCobro, setSelectedCobro] = React.useState<typeof cobros[0] | null>(null);

  const filtered = cobros.filter((c) => {
    const matchesSearch = c.patient.toLowerCase().includes(search.toLowerCase()) || c.method.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === "todos" || c.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const totalRecibido = filtered.filter((c) => c.status === "recibido").reduce((sum, c) => sum + c.amount, 0);
  const totalPendiente = filtered.filter((c) => c.status === "pendiente").reduce((sum, c) => sum + c.amount, 0);
  const totalVencido = filtered.filter((c) => c.status === "vencido").reduce((sum, c) => sum + c.amount, 0);

  return (
    <DashboardLayout title="Cobros y pagos">
      <CobroDetailModal
        isOpen={detailOpen}
        onClose={() => { setDetailOpen(false); setSelectedCobro(null); }}
        cobro={selectedCobro!}
      />

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
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text">Historial de cobros</h3>
                <div className="flex items-center gap-2">
                  <SearchIcon className="w-4 h-4 text-text-muted" />
                  <input
                    type="search"
                    placeholder="Buscar paciente o método..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 h-9 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {[
                  { value: "todos", label: "Todos" },
                  { value: "recibido", label: "Recibido" },
                  { value: "pendiente", label: "Pendiente" },
                  { value: "vencido", label: "Vencido" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setStatusFilter(item.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === item.value
                        ? "bg-primary text-white"
                        : "text-text-muted hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-xs font-semibold text-text-muted">Paciente</th>
                      <th className="px-6 py-3 text-xs font-semibold text-text-muted">Monto</th>
                      <th className="px-6 py-3 text-xs font-semibold text-text-muted">Fecha</th>
                      <th className="px-6 py-3 text-xs font-semibold text-text-muted">Método</th>
                      <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Estado</th>
                      <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((c) => (
                      <tr key={c.id} className="hover:bg-secondary transition-colors cursor-pointer group" onClick={() => { setSelectedCobro(c); setDetailOpen(true); }}>
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
                          <Badge variant={c.status === "recibido" ? "success" : c.status === "pendiente" ? "warning" : "error"} className="text-[10px]">
                            {c.status === "recibido" ? "Recibido" : c.status === "pendiente" ? "Pendiente" : "Vencido"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedCobro(c); setDetailOpen(true); }}
                            className="p-1.5 text-text-muted hover:text-primary transition-colors"
                          >
                            <span className="w-4 h-4">👁</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                          No se encontraron cobros
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-text mb-4">Resumen mensual</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm text-text">Total recibido este mes</span>
                  </div>
                  <span className="text-sm font-bold text-text">${totalRecibido.toLocaleString("es-CL")}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-sm text-text">Por cobrar</span>
                  </div>
                  <span className="text-sm font-bold text-text">${totalPendiente.toLocaleString("es-CL")}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary">
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
      </div>
    </DashboardLayout>
  );
}
