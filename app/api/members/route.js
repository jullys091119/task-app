import { NextResponse } from "next/server";

let team = [
 { id: 0, nombre: "Antony Jacob", rol: "Coordinador / Full Stack", avatar: "https://images.unsplash.com/photo-1603076174779-8565218280c0?q=80&w=402&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 1, nombre: "María González", rol: "UI/UX Designer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, nombre: "Carlos Rivera", rol: "UI Designer", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, nombre: "Laura Sánchez", rol: "Frontend Dev", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg" },
  { id: 4, nombre: "José Morales", rol: "Backend Dev", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 5, nombre: "Ana Torres", rol: "Frontend Dev", avatar: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 6, nombre: "Diego López", rol: "Project Manager", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 7, nombre: "Sofía Herrera", rol: "Tester / QA", avatar: "https://images.unsplash.com/photo-1554727242-741c14fa561c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  
];



export async function GET() {
  return NextResponse.json(team);
}


export async function POST(request) {
  const newMember = await request.json();
  // Validación  mínima
  if (!newMember.name || !newMember.phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 400 }
    );
  }
  team[""]  
  
  team.push(newMember);
  
  return NextResponse.json(
    {
      message: "Member added successfully",
      member: newMember,
    },
    { status: 201 }
  );
}

