"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getEvents, deleteTasks } from ".././fetch";
import { ViewCalendarTask } from "../components/ViewCalendarTask/ViewCalendarTask";
import { MenuNewTask } from "../components/MenuNewTask/MenuNewTask";

const toLocalISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export default function SemanaHorizontalScroll() {
  const [tasks, setTasks] = useState([]);
  /*  const [taskPerDate, setTaskPerDate] = useState([]); */
  const [selectedDate, setSelectedDate] = useState("");

  const router = useRouter();
  const hoy = new Date();
  const hoyISO = toLocalISODate(hoy);

  const scrollRef = useRef(null);
  const hoyRef = useRef(null);

  const dias = [];
  for (let i = -30; i <= 30; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    dias.push({
      dia: fecha.getDate(),
      weekday: fecha.toLocaleDateString("es-ES", { weekday: "short" }).slice(0, 3),
      fechaISO: toLocalISODate(fecha),
      fechaCompleta: fecha,
      esHoy: i === 0,
    });
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await getEvents();
      setTasks(data.events);
      setSelectedDate(hoyISO);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || !hoyRef.current) return;

    const container = scrollRef.current;
    const el = hoyRef.current;
    container.scrollLeft =
      el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
  }, []);

  const changeDate = (date) => {
    setSelectedDate(date);
  };


  const handleDeleteTask = async (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    try {
      await deleteTasks(id);
    } catch (e) {
      console.error("Error al borrar en backend", e);
    }
  };

  const nombresDias = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const mesActual = hoy.toLocaleString("en-US", { month: "short" });

  //Aquí filtramos por día.
  const taskPerDate = tasks.filter(
    (task) => task.date === selectedDate
  );

  return (
    <div className="container-date">
      <header className="header-calendar">
        <ChevronLeft strokeWidth={0.5} size={20} onClick={() => router.push("/")} />
        <div>Calendar</div>
        <MenuNewTask size="sm" />
      </header>

      <h2 className="currentMonth text-center">{mesActual}</h2>

      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-4 py-2">
          {dias.map((d, index) => {
            const isSelected = selectedDate === d.fechaISO;

            return (
              <div
                key={index}
                ref={d.esHoy ? hoyRef : null}
                className="flex flex-col items-center min-w-12"
              >
                <div
                  className={
                    isSelected
                      ? "color-current-day"
                      : d.fechaISO === hoyISO
                        ? "bg-purple-200 text-danger-800 rounded-full w-12 h-12 flex items-center justify-center"
                        : "day-week"
                  }
                  onClick={() => changeDate(d.fechaISO)}
                >
                  {d.dia}
                  <p style={{ fontWeight: "100", fontSize: 12 }}>
                    {nombresDias[
                      (d.fechaCompleta.getDay() + 6) % 7
                    ]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ViewCalendarTask data={taskPerDate} onDelete={handleDeleteTask} />

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
