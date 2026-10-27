export const currentUser = {
  name: "Camila Rojas",
  role: "Psicóloga",
  email: "camila.rojas@psicologia.cl",
};

export const mockStats = [
  {
    label: "Sesiones hoy",
    value: "8",
    subtitle: "10:00 - 18:00",
    color: "text-primary",
  },
  {
    label: "Esta semana",
    value: "32",
    subtitle: "sesiones realizadas",
    color: "text-success",
  },
  {
    label: "Ingresos del mes",
    value: "$1.280.000",
    subtitle: "+12% vs mes anterior",
    color: "text-success",
  },
  {
    label: "Boletas pendientes",
    value: "2",
    subtitle: "por emitir",
    color: "text-warning",
  },
];

export const upcomingSessions = [
  {
    id: "1",
    patient: "Ana Torres",
    time: "09:00",
    type: "Sesión individual",
    status: "confirmada",
    duration: "50 min",
  },
  {
    id: "2",
    patient: "Diego Vargas",
    time: "10:30",
    type: "Sesión individual",
    status: "confirmada",
    duration: "50 min",
  },
  {
    id: "3",
    patient: "Valentina Silva",
    time: "12:00",
    type: "Sesión individual",
    status: "pendiente",
    duration: "50 min",
  },
  {
    id: "4",
    patient: "Matías Fernández",
    time: "15:00",
    type: "Sesión individual",
    status: "pendiente",
    duration: "50 min",
  },
];

export const pendingBoletas = [
  {
    id: "B-001",
    patient: "Ana Torres",
    amount: 50000,
    date: "12 May 2025",
    status: "pendiente",
    description: "Sesión de psicología",
  },
  {
    id: "B-002",
    patient: "Diego Vargas",
    amount: 50000,
    date: "13 May 2025",
    status: "pendiente",
    description: "Sesión de psicología",
  },
];

export const recentActivity = [
  {
    id: "1",
    action: "Boleta emitida",
    patient: "Ana Torres",
    time: "Hace 2h",
    type: "boleta",
  },
  {
    id: "2",
    action: "Pago recibido",
    patient: "Valentina Silva",
    time: "Hace 4h",
    type: "pago",
  },
  {
    id: "3",
    action: "Nueva cita agendada",
    patient: "Matías Fernández",
    time: "Hace 6h",
    type: "cita",
  },
  {
    id: "4",
    action: "Recordatorio enviado",
    patient: "Lucía Herrera",
    time: "Ayer",
    type: "recordatorio",
  },
];

export const pacientes = [
  {
    id: "1",
    name: "Ana Torres",
    email: "ana.torres@email.com",
    phone: "+56 9 1234 5678",
    lastSession: "12 May 2025",
    sessionsCount: 12,
    status: "activo",
    paymentStatus: "al_día",
  },
  {
    id: "2",
    name: "Diego Vargas",
    email: "diego.vargas@email.com",
    phone: "+56 9 8765 4321",
    lastSession: "13 May 2025",
    sessionsCount: 8,
    status: "activo",
    paymentStatus: "pendiente",
  },
  {
    id: "3",
    name: "Valentina Silva",
    email: "valentina.silva@email.com",
    phone: "+56 9 2233 4455",
    lastSession: "14 May 2025",
    sessionsCount: 15,
    status: "activo",
    paymentStatus: "al_día",
  },
  {
    id: "4",
    name: "Matías Fernández",
    email: "matias.fernandez@email.com",
    phone: "+56 9 3344 5566",
    lastSession: "10 May 2025",
    sessionsCount: 6,
    status: "inactivo",
    paymentStatus: "vencido",
  },
  {
    id: "5",
    name: "Javier Morales",
    email: "javier.morales@email.com",
    phone: "+56 9 4455 6677",
    lastSession: "08 May 2025",
    sessionsCount: 20,
    status: "activo",
    paymentStatus: "al_día",
  },
];

export const boletas = [
  {
    id: "B-001",
    folio: "45.123.456-7",
    patient: "Ana Torres",
    amount: 50000,
    date: "12 May 2025",
    status: "emitida",
    description: "Sesión de psicología individual",
  },
  {
    id: "B-002",
    folio: "45.123.457-5",
    patient: "Diego Vargas",
    amount: 50000,
    date: "13 May 2025",
    status: "pendiente",
    description: "Sesión de psicología individual",
  },
  {
    id: "B-003",
    folio: "45.123.458-3",
    patient: "Valentina Silva",
    amount: 50000,
    date: "10 May 2025",
    status: "emitida",
    description: "Sesión de psicología individual",
  },
  {
    id: "B-004",
    folio: "45.123.459-1",
    patient: "Lucía Herrera",
    amount: 50000,
    date: "09 May 2025",
    status: "emitida",
    description: "Sesión de psicología individual",
  },
  {
    id: "B-005",
    folio: "45.123.460-9",
    patient: "Matías Fernández",
    amount: 50000,
    date: "05 May 2025",
    status: "anulada",
    description: "Sesión de psicología individual",
  },
];

export const cobros = [
  {
    id: "C-001",
    patient: "Ana Torres",
    amount: 50000,
    date: "12 May 2025",
    method: "Transferencia",
    status: "recibido",
  },
  {
    id: "C-002",
    patient: "Diego Vargas",
    amount: 50000,
    date: "13 May 2025",
    method: "Efectivo",
    status: "pendiente",
  },
  {
    id: "C-003",
    patient: "Valentina Silva",
    amount: 50000,
    date: "10 May 2025",
    method: "Transferencia",
    status: "recibido",
  },
  {
    id: "C-004",
    patient: "Lucía Herrera",
    amount: 50000,
    date: "09 May 2025",
    method: "Transferencia",
    status: "recibido",
  },
  {
    id: "C-005",
    patient: "Javier Morales",
    amount: 50000,
    date: "05 May 2025",
    method: "Efectivo",
    status: "vencido",
  },
];
