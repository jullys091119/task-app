"use client";

import { CirclePlusFill, Calendar } from "@gravity-ui/icons";
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
  ListBox,
  Select
} from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/AppContext";
import DatePicker from "./DatePicker";
import { setNewTask, getMembers } from "../../fetch";
import styles from "./MenuNewTask.module.css";
import { ErrorMessage } from '@heroui/react';

export function FormAddNewTask({ isOpen, close }) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [color, setColor] = useState("#60A5FA");
  const [category, setCategory] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [members, setMembers] = useState([]);
  const [asigned, setAsigned] = useState([]);
  const [alert, setAlert] = useState(false)


  const categoryColors = {
    research: "#FF9CEE",
    meeting: "#FFB46E",
    review: "#6EDBFF",
    planning: "#FFD76E",
    call: "#A78BFA",
  };

  const {
    selected,
    task,
    setTask,
    descriptionTask,
    setDescritpionTask,
    setTasks,
  } = useContext(AppContext);

  function timeObjectToAmPm(time) {
    if (!time || time.hour == null || time.minute == null) return "";
    const hour12 = time.hour % 12 || 12;
    const period = time.hour >= 12 ? "PM" : "AM";
    const minute = String(time.minute).padStart(2, "0");
    return `${hour12}:${minute} ${period}`;
  }

  function CustomErrorMessage() {
    return (
      <ErrorMessage className="font-bold text-sm">
        Please select a valid time
      </ErrorMessage>
    );
  }


  const handleSetTask = () => {
    const formatDate = selected.toLocaleDateString("en-CA", {
      timeZone: "UTC",
    });

    if (!start || !end) return;

    const now = new Date();
    const taskStart = new Date(`${formatDate} ${start.hour}:${start.minute}`);

    if (taskStart < now) {
      setAlert(true);
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      date: formatDate,
      start: timeObjectToAmPm(start),
      end: timeObjectToAmPm(end),
      title: task,
      descriptionTask,
      asigned: Array.from(asigned),
      category,
      color,
    };

  
    setTasks(prev => [...prev, newTask]);

    // reset
    setAsigned([]);
    setTask("");
    setStart(null);
    setEnd(null);
    setDescritpionTask("");
    setCategory([]);
    setColor("#60A5FA");
    setAlert(false);
    close();
  };


  useEffect(() => {
    const loadMembers = async () => {
      const members = await getMembers();
      setMembers(members);
    };
    loadMembers();
  }, []);

  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger onClick={close} />
            <Modal.Header>
              <div className="flex justify-between pr-7">
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <CirclePlusFill className="size-5" />
                </Modal.Icon>
              </div>
              <Modal.Heading>Add new task</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <Surface variant="default">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <Calendar
                      width={23}
                      height={23}
                      onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                    />
                    <p>Select a date</p>
                  </div>

                  <div className={styles.containerDate}>
                    {isOpenCalendar && <DatePicker />}
                  </div>

                  <div className={styles.containerTime}>
                    <TimeField
                      className="w-[256px]"
                      value={start}
                      onChange={setStart}
                    >
                      <Label>Start time</Label>
                      <DateInputGroup>
                        <DateInputGroup.Input>
                          {(segment) => (
                            <DateInputGroup.Segment segment={segment} />
                          )}
                        </DateInputGroup.Input>
                      </DateInputGroup>
                      <Description>Enter the start time</Description>
                    </TimeField>

                    <TimeField
                      className="w-[256px]"
                      value={end}
                      onChange={setEnd}
                    >
                      <Label>End time</Label>
                      <DateInputGroup>
                        <DateInputGroup.Input>
                          {(segment) => (
                            <DateInputGroup.Segment segment={segment} />
                          )}
                        </DateInputGroup.Input>
                      </DateInputGroup>
                      <Description>Enter the end time</Description>
                    </TimeField>
                  </div>
                  {alert && <CustomErrorMessage />}

                  <Input
                    placeholder="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />

                  <TextArea
                    placeholder="Describe your task"
                    value={descriptionTask}
                    onChange={(e) => setDescritpionTask(e.target.value)}
                  />
                  <Select
                    className="w-[256px]"
                    selectionMode="multiple"
                    placeholder="Select assigned"
                    value={asigned}
                    onChange={(values) => {
                      setAsigned(values ?? []);
                    }}
                  >
                    <Label>Assigned</Label>

                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox selectionMode="multiple">
                        {members.map((member) => (
                          <ListBox.Item
                            key={member.id}
                            id={member.id}
                            textValue={member.nombre}
                          >
                            {member.nombre}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                  <div className="flex checkboxContainer">
                    <CheckboxGroup
                      value={category}
                      onChange={setCategory}
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

                  <div className="flex items-center justify-between">
                    <p>Color:</p>
                    <RadioGroup
                      orientation="horizontal"
                      value={color}
                      onChange={setColor}
                    >
                      {Object.entries(categoryColors).map(([key, c]) => (
                        <Radio key={key} value={c}>
                          <Radio.Control
                            style={{
                              backgroundColor: c,
                              width: 19,
                              height: 19,
                              borderRadius: "50%",
                            }}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                    <div
                      className={styles.boxColor}
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </div>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={close}>
                Cancel
              </Button>
              <Button onClick={handleSetTask}>Add new task</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
