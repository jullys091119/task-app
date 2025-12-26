import { NextResponse } from "next/server";

const proyectos = [
  {
    id: 1,
    nombre: "Pastelería Dulce Panamá – App Móvil",
    subtitulo: "Design & Dev team",
    descripcion: "App para pedidos online, catálogo de tortas y pagos con Yappy",
    asignados: [0, 2, 3, 5], 
    colorPrincipal: "#D473D4",
    activo: true
  },
  {
    id: 2,
    nombre: "Clínica Sonrisas Panamá – Sistema de Citas",
    subtitulo: "Frontend & Backend team",
    descripcion: "Dashboard para gestión de citas y historial de pacientes",
    asignados: [0, 1, 4, 6],
    colorPrincipal: "#6EC5B8",
    activo: true
  },
  {
    id: 3,
    nombre: "Gym FitZone – Membership Dashboard",
    subtitulo: "UI/UX Design team",
    descripcion: "Panel de control para membresías, clases y progreso físico",
    asignados: [0, 2, 3, 7],
    colorPrincipal: "#FF6B6B",
    activo: true
  },
  {
    id: 4,
    nombre: "Restaurante Mariscos del Caribe – Website Redesign",
    subtitulo: "Design team",
    descripcion: "Rediseño completo del sitio web con menú interactivo",
    asignados: [0, 1, 2],
    colorPrincipal: "#4ECDC4",
    activo: true
  },
  {
    id: 5,
    nombre: "Tienda Ropa Urban Panama – E-commerce App",
    subtitulo: "Full team",
    descripcion: "Tienda online con carrito, filtros y pasarela de pago",
    asignados: [0, 1, 3, 4, 5, 6],
    colorPrincipal: "#1A535C",
    activo: true
  },
  {
    id: 6,
    nombre: "Evento Bodas 2026 – Wedding Planner Tool",
    subtitulo: "Design & Frontend team",
    descripcion: "Herramienta para organizar invitados, proveedores y timeline",
    asignados: [0, 2, 3, 7],
    colorPrincipal: "#F7B7A3",
    activo: false 
  },
  {
    id: 7,
    nombre: "Supermercado Fresco – Checkout Flow",
    subtitulo: "UX & Dev team",
    descripcion: "Optimización del proceso de pago y entrega a domicilio",
    asignados: [0, 3, 4, 5],
    colorPrincipal: "#A0D468",
    activo: true
  },
  {
    id: 8,
    nombre: "Escuela Bilingüe del Istmo – Learning Platform",
    subtitulo: "Design team",
    descripcion: "Plataforma de cursos y tareas para estudiantes",
    asignados: [0, 1, 2],
    colorPrincipal: "#4A90E2",
    activo: true
  },
  {
    id: 9,
    nombre: "Tour Operator Panamá – Booking System",
    subtitulo: "Fullstack team",
    descripcion: "Sistema de reservas para tours y excursiones",
    asignados: [0, 4, 5, 6],
    colorPrincipal: "#FFB400",
    activo: true
  },
  {
    id: 10,
    nombre: "Cafetería La Bohème – Loyalty App",
    subtitulo: "Design & Frontend team",
    descripcion: "App de fidelidad con puntos y promociones",
    asignados: [0, 2, 3],
    colorPrincipal: "#8B5A2B",
    activo: true
  }
];

export async function GET() {
  return NextResponse.json(proyectos);
}
