import * as React from "react";
import { Sidebar } from "./sidebar";
import { Search } from "./search";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-[var(--sidebar-width)]">
        <header className="flex items-center justify-between px-6 py-4 bg-surface border-b border-border sticky top-0 z-40 hidden lg:flex">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <input
                type="search"
                placeholder="Buscar pacientes, boletas..."
                className="h-9 w-64 rounded-lg border border-border bg-surface pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-text">C</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-text mb-6">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
