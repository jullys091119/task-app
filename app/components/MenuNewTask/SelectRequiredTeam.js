import { Description, Label, ListBox, Select } from "@heroui/react";
import { useContext } from "react";
import { AppContext } from "@/app/AppContext";

export function SelectRequiredTeam() {
  const { assignedTeam, setAssignedTeam } = useContext(AppContext);

  const TEAM_OPTIONS = [
    { value: "design-dev", label: "Design & Development Team" },
    { value: "ui-ux", label: "UI / UX Team" },
    { value: "dev", label: "Development Team" },
    { value: "fullstack", label: "Full Stack Team" },
    { value: "mobile", label: "Mobile Team" },
    { value: "backend", label: "Backend Team" },
    { value: "frontend", label: "Frontend Team" },
    { value: "qa", label: "QA Team" },
    { value: "pm", label: "Project Management" },
  ];

  return (
    <Select
      className="w-[256px]"
      value={assignedTeam}
      placeholder="Select team"
      onChange={(value) => setAssignedTeam(value)}
    >
      <Label>Assign Team</Label>

      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          {TEAM_OPTIONS.map((item) => (
            <ListBox.Item
              key={item.value}
              id={item.value}
              textValue={item.label}
            >
              {item.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>

      <Description>Select the team assigned to this project</Description>
    </Select>
  );
}
