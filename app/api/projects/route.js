// app/api/projects/route.js

import { NextResponse } from "next/server";

// Array en memoria con tus proyectos iniciales
let proyectos = [
  {
    id: 1,
    nombre: "Pastelería Panamá",
    subtitulo: "Design & Dev team",
    descripcion: "App para pedidos online, catálogo de tortas y pagos con Yappy",
    asignados: [9, 2, 3, 5],
    colorPrincipal: "#D473D4",
    activo: true
  },
  {
    id: 2,
    nombre: "Clínica Sonrisas",
    subtitulo: "Frontend & Backend team",
    descripcion: "Dashboard para gestión de citas y historial de pacientes",
    asignados: [0, 1, 4, 6],
    colorPrincipal: "#6EC5B8",
    activo: true
  },
  // ... todos los demás proyectos que ya tenés (perfectos)
  {
    id: 10,
    nombre: "Cafetería La Bohème",
    subtitulo: "Design & Frontend team",
    descripcion: "App de fidelidad con puntos y promociones",
    asignados: [8, 2, 3],
    colorPrincipal: "#8B5A2B",
    activo: true
  }
];

export async function GET() {
  return NextResponse.json(proyectos);
}

export async function POST(request) {
  try {
    const newProject = await request.json();

    // Validación de campos obligatorios
    if (
      !newProject.nombre ||
      !newProject.subtitulo ||
      !newProject.descripcion ||
      !newProject.asignados
    ) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios: nombre, subtítulo, descripción y asignados" },
        { status: 400 }
      );
    }

  
    const nuevoId = proyectos.length > 0 
      ? Math.max(...proyectos.map(p => p.id)) + 1 
      : 1;

    const proyectoCreado = {
      id: nuevoId,
      nombre: newProject.nombre,
      subtitulo: newProject.subtitulo,
      descripcion: newProject.descripcion,
      asignados: newProject.asignados, 
     /*  colorPrincipal: newProject.colorPrincipal || "#888888", // color por defecto si no envías */
    /*   activo: newProject.activo ?? true, // true por defecto */
    };

    
    proyectos.push(proyectoCreado);

    return NextResponse.json(
      {
        message: "Proyecto creado exitosamente",
        proyecto: proyectoCreado,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear proyecto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}