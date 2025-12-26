import { Input, Label } from "@heroui/react";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { useContext } from "react";
import  {AppContext} from "../../AppContext"


export const FormModal = ({send}) => {
 
     const {number, setNumber, name, setName, imgRandom} = useContext(AppContext)

     
    return (
        <div className="flex w-62 flex-col  gap-4">
            <div className="flex flex-col gap-1 form-avatar-container">
                <Avatar size="lg">
                    <Image src={imgRandom}
                        width={190}
                        height={190}
                        alt="Imagen random"
                    />
                </Avatar>
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="input-type-email">Nombre</Label>
                <Input 
                 value={name}
                 id="input-type-email"
                 placeholder="Juan Perez"
                 type="text"
                 onChange={(text)=>setName(text)}
                 />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="input-type-number">Teléfono</Label>
                <Input 
                 value={number}
                 id="input-type-number"
                 min={0}
                 placeholder="669345678"
                 type="number"
                  onChange={(num)=> setNumber(num)}
                 />
            </div>
        </div>

    )

}
