"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Plus, ChevronLeft, ChevronRight, Calendar, User, Clock, X, Search as SearchIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const sessionsByDay: Record<string, Array<{ id: string; patient: string; time: string; type: string; color: string; status: string }>> = {
  "12": [
    { id: "s1", patient: "Ana Torres", time: "09:00", type: "Individual", color: "bg-blue-100 text-blue-700", status: "confirmada" },
    { id: "s2", patient: "Valentina Silva", time: "11:00", type: "Individual", color: "bg-green-100 text-green-700", status: "confirmada" },
    { id: "s3", patient: "Lucía Herrera", time: "14:00", type: "Pareja", color: "bg-purple-100 text-purple-700", status: "pendiente" },
  ],
  "13": [
    { id: "s4", patient: "Diego Vargas", time: "10:30", type: "Individual", color: "bg-blue-100 text-blue-700", status: "confirmada" },
    { id: "s5", patient: "Javier Morales", time: "15:00", type: "Individual", color: "bg-blue-100 text-blue-700", status: "pendiente" },
  ],
  "14": [
    { id: "s6", patient: "Sofía Pérez", time: "09:00", type: "Individual", color: "bg-pink-100 text-pink-700", status: "confirmada" },
    { id: "s7", patient: "Mateo Rojas", time: "11:30", type: "Individual", color: "bg-indigo-100 text-indigo-700", status: "pendiente" },
    { id: "s8", patient: "Camila Duarte", time: "16:00", type: "Familiar", color: "bg-orange-100 text-orange-700", status: "confirmada" },
  ],
  "15": [
    { id: "s9", patient: "Daniela Castro", time: "10:00", type: "Individual", color: "bg-blue-100 text-blue-700", status: "pendiente" },
    { id: "s10", patient: "Pedro Gómez", time: "12:30", type: "Individual", color: "bg-blue-100 text-blue-700", status: "confirmada" },
  ],
  "16": [
    { id: "s11", patient: "Fernanda Rojas", time: "09:30", type: "Individual", color: "bg-teal-100 text-teal-700", status: "confirmada" },
  ],
};

const allSessions = Object.values(sessionsByDay).flat();

interface NewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: number;
}

function NewSessionModal({ isOpen, onClose, selectedDay }: NewSessionModalProps) {
  const [patient, setPatient] = React.useState("");
  const [time, setTime] = React.useState("");
  const [type, setType] = React.useState("individual");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Simulación: cita creada para ${patient} el día ${selectedDay} a las ${time}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full max-w-md p-6 rounded-xl border border-border shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">Nueva cita</h2>
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
            <label className="text-xs font-medium text-text">Hora</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-text">Tipo de sesión</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-10 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="individual">Individual</option>
              <option value="pareja">Pareja</option>
              <option value="familiar">Familiar</option>
            </select>
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit" className="flex-1">Guardar cita</Button>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface SessionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: { id: string; patient: string; time: string; type: string; status: string };
}

function SessionDetailModal({ isOpen, onClose, session }: SessionDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full max-w-md p-6 rounded-xl border border-border shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">Detalle de la cita</h2>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-error transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Paciente</span>
            <span className="text-sm font-medium text-text">{session.patient}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Hora</span>
            <span className="text-sm font-medium text-text">{session.time}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Tipo</span>
            <span className="text-sm font-medium text-text">{session.type}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
            <span className="text-sm text-text-muted">Estado</span>
            <Badge variant={session.status === "confirmada" ? "success" : "warning"} className="text-[10px]">
              {session.status === "confirmada" ? "Confirmada" : "Pendiente"}
            </Badge>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AgendaPage() {
  const [view, setView] = React.useState<"semana" | "mes">("semana");
  const [selectedDate, setSelectedDate] = React.useState(12);
  const [newSessionOpen, setNewSessionOpen] = React.useState(false);
  const [sessionDetailOpen, setSessionDetailOpen] = React.useState(false);
  const [selectedSession, setSelectedSession] = React.useState<{ id: string; patient: string; time: string; type: string; status: string } | null>(null);
  const [search, setSearch] = React.useState("");

  const daySessions = sessionsByDay[selectedDate.toString()] || [];

  const prevWeek = () => setSelectedDate((d) => Math.max(8, d - 7));
  const nextWeek = () => setSelectedDate((d) => Math.min(16, d + 7));

  const filteredSessions = allSessions.filter((s) =>
    s.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Agenda">
      <NewSessionModal isOpen={newSessionOpen} onClose={() => setNewSessionOpen(false)} selectedDay={selectedDate} />
      <SessionDetailModal
        isOpen={sessionDetailOpen}
        onClose={() => { setSessionDetailOpen(false); setSelectedSession(null); }}
        session={selectedSession!}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar calendar controls */}
        <div className="lg:w-1/4 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text">Mayo 2025</h2>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={prevWeek} disabled={selectedDate <= 8}>
                    <ChevronLeft className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextWeek} disabled={selectedDate >= 16}>
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 text-center text-xs font-medium text-text-muted mb-3">
                {DAYS.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 h-64">
                {[...Array(31)].map((_, i) => {
                  const dayNum = i + 1;
                  const isSelected = dayNum === selectedDate;
                  const hasSessions = sessionsByDay[dayNum.toString()]?.length > 0;
                  return (
                    <button
                      key={dayNum}
                      onClick={() => setSelectedDate(dayNum)}
                      className={`h-9 w-9 rounded-lg flex items-center justify-center text-sm transition-colors ${
                        isSelected
                          ? "bg-primary text-white"
                          : hasSessions
                          ? "bg-primary/10 text-primary"
                          : "text-text-muted hover:bg-secondary"
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/50 text-xs">
                <p className="font-medium text-text">{formatDate(new Date(2025, 4, selectedDate))}</p>
                <p className="text-text-muted">{daySessions.length} sesión{daySessions.length !== 1 ? "es" : ""}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text">Hoy, 12 de mayo</h3>
              </div>
              <div className="space-y-2">
                {daySessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors"
                    onClick={() => { setSelectedSession(s); setSessionDetailOpen(true); }}
                  >
                    <div>
                      <p className="text-sm font-medium text-text">{s.time}</p>
                      <p className="text-xs text-text-muted">{s.patient}</p>
                    </div>
                    <Badge variant="info" className="text-[10px]">{s.type}</Badge>
                  </div>
                ))}
                {daySessions.length === 0 && (
                  <div className="p-4 text-center text-sm text-text-muted">
                    Sin sesiones programadas
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button onClick={() => setNewSessionOpen(true)} className="flex-1">
              <Plus className="w-4 h-4 mr-2" /> Nueva cita
            </Button>
          </div>
        </div>

        {/* Main schedule grid */}
        <div className="flex-1 min-w-0">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-text">Vista semanal</h2>
                  <p className="text-sm text-text-muted">
                    12 - 16 de mayo de 2025
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Buscar pacientes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-48"
                  />
                  <div className="flex gap-2">
                    <Button variant={view === "semana" ? "primary" : "outline"} size="sm" onClick={() => setView("semana")}>
                      Semana
                    </Button>
                    <Button variant={view === "mes" ? "primary" : "outline"} size="sm" onClick={() => setView("mes")}>
                      Mes
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border border-border rounded-lg">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="w-20 px-4 py-3 text-xs font-semibold text-text-muted border-b border-border bg-secondary sticky left-0 z-10">Hora</th>
                      {[12, 13, 14, 15, 16].map((day) => (
                        <th
                          key={day}
                          className="px-4 py-3 text-xs font-semibold text-text-muted border-b border-border text-center w-64"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span>{DAYS[(day - 1 + 1) % 7]}</span>
                            <span className="font-bold text-text">{day}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((hour) => (
                      <tr key={hour} className="border-b border-border">
                        <td className="px-4 py-4 text-xs font-medium text-text-muted sticky left-0 z-10 bg-surface">
                          {hour.toString().padStart(2, "0")}:00
                        </td>
                        {[12, 13, 14, 15, 16].map((day) => (
                          <td
                            key={day}
                            className="px-2 py-4 text-center border-r border-border last:border-0 h-24 relative group cursor-pointer"
                            onClick={() => {
                              const daySess = daySessions.find((s) => {
                                const h = parseInt(s.time.split(":")[0]);
                                return h === hour;
                              });
                              if (daySess) {
                                setSelectedSession(daySess);
                                setSessionDetailOpen(true);
                              }
                            }}
                          >
                            {daySessions.filter((s) => {
                              const h = parseInt(s.time.split(":")[0]);
                              return h === hour;
                            }).map((s) => (
                              <div
                                key={s.id}
                                className={`mx-1 rounded-md px-2 py-1 text-xs font-medium cursor-pointer hover:opacity-80 transition-colors ${s.color}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSession(s);
                                  setSessionDetailOpen(true);
                                }}
                              >
                                {s.patient}
                              </div>
                            ))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-text mb-3">Bloques disponibles</h3>
                <p className="text-sm text-text-muted">
                  Los espacios en blanco representan horarios disponibles para nuevas citas.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
