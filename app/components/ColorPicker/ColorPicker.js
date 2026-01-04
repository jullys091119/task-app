"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Palette } from "lucide-react";

export default function ColorPickerPopover({ color, onChange }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  function toggle() {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 8,
      left: rect.left,
    });
    setOpen((v) => !v);
  }

  return (
    <>
      {/* Botón */}
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        className="flex items-center gap-2 border rounded-md px-3 py-2 w-fit"
      >
        <Palette size={16} />
        <span
          className="w-5 h-5 rounded-full border"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-mono">{color}</span>
      </button>

      {/* Picker en FIXED */}
      {open && (
        <div
          className="fixed z-[9999] bg-white p-3 rounded-lg shadow-lg"
          style={{ top: pos.top, left: pos.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </>
  );
}
