import { Description, Label, ListBox, Select } from "@heroui/react";
import { useContext } from "react";
import { AppContext } from "@/app/AppContext";

export function SelectRol() {
  const { setRoleMember, roleMember } = useContext(AppContext)
  return (
    <Select  placeholder="Select rol"
      value={roleMember}
      onChange={(value) => {
        setRoleMember(value);
      }}
    >
      <Label>Rol</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="full" textValue="Coordinador / Full Stack">
            Coordinador / Full Stack
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="uiux" textValue="UI/UX Designer">
            UI/UX Designer
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="uidesign" textValue="UI Designer">
            UI Designer
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="Frontend" textValue="Frontend Dev">
            Frontend Dev
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="backend" textValue="Backend Dev">
            Backend Dev
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="pm" textValue="Project Manager">
            Project Manager
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="tester" textValue="Tester / QA">
            Tester / QA
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
      <Description>Select Rol</Description>
    </Select>
  );
}