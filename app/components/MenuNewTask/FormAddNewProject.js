

"use client";

import { Envelope, PersonPlus } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField, TextArea } from "@heroui/react";
import { useContext, useState } from "react";
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
    setDescriptionProject

  } = useContext(AppContext)

  const handleSetProject = () => {
    setNewProject(nameEmployed, assignedTeam, descriptionProject, assignedToProject),
      setNameEmployed("")
    setAssignedTeam("")
    setAssignedToProject("")
    setDescriptionProject("")
  }

  const handleCloseModal = () => {
    close()
  }
  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger onClick={handleCloseModal} />
            <Modal.Header>
              <div className="flex justify-between pr-7">
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground flex gap-30">
                  <PersonPlus className="size-5" />
                </Modal.Icon>
              </div>
              <Modal.Heading>Agregar Nuevo Proyecto</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted ">
                Todo queda en nuestra base interna.
                No usamos datos externos ni fotos reales — las ilustraciones de los proyectos son generadas o seleccionadas solo para dar un toque visual bonito.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text">
                    <Label>Empresa</Label>
                    <Input placeholder="Empresa" onChange={(e) => setNameEmployed(e.target.value)} value={nameEmployed} />
                  </TextField>
                  <SelectRequiredTeam />
                  <TextArea
                    aria-label="Quick project update"
                    className="h-32 w-65"
                    placeholder="Share a quick project update..."
                    onChange={(e) => setDescriptionProject(e.target.value)} value={descriptionProject}
                  />

                  <SelectAssigned />

                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button slot="close" onClick={handleSetProject}>Agregar</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}