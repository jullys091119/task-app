"use client"
import { Description, Label, ListBox, Select } from "@heroui/react";
import { useContext } from "react";
import { AppContext } from "@/app/AppContext";
import { getMembers, getProjects } from "../../fetch"
import React, { useState, useEffect } from "react"

export function SelectAssigned() {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    const loadRoles = async () => {
      const data = await getMembers()
      setRoles(data)
    }
    loadRoles()
  }, [])
  const { assignedToProject,
    setAssignedToProject,
  } = useContext(AppContext)
  return (
    <Select className="w-[256px]" placeholder="Selecciona uno"
      value={assignedToProject}
      onChange={(value) => {
        setAssignedToProject(value)
      }}
      selectionMode="multiple"
    >
      <Label>Asignados</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover placement="bottom center">
        <ListBox>
          {
            roles.map((item) => (
              <ListBox.Item id={item.id} textValue="Coordinador / Full Stack" key={item.id}>
                <p style={{ fontWeight: 500 }}>{item.nombre}</p>{item.rol}
                <ListBox.ItemIndicator />
              </ListBox.Item>

            ))
          }

        </ListBox>
      </Select.Popover>
      <Description>Selecciona a los  asignados para el proyecto</Description>
    </Select>
  );
}