"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Plus, ChevronLeft, ChevronRight, Calendar, User, Clock, MapPin } from "lucide-react";
import { formatDate, formatShortDate } from "@/lib/utils";

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const sessionsByDay: Record<string, Array<{ id: string; patient: string; time: string; type: string; color: string }>> = {
  "12": [
    { id: "s1", patient: "Ana Torres", time: "09:00", type: "Individual", color: "bg-blue-100 text-blue-700" },
    { id: "s2", patient: "Valentina Silva", time: "11:00", type: "Individual", color: "bg-green-100 text-green-700" },
    { id: "s3", patient: "Lucía Herrera", time: "14:00", type: "Pareja", color: "bg-purple-100 text-purple-700" },
  ],
  "13": [
    { id: "s4", patient: "Diego Vargas", time: "10:30", type: "Individual", color: "bg-blue-100 text-blue-700" },
    { id: "s5", patient: "Javier Morales", time: "15:00", type: "Individual", color: "bg-blue-100 text-blue-700" },
  ],
  "14": [
    { id: "s6", patient: "Sofía Pérez", time: "09:00", type: "Individual", color: "bg-pink-100 text-pink-700" },
    { id: "s7", patient: "Mateo Rojas", time: "11:30", type: "Individual", color: "bg-indigo-100 text-indigo-700" },
    { id: "s8", patient: "Camila Duarte", time: "16:00", type: "Familiar", color: "bg-orange-100 text-orange-700" },
  ],
  "15": [
    { id: "s9", patient: "Daniela Castro", time: "10:00", type: "Individual", color: "bg-blue-100 text-blue-700" },
    { id: "s10", patient: "Pedro Gómez", time: "12:30", type: "Individual", color: "bg-blue-100 text-blue-700" },
  ],
  "16": [
    { id: "s11", patient: "Fernanda Rojas", time: "09:30", type: "Individual", color: "bg-teal-100 text-teal-700" },
  ],
};

export default function AgendaPage() {
  const [view, setView] = React.useState<"semana" | "mes">("semana");
  const [selectedDate, setSelectedDate] = React.useState(12);

  const daySessions = sessionsByDay[selectedDate.toString()] || [];

  const prevWeek = () => setSelectedDate((d) => Math.max(8, d - 7));
  const nextWeek = () => setSelectedDate((d) => Math.min(16, d + 7));

  return (
    <DashboardLayout title="Agenda">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar calendar controls */}
        <div className="lg:w-1/4 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text">Mayo 2025</h2>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={prevWeek}>
                    <ChevronLeft className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextWeek}>
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
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Hoy, 12 de mayo</CardTitle>
              <CardDescription className="text-xs">
                {daySessions.length} sesión{daySessions.length !== 1 ? "es" : ""} programada{daySessions.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {daySessions.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-3">
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
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button onClick={() => {}} className="flex-1">
              Nueva cita
            </Button>
            <Button variant="outline" className="p-1">
              <Plus className="w-4 h-4" />
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
                  <Button variant={view === "semana" ? "primary" : "outline"} size="sm" onClick={() => setView("semana")}>
                    Semana
                  </Button>
                  <Button variant={view === "mes" ? "primary" : "outline"} size="sm" onClick={() => setView("mes")}>
                    Mes
                  </Button>
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
                            className="px-2 py-4 text-center border-r border-border last:border-0 h-24 relative group"
                          >
                            {daySessions.filter((s) => {
                              const h = parseInt(s.time.split(":")[0]);
                              return h === hour;
                            }).map((s) => (
                              <div
                                key={s.id}
                                className={`mx-1 rounded-md px-2 py-1 text-xs font-medium ${
                                  s.color
                                }`}
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
