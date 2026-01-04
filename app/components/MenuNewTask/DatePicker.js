"use client";

import { useState, useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {AppContext} from  "../../AppContext"


export default function DatePicker() {
 const {selected, setSelected} = useContext(AppContext)

  return (
    <div className="text-xs"> 
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}
