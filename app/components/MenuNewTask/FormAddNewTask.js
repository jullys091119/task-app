"use client";

import { CirclePlusFill } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Modal,
  Surface,
  TextArea,
  Checkbox,
  Label,
  Description,
  TimeField,
  CheckboxGroup,
  Radio,
  RadioGroup,
  ListBox,
  Select,
  ErrorMessage,
  DateInputGroup,
} from "@heroui/react";

import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "@/app/AppContext";
import DatePicker from "./DatePicker";
import { getMembers } from "../../fetch";
import styles from "./MenuNewTask.module.css";

// ---------------- ContainerTime ----------------
export function ContainerTime({ label, time, onChange }) {
  return (
    <TimeField value={time} onChange={onChange} className="w-[256px]">
      <Label>{label}</Label>
      <DateInputGroup>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
      </DateInputGroup>
      <Description>Enter the {label.toLowerCase()}</Description>
    </TimeField>
  );
}

// ---------------- DiscussionTopics ----------------
function DiscussionTopics({ category, topics, setTopics, categoryColors }) {
  const getRandomColor = () => {
    const keys = Object.keys(categoryColors);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return categoryColors[randomKey];
  };

  const addTopic = () => {
    const newTopic = {
      id: crypto.randomUUID(),
      title: "",
      start: { hour: 0, minute: 0, second: 0, millisecond: 0 },
      end: { hour: 0, minute: 0, second: 0, millisecond: 0 },
      color: getRandomColor(),
    };

    setTopics((prev) => [...prev, newTopic]);
  };

  const updateTopic = (id, field, value) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  if (!category.includes("event")) return null;

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label>Topics to discuss</Label>

      <button
        type="button"
        onClick={addTopic}
        className="bg-gray-200 px-2 py-1 rounded w-max"
      >
        + Add topic
      </button>

      {topics.map((topic) => (
        <div key={topic.id} className="flex flex-col gap-2 border p-2 rounded">
          <Input
            placeholder="Topic title"
            value={topic.title}
            onChange={(e) => updateTopic(topic.id, "title", e.target.value)}
          />

          <div className="flex gap-2">
            <ContainerTime
              label="Start"
              time={topic.start}
              onChange={(value) => updateTopic(topic.id, "start", value)}
            />
            <ContainerTime
              label="End"
              time={topic.end}
              onChange={(value) => updateTopic(topic.id, "end", value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FormAddNewTask({ isOpen, close }) {
  const [color, setColor] = useState("#60A5FA");
  const [category, setCategory] = useState([]);
  const [members, setMembers] = useState([]);
  const [asigned, setAsigned] = useState([]);
  const [alert, setAlert] = useState(false);

  const [start, setStart] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const [end, setEnd] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const categoryColors = useMemo(
    () => ({
      research: "#FF9CEE",
      meeting: "#FFB46E",
      review: "#6EDBFF",
      planning: "#FFD76E",
      call: "#A78BFA",
    }),
    []
  );

  const {
    selected,
    setSelected,
    task,
    setTask,
    descriptionTask,
    setDescritpionTask,
    setTasks,
    topics,
    setTopics,
  } = useContext(AppContext);

 
  useEffect(() => {
    if (isOpen) {
      setSelected((prev) => prev ?? new Date());
    }
  }, [isOpen, setSelected]);

  useEffect(() => {
    const loadMembers = async () => setMembers(await getMembers());
    loadMembers();
  }, []);

  const timeObjectToAmPm = (time) => {
    if (!time || time.hour == null || time.minute == null) return "";
    const hour12 = time.hour % 12 || 12;
    const period = time.hour >= 12 ? "PM" : "AM";
    const minute = String(time.minute).padStart(2, "0");
    return `${hour12}:${minute} ${period}`;
  };

  const handleSetTask = () => {
    const safeSelected = selected instanceof Date ? selected : new Date();
    const formatDate = safeSelected.toLocaleDateString("en-CA");

    const taskStart = new Date(
      `${formatDate} ${String(start.hour).padStart(2, "0")}:${String(
        start.minute
      ).padStart(2, "0")}`
    );

    if (taskStart < new Date()) {
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

      
      topics: category.includes("event") ? [...topics] : [],
    };

    setTasks((prev) => [...prev, newTask]);

    // reset
    setAsigned([]);
    setTask("");
    setStart({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    setEnd({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    setDescritpionTask("");
    setCategory([]);
    setColor("#60A5FA");
    setAlert(false);

    setTopics([]);

    close();
  };

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
              <Surface variant="default" className="flex flex-col gap-4">
                <div className={styles.containerTime}>
                  <ContainerTime
                    label="Start time"
                    time={start}
                    onChange={setStart}
                  />
                  <ContainerTime label="End time" time={end} onChange={setEnd} />
                </div>

                {alert && <ErrorMessage>Please select a valid time</ErrorMessage>}

                <div className={styles.containerDate}>
                  <DatePicker value={selected} onChange={setSelected} />
                </div>

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
                  onChange={(values) => setAsigned(values ?? [])}
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

                <DiscussionTopics
                  category={category}
                  topics={topics}
                  setTopics={setTopics}
                  categoryColors={categoryColors}
                />

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
