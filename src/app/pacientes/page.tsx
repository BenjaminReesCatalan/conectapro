"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Search, User, Clock, Phone, Mail, Plus, X, ChevronRight } from "lucide-react";
import { pacientes } from "@/data/mock";

function SearchIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: typeof pacientes[0];
}

function PatientModal({ isOpen, onClose, patient }: PatientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full max-w-2xl p-6 rounded-xl border border-border shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-[10px] font-bold text-text-muted">{patient.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-text">{patient.name}</h2>
              <p className="text-sm text-text-muted">{patient.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-error transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Teléfono</p>
            <p className="text-sm text-text">{patient.phone}</p>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mt-4">Última sesión</p>
            <p className="text-sm text-text">{patient.lastSession}</p>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mt-4">Total de sesiones</p>
            <p className="text-sm text-text">{patient.sessionsCount}</p>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Estado</p>
            <Badge variant={patient.status === "activo" ? "success" : "error"}>
              {patient.status === "activo" ? "Activo" : "Inactivo"}
            </Badge>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mt-4">Pago</p>
            <Badge variant={patient.paymentStatus === "al_día" ? "success" : patient.paymentStatus === "pendiente" ? "warning" : "error"}>
              {patient.paymentStatus === "al_día" ? "Al día" : patient.paymentStatus === "pendiente" ? "Pendiente" : "Vencido"}
            </Badge>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Button onClick={() => { alert("Funcionalidad de simulación: editar paciente"); }}>
            Editar datos
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PacientesPage() {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("todos");
  const [selectedPatient, setSelectedPatient] = React.useState<typeof pacientes[0] | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const filtered = pacientes.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "todos" || p.paymentStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: pacientes.length,
    activos: pacientes.filter((p) => p.status === "activo").length,
    alDia: pacientes.filter((p) => p.paymentStatus === "al_día").length,
    pendientes: pacientes.filter((p) => p.paymentStatus === "pendiente").length,
    vencidos: pacientes.filter((p) => p.paymentStatus === "vencido").length,
  };

  return (
    <DashboardLayout title="Pacientes">
      <PatientModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedPatient(null); }}
        patient={selectedPatient!}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div className="lg:w-1/4 flex flex-col gap-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <SearchIcon className="w-4 h-4 text-text-muted" />
                <Input
                  placeholder="Buscar por nombre o email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Estado de pago</label>
                <div className="space-y-2">
                  {[
                    { value: "todos", label: "Todos" },
                    { value: "al_día", label: "Al día" },
                    { value: "pendiente", label: "Pendiente" },
                    { value: "vencido", label: "Vencido" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setFilter(item.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        filter === item.value
                          ? "bg-primary/10 text-primary"
                          : "text-text-muted hover:bg-secondary"
                      }`}
                    >
                      <span>{item.label}</span>
                      {filter === item.value && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-auto p-6 bg-secondary/50 rounded-xl border border-border">
            <p className="text-xs font-semibold text-text-muted mb-2">Resumen</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Total pacientes</span>
                <span className="font-medium text-text">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Activos</span>
                <span className="font-medium text-success">{stats.activos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Pagos al día</span>
                <span className="font-medium text-success">{stats.alDia}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Pagos pendientes</span>
                <span className="font-medium text-warning">{stats.pendientes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Pagos vencidos</span>
                <span className="font-medium text-error">{stats.vencidos}</span>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text">Listado de pacientes</h2>
            <Button onClick={() => alert("Simulación: abrir formulario de nuevo paciente")}>
              <Plus className="w-4 h-4 mr-2" /> Nuevo paciente
            </Button>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Paciente</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted">Contacto</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Última sesión</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Sesiones</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Estado</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Pago</th>
                    <th className="px-6 py-3 text-xs font-semibold text-text-muted text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-secondary transition-colors cursor-pointer group" onClick={() => { setSelectedPatient(p); setModalOpen(true); }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-[10px] font-bold text-text-muted">{p.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text">{p.name}</p>
                            <p className="text-xs text-text-muted">{p.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text">{p.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm text-text-muted">{p.lastSession}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="text-sm font-medium text-text">{p.sessionsCount}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={p.status === "activo" ? "success" : "error"} className="text-[10px]">
                          {p.status === "activo" ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={p.paymentStatus === "al_día" ? "success" : p.paymentStatus === "pendiente" ? "warning" : "error"} className="text-[10px]">
                          {p.paymentStatus === "al_día" ? "Al día" : p.paymentStatus === "pendiente" ? "Pendiente" : "Vencido"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="ghost" size="sm" className="p-1.5" onClick={(e) => { e.stopPropagation(); setSelectedPatient(p); setModalOpen(true); }}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-text-muted">
                        No se encontraron pacientes
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
