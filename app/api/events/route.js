// lib/mockEvents.js
// lib/mockEvents.js
export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server";

export const mockEvents = [
  {
    id: "1",
    date: "2025-12-27",
    title: "Research Plan",
    startTime: "09:00",
    endTime: "10:45",
    displayTime: "09:00 AM",
    assignedTo: {
      name: "Wade Warren",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    color: "#FF9CEE",
    category: "research",
  },
  {
    id: "2",
    date: "2025-12-27",
    title: "Team Meeting",
    startTime: "11:30",
    endTime: "13:00",
    displayTime: "11:30 AM",
    isGroup: true,
    participantsCount: 8,
    color: "#FFB46E",
    category: "meeting",
  },
  {
    id: "3",
    date: "2025-12-27",
    title: "Design Review on Healthcare Dashboard",
    startTime: "13:00",
    endTime: "14:00",
    displayTime: "01:00 PM",
    assignedTo: {
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    color: "#6EDBFF",
    category: "review",
  },
  {
    id: "4",
    date: "2025-12-27",
    title: "Organizing Team Roles for Project Success",
    startTime: "14:30",
    endTime: "15:30",
    displayTime: "02:30 PM",
    assignedTo: {
      name: "Alexander Moore",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    color: "#FFD76E",
    category: "planning",
  },


  {
    id: "5",
    date: "2025-12-26", // Día 26
    title: "Client Kickoff Meeting",
    startTime: "10:00",
    endTime: "11:30",
    displayTime: "10:00 AM",
    assignedTo: {
      name: "Sophia Chen",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    color: "#A78BFA",
    category: "call",
  },
  {
    id: "6",
    date: "2025-12-28", // Día 28
    title: "Sprint Planning",
    startTime: "09:30",
    endTime: "11:00",
    displayTime: "09:30 AM",
    isGroup: true,
    participantsCount: 12,
    color: "#FFB46E",
    category: "meeting",
  },
  {
    id: "7",
    date: "2025-12-25", // Día 25 (para que veas que puede estar vacío)
    title: "No events today", // lo borramos después, solo para ejemplo
    startTime: "00:00",
    endTime: "00:00",
    displayTime: "",
    color: "#FFFFFF",
  },
];


export async function GET() {
  return Response.json({
    success: true,
    events: mockEvents,
  });

}


export async function DELETE(request) {
  const body = await request.json()
  console.log("DELETE BODY:", body)
  return Response.json({ success: true })
}


export async function PATCH(req) {
  const body = await req.json(); // { id: "1", title: "nuevo" }
  const index = mockEvents.findIndex(event => event.id === body.id);
  if (index !== -1) {
    mockEvents[index] = { ...mockEvents[index], ...body };
  }

  return NextResponse.json({ success: true, event: mockEvents[index] });
}



export async function POST(request) {
  const body = await request.json();
  const {
    date,
    start,
    end,
    task,
    descriptionTask,
    asigned,
    category,
    color
  } = body;


  if (!date || !task || !descriptionTask || !asigned || !color || !start || !end || !category) {
    return NextResponse.json(
      { error: "Datos incompletos" },
      { status: 400 }
    );
  }


  const newTask = {
    id: crypto.randomUUID(),
    date, // YYYY-MM-DD
    start,
    end,
    title: task,
    descriptionTask,
    asigned,
    category,
    color,
  };


  mockEvents.push(newTask);

  console.log(mockEvents, "desde la insercion")

  return NextResponse.json(
    {
      message: "Task added successfully",
      task: newTask
    },
    { status: 201 }
  );


}