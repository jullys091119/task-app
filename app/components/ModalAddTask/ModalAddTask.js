
"use client";
import { Button, Modal } from "@heroui/react";
import { useContext } from "react";
import { AppContext } from "../../AppContext"
import { setMembers } from "@/app/fetch";



export const ModalAddTask = ({ isOpen, close }) => {
  const { number, name, imgRandom } = useContext(AppContext)


   


  return (
    <div className="flex flex-wrap gap-4">
      <Modal isOpen={isOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.Header>
                <Modal.Heading>
                  <FormModal send={close} />
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" slot="close" onClick={()=>handleGetMembers()}>
                  Add member
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}