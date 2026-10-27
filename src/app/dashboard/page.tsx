"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Calendar, Clock, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { mockStats, upcomingSessions, pendingBoletas, recentActivity } from "@/data/mock";

const statIcons: React.ComponentType<{ className?: string }>[] = [Calendar, Clock, TrendingUp, FileText];

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, idx) => {
          const Icon = statIcons[idx % statIcons.length];
          const isClickable = idx === 0 || idx === 3;
          return (
            <Card
              key={stat.label}
              className={`cursor-pointer hover:shadow-md transition-shadow ${isClickable ? "border-primary/20" : ""}`}
              onClick={() => {
                if (stat.label === "Sesiones hoy") {
                  // navigate handled via link wrapper below
                }
              }}
            >
              <Link
                href={stat.label === "Sesiones hoy" ? "/agenda" : stat.label === "Boletas pendientes" ? "/boletas" : "#"}
                className="block h-full"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-text-muted">{stat.label}</CardTitle>
                  <Icon className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-text">{stat.value}</div>
                  <CardDescription className="mt-1">{stat.subtitle}</CardDescription>
                </CardContent>
                <CardFooter>
                  <div className={`flex items-center gap-1 text-xs ${stat.color}`}>
                    {stat.color.includes("success") ? (
                      <span className="flex items-center gap-1">▲</span>
                    ) : stat.color.includes("warning") ? (
                      <span className="flex items-center gap-1">○</span>
                    ) : null}
                    <span>{stat.color.includes("success") ? "+12%" : stat.color.includes("warning") ? "2 pendientes" : ""}</span>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Próximas sesiones</CardTitle>
              <CardDescription>
                Revisa tus citas agendadas para hoy y los próximos días.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <Link
                    key={session.id}
                    href="/agenda"
                    className="block"
                  >
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">{session.patient}</p>
                          <p className="text-xs text-text-muted">
                            {session.time} • {session.type} • {session.duration}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          session.status === "confirmada"
                            ? "success"
                            : session.status === "pendiente"
                            ? "warning"
                            : "error"
                        }
                      >
                        {session.status === "confirmada" ? "Confirmada" : session.status === "pendiente" ? "Pendiente" : "Cancelada"}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Link href="/agenda" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Ver agenda completa <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Boletas pendientes</CardTitle>
              <CardDescription>
                Documentos por emitir o revisar.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="space-y-3">
                {pendingBoletas.map((boleta) => (
                  <Link
                    key={boleta.id}
                    href="/boletas"
                    className="block"
                  >
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary transition-colors cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-text">{boleta.patient}</p>
                        <p className="text-xs text-text-muted">{boleta.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-text">
                          ${boleta.amount.toLocaleString("es-CL")}
                        </p>
                        <Badge variant="warning" className="mt-1 text-[10px]">
                          Pendiente
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Link href="/boletas" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Ver todas las boletas <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Actividad reciente</CardTitle>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 cursor-pointer hover:bg-secondary rounded-lg transition-colors">
                      <div className="w-6 h-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-text-muted">
                          {activity.type[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text">{activity.action}</p>
                        <p className="text-xs text-text-muted">
                          {activity.patient} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
