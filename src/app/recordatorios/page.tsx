"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Bell, Clock, Phone } from "lucide-react";

export default function RecordatoriosPage() {
  return (
    <DashboardLayout title="Recordatorios">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-text">Configuración de recordatorios</h2>
          <p className="text-sm text-text-muted">
            Envía avisos automáticos a tus pacientes antes de cada sesión
          </p>
        </div>

        <Card>
          <div className="p-6">
            <h3 className="text-sm font-semibold text-text mb-6">Recordatorios automáticos</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">Recordatorio 24 horas antes</p>
                    <p className="text-xs text-text-muted">Envía mensaje por WhatsApp el día previo a la sesión</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs font-medium text-success">Activo</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">Recordatorio 2 horas antes</p>
                    <p className="text-xs text-text-muted">Aviso breve justo antes de iniciar la sesión</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs font-medium text-warning">En prueba</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-sm font-semibold text-text mb-6">Plantilla de mensaje</h3>
            <div className="p-4 rounded-lg border border-border bg-secondary/50 font-mono text-sm">
              {'Hola {{nombre_paciente}}, te recordamos que tienes una sesión programada el {{fecha}} a las {{hora}} con Camila Rojas. ¡Te esperamos!'}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
              <Phone className="w-3 h-3" />
              <span>Se envía vía WhatsApp automáticamente</span>
            </div>
          </div>
        </Card>

        <div className="mt-6 p-4 rounded-lg border border-border bg-yellow-50">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700">
              <span className="text-[10px] font-bold">!</span>
            </div>
            <div>
              <p className="text-sm text-text font-medium">Nota importante</p>
              <p className="text-xs text-text-muted">
                Esta es una simulación visual para entrevistas de investigación. No se envían mensajes reales ni hay integración con servicios de mensajería.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
