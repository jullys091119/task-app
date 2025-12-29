import { Description, Label, ListBox, Select } from "@heroui/react";
import { useContext, useState } from "react";
import { AppContext } from "@/app/AppContext";

export function SelectRequiredTeam() {
    const {
     assignedTeam, setAssignedTeam
  } = useContext(AppContext)

  const OPCIONES_EQUIPO = [
    { value: "design-dev", label: "Design & Dev team" },
    { value: "ui-ux", label: "UI/UX team" },
    { value: "dev", label: "Development team" },
    { value: "fullstack", label: "Full Stack team" },
    { value: "mobile", label: "Mobile team" },
    { value: "backend", label: "Backend team" },
    { value: "frontend", label: "Frontend team" },
    { value: "qa", label: "QA team" },
    { value: "pm", label: "Project Management" },
  ];


  return (
    <Select className="w-[256px]"  value={assignedTeam}  placeholder="Selecciona equipo" onChange={(value)=> {setAssignedTeam(value)}} >
      <Label>Asignar equipo</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {
            OPCIONES_EQUIPO.map((item) => (
              <ListBox.Item id={item.value} textValue={item.value} key={item.value}>
                 {item.label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))
          }

        </ListBox>
      </Select.Popover>
      <Description>Selecciona equipo asignado</Description>
    </Select>
  );
}