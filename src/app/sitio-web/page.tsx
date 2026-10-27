"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Globe, User, Layers, Smartphone, CheckCircle2 } from "lucide-react";

export default function SitioWebPage() {
  return (
    <DashboardLayout title="Mi sitio web profesional">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-text">Tu presencia en línea</h2>
            <p className="text-sm text-text-muted">
              Crea una página web sencilla para dar a conocer tu práctica profesional.
            </p>
          </div>
          <Button>
            Publicar sitio
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-full max-w-xs">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-[10px] font-bold text-text">C</span>
                      </div>
                      <span className="text-xs font-semibold text-text">Camila Rojas</span>
                    </div>
                    <h1 className="text-3xl font-bold text-text mb-2">Psicóloga - Consulta individual</h1>
                    <p className="text-text-muted text-sm mb-4">
                      Acompañamiento emocional y crecimiento personal en un espacio seguro y profesional.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        <span>Atención individual y de pareja</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        <span>Modalidad: Presencial y online</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        <span>Viña del Mar, Chile</span>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <Link href="#" className="flex-1">
                        <button className="w-full py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover">Agendar hora</button>
                      </Link>
                      <Link href="#" className="flex-1">
                        <button className="w-full py-3 rounded-lg border border-border text-sm font-medium hover:bg-secondary">Contacto</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-xs text-text-muted">Vista previa - escritorio</span>
                <Badge variant="success" className="text-[10px]">Publicado</Badge>
              </div>
            </Card>
          </div>

          {/* Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-sm font-semibold text-text mb-4">Información pública</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Nombre profesional</label>
                    <input
                      type="text"
                      value="Camila Rojas"
                      className="w-full h-10 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Especialidad</label>
                    <input
                      type="text"
                      value="Psicología clínica"
                      className="w-full h-10 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Modalidad de atención</label>
                    <select
                      className="w-full h-10 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option>Presencial y online</option>
                      <option>Solo presencial</option>
                      <option>Solo online</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Ubicación</label>
                    <input
                      type="text"
                      value="Viña del Mar, Región de Valparaíso"
                      className="w-full h-10 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-sm font-semibold text-text mb-4">Horarios disponibles</h3>
                <div className="space-y-3">
                  {[
                    { day: "Lunes", hours: "09:00 - 18:00" },
                    { day: "Martes", hours: "09:00 - 18:00" },
                    { day: "Miércoles", hours: "09:00 - 18:00" },
                    { day: "Jueves", hours: "09:00 - 18:00" },
                    { day: "Viernes", hours: "09:00 - 17:00" },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between items-center p-3 rounded-lg border border-border">
                      <span className="text-sm text-text">{item.day}</span>
                      <span className="text-sm text-text-muted">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="p-6 rounded-lg border border-border bg-secondary/50">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Estado del sitio</h3>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm text-text">Tu sitio está publicado y accesible para pacientes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
