"use client";

import { EllipsisVertical, Pencil, SquarePlus, TrashBin } from "@gravity-ui/icons";
import { Description, Dropdown, Header, Kbd, Label, Separator } from "@heroui/react";
import { FormAddNewProject } from "./FormAddNewProject"
import { useState } from "react";
import { FormAddNewTask } from "./FormAddNewTask";



export function MenuNewTask() {
/*   const [modalOpenNewEvent, setModalNewEvent] = useState(false); */
  const [modalOpenAddNewProjec, setModalOpenAddNewProject] = useState(false)
  const  [modalOpenSetTask, setModalOpenSetTask] = useState(false)

  const selectedOptionMenu = (op) => {
     op==="new-project"?setModalOpenAddNewProject(true):null  
     op==="new-event"?setModalNewEvent(true):null
     op==="new-task"?setModalOpenSetTask(true):null
   
  }

  return (
    <Dropdown>
      {modalOpenAddNewProjec && <FormAddNewProject isOpen={modalOpenAddNewProjec}  close={() => setModalOpenAddNewProject(false)} /> }
      {modalOpenSetTask && <FormAddNewTask isOpen={modalOpenSetTask}  close={() => setModalOpenSetTask(false)}  />}
      <Dropdown.Trigger
        aria-label="Menu"
        className="button button-md button--secondary button--icon-only data-[focus-visible=true]:status-focused"
      >
        <EllipsisVertical className="outline-none iconElipsis"/>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => selectedOptionMenu(key)}>
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="new-project" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <SquarePlus className="size-4 shrink-0 text-muted" />
              </div>
              <div className="flex flex-col">
                <Label>New Project</Label>
                <Description>Create new Project</Description>
              </div>
            </Dropdown.Item>
            <Separator />
          {/*   <Dropdown.Item id="new-event" textValue="add event">
              <div className="flex h-8 items-start justify-center pt-px">
                <SquarePlus className="size-4 shrink-0 text-muted" />
              </div>
              <div className="flex flex-col">
                <Label>New Event</Label>
                <Description>Create new Event</Description>
              </div>
            </Dropdown.Item> */}
            <Separator />
            <Dropdown.Item id="new-task" textValue="Add task">
              <div className="flex h-8 items-start justify-center pt-px">
                <SquarePlus className="size-4 shrink-0 text-muted" />
              </div>
              <div className="flex flex-col">
                <Label>New task</Label>
                <Description>Create new Task</Description>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}