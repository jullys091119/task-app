// lib/mockEvents.js
// lib/mockEvents.js
export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server";

export const mockEvents = [
  {
    id: "1",
    date: "2025-12-27",
    title: "Research Plan",
    start: "09:00 AM",
    end: "10:45 AM",
    displayTime: "09:00 AM",
    descriptionTask: "We need to create footer rood rood",
    assignedTo: {
      name: "Wade Warren",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    color: "#FF9CEE",
    category: ["event"],
  },
  {
    id: "2",
    date: "2025-12-27",
    title: "Team Meeting",
    start: "11:30 AM",
    end: "13:00 AM",
     assignedTo: {
      name: "Wade Warren",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    displayTime: "11:30 AM",
    isGroup: true,
    participantsCount: 8,
    descriptionTask: "We need to create footer ....",
    color: "#FFB46E",
    category: ["task"],
  },
  {
    id: "3",
    date: "2025-12-27",
    title: "Design Review on Healthcare Dashboard",
    start: "13:00 AM",
    end: "14:00 PM",
    displayTime: "01:00 PM",
    descriptionTask: "We need to create footer ....",
    assignedTo: {
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    color: "#6EDBFF",
    category: ["event"],
  },
  {
    id: "4",
    date: "2025-12-27",
    title: "Organizing Team Roles for Project Success",
    start: "14:30 PM",
    end: "15:30 PM",
    displayTime: "02:30 PM",
    descriptionTask: "We need to create footer ....",
    assignedTo: {
      name: "Alexander Moore",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    color: "#FFD76E",
    category: ["task"],
  },


  {
    id: "5",
    date: "2025-12-26", // Día 26
    title: "Client Kickoff Meeting",
    start: "10:00 PM",
    end: "11:30 PM",
    displayTime: "10:00 AM",
    descriptionTask: "We need to create footer ....",
    assignedTo: {
      name: "Sophia Chen",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    color: "#A78BFA",
    category: ["event"],  
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