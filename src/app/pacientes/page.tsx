"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Search, User, Clock, Phone, Mail } from "lucide-react";
import { pacientes } from "@/data/mock";

function SearchIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export default function PacientesPage() {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("todos");

  const filtered = pacientes.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "todos" || p.paymentStatus === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout title="Pacientes">
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

          <div className="mt-auto">
            <p className="text-xs font-semibold text-text-muted mb-2">Total de pacientes</p>
            <p className="text-2xl font-bold text-text">{pacientes.length}</p>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text">Listado de pacientes</h2>
            <Button>
              Nuevo paciente
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
                    <tr key={p.id} className="hover:bg-secondary transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-[10px] font-bold text-text-muted">
                              {p.name.charAt(0)}
                            </span>
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
                        <Badge
                          variant={
                            p.status === "activo" ? "success" : "error"
                          }
                          className="text-[10px]"
                        >
                          {p.status === "activo" ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant={
                            p.paymentStatus === "al_día"
                              ? "success"
                              : p.paymentStatus === "pendiente"
                              ? "warning"
                              : "error"
                          }
                          className="text-[10px]"
                        >
                          {p.paymentStatus === "al_día" ? "Al día" : p.paymentStatus === "pendiente" ? "Pendiente" : "Vencido"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="ghost" size="sm" className="p-1.5">
                          <User className="w-4 h-4" />
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
