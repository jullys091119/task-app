"use client";

import { Description, Label, ListBox, Select } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/AppContext";
import { getMembers } from "../../fetch";

export function SelectAssigned() {
  const [members, setMembers] = useState([]);

  const { assignedToProject, setAssignedToProject } =
    useContext(AppContext);

  useEffect(() => {
    const loadMembers = async () => {
      const data = await getMembers();
      setMembers(data);
    };
    loadMembers();
  }, []);

  return (
    <Select
      className="w-[256px]"
      placeholder="Select members"
      value={assignedToProject}
      onChange={(value) => setAssignedToProject(value)}
      selectionMode="multiple"
    >
      <Label>Assigned To</Label>

      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover placement="bottom center">
        <ListBox>
          {members.map((item) => (
            <ListBox.Item
              key={item.id}
              id={item.id}
              textValue={`${item.nombre} ${item.rol}`}
            >
              <p className="font-medium">{item.nombre}</p>
              <span className="text-sm text-muted-foreground">
                {item.rol}
              </span>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>

      <Description>
        Select the members assigned to this project
      </Description>
    </Select>
  );
}
