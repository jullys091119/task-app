

"use client";

import { Envelope, PersonPlus } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField, Avatar } from "@heroui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { AppContext } from "@/app/AppContext";
import { SelectRol } from "./SelectRol"
import { setMembers } from "@/app/fetch";

export function FormAddMember({isOpen, close}) {
  const {name, setName, imgRandom, roleMember,setRoleMember } = useContext(AppContext)

  const handleSetMembers = () => {
     setMembers(name, roleMember, imgRandom)
     setName("")
     setRoleMember("")
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
                <Avatar>
                  <Image src={imgRandom} width={80} height={90} alt="img" />
                </Avatar>

              </div>
              <Modal.Heading>Add new member</Modal.Heading>
            </Modal.Header>
            <Modal.Body >
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} />
                  </TextField>
                  <SelectRol />

                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button slot="close"  onClick={handleSetMembers}>Add</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}