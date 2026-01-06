

"use client";

import { PersonPlus, CirclePlusFill } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Modal,
  Surface,
  TextArea,
  Checkbox,
  Label,
  DateInputGroup,
  Description,
  TimeField,
  CheckboxGroup,
  Radio,
  RadioGroup,
  ListBox, Select
} from "@heroui/react";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/AppContext";
import DatePicker from "./DatePicker";
import { Calendar } from '@gravity-ui/icons';
import { setNewTask } from "../.././fetch";
import styles from "./MenuNewTask.module.css"
import { getMembers } from "../.././fetch";


export function FormAddNewTask({ isOpen, close }) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [color, setColor] = useState("#60A5FA");
  const [category, setCategory] = useState([])
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("")
  const [members, setMembers] = useState([])
  const [asigned, setAsigned] = useState([])

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
  console.log(start, end)

  const handleSetTask = (op) => {
    const formatDate = selected.toLocaleDateString("en-CA", {
      timeZone: "UTC"
    });

    setNewTask(formatDate, start, end, task, descriptionTask, asigned, category, color)
    setAsigned("")
    setTask("")
    setStart("")
    setEnd("")
    setDescritpionTask("")
    setCategory("")
    setColor("")
    setAsigned("")
  }

  const handleCloseModal = () => {
    close()
  }


  useEffect(() => {
    const loadMembers = async () => {
      const members = await getMembers();
      setMembers(members)
      /*  console.log(members, "memberss") */
    }
    loadMembers()
  }, [])

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

                    <TimeField className="w-[256px]" name="time" onChange={(value) => setStart(value)} value={start}>
                      <Label>Start time</Label>
                      <DateInputGroup>
                        <DateInputGroup.Input >
                          {(segment) => <DateInputGroup.Segment segment={segment} />}
                        </DateInputGroup.Input>
                      </DateInputGroup>
                      <Description>Enter the start time</Description>
                    </TimeField>
                    <TimeField className="w-[256px]" name="end-time" onChange={(value) => setEnd(value)} value={end}>
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
                  <Select className="w-[256px]" placeholder="Select asigned" selectionMode="multiple" onChange={(value) => setAsigned(value)}>
                    <Label>Asigned</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox selectionMode="multiple">
                        {
                          members.map((member) => {

                            return (
                              <ListBox.Item id={member.id}
                                textValue={member.nombre}
                                key={member.id}
                              >
                                {member.nombre}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            )
                          })
                        }
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <div className={styles.containerCheckbox}>
                    <CheckboxGroup
                      value={category}
                      onChange={(values) => setCategory(values)}
                      className={styles.containerCheckbox}
                    >
                      <Checkbox value="event">
                        Event
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox>
                      <Checkbox value="task">
                        Task
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ margin: "10px 10px 10px 0" }}>Color:</p>
                  <RadioGroup
                    name="color"
                    orientation="horizontal"
                    onChange={(value) => setColor(value)}
                    style={{ marginRight: 52 }}
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
                  <div className={styles.boxColor} style={{ backgroundColor: `${color}` }}></div>
                </div>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button slot="close" onClick={() => { handleSetTask() }}>Add new task</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}