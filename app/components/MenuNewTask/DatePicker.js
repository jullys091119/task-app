"use client";

import { useContext, useEffect, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AppContext } from "../../AppContext";

export default function DatePicker() {
  const { selected, setSelected } = useContext(AppContext);

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    if (!selected) {
      setSelected(today);
    }
  }, [selected, setSelected, today]);

  return (
    <div className="text-xs">
      <DayPicker
        mode="single"
        selected={selected ?? today}
        onSelect={(date) => setSelected(date ?? today)}
      />
    </div>
  );
}
