

"use client";

import { PersonPlus, CirclePlusFill } from "@gravity-ui/icons";
import { Button, Input, Modal, Surface, TextArea, Checkbox, Label, DateInputGroup, Description, TimeField, CheckboxGroup, Radio, RadioGroup } from "@heroui/react";

import { useContext, useState } from "react";
import { AppContext } from "@/app/AppContext";
import DatePicker from "./DatePicker";
import { Calendar } from '@gravity-ui/icons';
import { setNewTask } from "../.././fetch";
import styles from "./MenuNewTask.module.css"


export function FormAddNewTask({ isOpen, close }) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [color, setColor] = useState("#60A5FA");

  const categoryColors = {
    research: "#FF9CEE",
    meeting: "#FFB46E",
    review: "#6EDBFF",
    planning: "#FFD76E",
    call: "#A78BFA",
  };

  const {
    selected,
    task, setTask,
    descriptionTask, setDescritpionTask,

  } = useContext(AppContext)

  const handleSetTask = (op) => {
    const formatDate = selected.toLocaleDateString("en-CA", {
      timeZone: "UTC"
    });
    console.log(formatDate);
    setNewTask(formatDate, task, descriptionTask, color)
  }

  const handleCloseModal = () => {
    close()
  }
  console.log(color)
  
  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger onClick={handleCloseModal} />
            <Modal.Header>
              <div className="flex justify-between pr-7">
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground flex gap-30">
                  <CirclePlusFill className="size-5" />
                </Modal.Icon>
              </div>
              <Modal.Heading>Add new task</Modal.Heading>

            </Modal.Header>
            <Modal.Body className="">
              <Surface variant="default" className="surface-container">
                <div className="flex flex-col gap-4">
                  <div style={{ display: "flex", gap: 10 }}>
                    <Calendar width={23} height={23} onClick={() => { setIsOpenCalendar(!isOpenCalendar) }} />
                    <p>Select a date</p>
                  </div>

                  <div className={styles.containerDate}>
                    {isOpenCalendar && <DatePicker />}
                  </div>

                  <div className={styles.containerTime}>
                    <TimeField className="w-[256px]" name="time">
                      <Label>Start time</Label>
                      <DateInputGroup>
                        <DateInputGroup.Input>
                          {(segment) => <DateInputGroup.Segment segment={segment} />}
                        </DateInputGroup.Input>
                      </DateInputGroup>
                      <Description>Enter the start time</Description>
                    </TimeField>
                    <TimeField className="w-[256px]" name="end-time">
                      <Label>End time</Label>
                      <DateInputGroup>
                        <DateInputGroup.Input>
                          {(segment) => <DateInputGroup.Segment segment={segment} />}
                        </DateInputGroup.Input>
                      </DateInputGroup>
                      <Description>Enter the end time</Description>
                    </TimeField>
                  </div>
                  <Input aria-label="Name" placeholder="Task" onChange={(e) => setTask(e.target.value)} value={task} />
                  <TextArea placeholder="Describe your task" onChange={(e) => setDescritpionTask(e.target.value)} value={descriptionTask} />
                  <div className={styles.containerCheckbox}>
                    <Checkbox id="basic-terms">
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                    <Label htmlFor="basic-terms">Event</Label>
                    <Checkbox id="basic-terms">
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                    <Label htmlFor="basic-terms">Task</Label>
                  </div>

                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginTop: 10 }}>Color:</p>
                  <RadioGroup
                    name="color"
                    orientation="horizontal"
                    onChange={(value) => setColor(value)}
                  >
                    {Object.entries(categoryColors).map(([key, color]) => (
                      <Radio key={key} value={color}>
                        <Radio.Control
                          style={{
                            backgroundColor: color,
                            width: 19,
                            height: 19,
                            borderRadius: "50%",
                          }}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button slot="close" onClick={() => { handleSetTask() }}>Agregar</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}