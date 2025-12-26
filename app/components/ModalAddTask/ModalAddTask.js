
"use client";
import { Button, Modal } from "@heroui/react";
import { FormModal } from "../FormModal/FormModal"
import { useContext } from "react";
import { AppContext } from "../../AppContext"
import  {GET} from "../../api/members/route"


export const ModalAddTask = ({ isOpen, close }) => {
  const { number, name, imgRandom } = useContext(AppContext)

 const getMembers = () => {
   GET()
};

getMembers();



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
                <Button className="w-full" slot="close" onClick={getMembers()}>
                  Agregar Miembro
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}