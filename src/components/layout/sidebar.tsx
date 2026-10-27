"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  CreditCard,
  Bell,
  Globe,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agenda", href: "/agenda", icon: Calendar },
  { name: "Pacientes", href: "/pacientes", icon: Users },
  { name: "Boletas", href: "/boletas", icon: FileText },
  { name: "Cobros", href: "/cobros", icon: CreditCard },
  { name: "Recordatorios", href: "/recordatorios", icon: Bell },
  { name: "Mi sitio web", href: "/sitio-web", icon: Globe },
  { name: "Configuración", href: "/configuracion", icon: Settings },
];

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-[-var(--sidebar-width)]",
        "w-64 bg-surface border-r border-border flex flex-col"
      )}
    >
      <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-white text-xs font-bold">C</span>
        </div>
        <span className="font-bold text-lg tracking-tight">ConectaPro</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary border-r-2 border-primary"
                  : "text-text-muted hover:bg-secondary hover:text-text",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
            <img src="/placeholder-profile.jpg" alt="Perfil" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">Camila Rojas</p>
            <p className="text-xs text-text-muted truncate">Psicóloga</p>
          </div>
          <LogOut className="w-4 h-4 text-text-muted hover:text-error" />
        </div>
      </div>
    </aside>
  );
}
