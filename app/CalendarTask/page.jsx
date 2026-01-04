"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { getEvents } from ".././fetch"
import { ViewCalendarTask } from "../components/ViewCalendarTask/ViewCalendarTask";
import {MenuNewTask} from "../components/MenuNewTask/MenuNewTask"


export default function SemanaHorizontalScroll() {
  const [tasks, setTasks] = useState([])
  const [taskPerDate, setTaskPerDate] = useState([])
  const [selectedDate, setSelectedDate] = useState([])

  const router = useRouter();
  const hoy = new Date();
  const [fechaCentro] = useState(hoy);

  const dias = [];
  for (let i = -30; i <= 30; i++) {
    const fecha = new Date(fechaCentro);
    fecha.setDate(fecha.getDate() + i);

    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    const fechaISO = `${year}-${month}-${day}`;
    dias.push({
      dia: fecha.getDate(),
      weekday: fecha.toLocaleDateString("es-ES", { weekday: "short" }).slice(0, 3),
      fechaISO: fechaISO,
      esHoy: i === 0,
      fechaCompleta: fecha,
    });
  }

  const nombresDias = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


  const hoyISO = new Date().toISOString().split('T')[0];

  const scrollRef = useRef(null);
  const hoyRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && hoyRef.current) {
      const container = scrollRef.current;
      const hoyElement = hoyRef.current;
      const containerWidth = container.offsetWidth;
      const hoyWidth = hoyElement.offsetWidth;
      const hoyOffsetLeft = hoyElement.offsetLeft;

      container.scrollLeft = hoyOffsetLeft - containerWidth / 2 + hoyWidth / 2;
    }

    const loadata = async () => {
      const data = await getEvents()
      setTasks(data.events)
      const eventosDeHoy = data.events.filter((item, i) => item.date === hoyISO);
      console.log(eventosDeHoy,"eventos")
      setTaskPerDate(eventosDeHoy);
      setSelectedDate(hoyISO);
    }

    loadata()

  }, []);

  const mesActual = hoy.toLocaleString("en-US", { month: "short" });

  const changeDate = (date) => {
    setSelectedDate(date)
    const taskPerDate = tasks.filter((item) => item.date === date)

    console.log(taskPerDate, "task")
    setTaskPerDate(taskPerDate)
  }

  return (
    <div className="container-date">
      <div>
        <header className="header-calendar">
          <ChevronLeft strokeWidth={0.5} size={20} onClick={() => router.push("/")} />
          <div>Calendar</div>
          <MenuNewTask/>
        </header>
      </div>

      <div>
        <h2 className="currentMonth text-center">{mesActual}</h2>

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-4 py-2">
            {dias.map((d, index) => {
              const diaSemanaIndex = (d.fechaCompleta.getDay() + 6) % 7;

              return (
                <div key={index} ref={d.esHoy ? hoyRef : null} className="flex flex-col items-center min-w-12">
                  <div>
                    <div>
                      <div
                        className={
                          selectedDate === d.fechaISO
                            ? "color-current-day"   
                            : d.fechaISO === hoyISO
                              ? "bg-purple-200 text-danger-800 rounded-full w-12 h-12 flex items-center justify-center" 
                              : "day-week"
                        }
                        onClick={() => changeDate(d.fechaISO)}
                      >
                        {d.dia}
                        <p style={{ fontWeight: "100", fontSize: 12 }}>
                          {nombresDias[diaSemanaIndex]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ViewCalendarTask data={taskPerDate} />
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
