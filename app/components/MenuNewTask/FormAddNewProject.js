"use client";

import { Envelope, PersonPlus } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  TextArea,
} from "@heroui/react";
import { useContext } from "react";
import { AppContext } from "@/app/AppContext";
import { SelectAssigned } from "./SelectAssigned";
import { SelectRequiredTeam } from "./SelectRequiredTeam";
import { setNewProject } from "../../fetch";

export function FormAddNewProject({ isOpen, close }) {
  const {
    nameEmployed,
    setNameEmployed,
    assignedTeam,
    setAssignedTeam,
    assignedToProject,
    setAssignedToProject,
    descriptionProject,
    setDescriptionProject,
  } = useContext(AppContext);

  const handleSetProject = () => {
    setNewProject(
      nameEmployed,
      assignedTeam,
      descriptionProject,
      assignedToProject
    );
    setNameEmployed("");
    setAssignedTeam("");
    setAssignedToProject("");
    setDescriptionProject("");
  };

  const handleCloseModal = () => {
    close();
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger onClick={handleCloseModal} />

            <Modal.Header>
              <div className="flex justify-between pr-7">
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <PersonPlus className="size-5" />
                </Modal.Icon>
              </div>
              <Modal.Heading>Add New Project</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" name="company" type="text">
                    <Label>Company</Label>
                    <Input
                      placeholder="Company name"
                      value={nameEmployed}
                      onChange={(e) => setNameEmployed(e.target.value)}
                    />
                  </TextField>

                  <SelectRequiredTeam />

                  <TextArea
                    aria-label="Project description"
                    className="h-32 w-65"
                    placeholder="Write a brief project description..."
                    value={descriptionProject}
                    onChange={(e) =>
                      setDescriptionProject(e.target.value)
                    }
                  />

                  <SelectAssigned />
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button
                slot="close"
                variant="secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button slot="close" onClick={handleSetProject}>
                Add Project
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
