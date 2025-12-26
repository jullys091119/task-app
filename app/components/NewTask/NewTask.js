"use client"
import { useState, useEffect } from "react";
import styles from "./NewTask.module.css";
import imagen from "../../img/thinking.png"
import Image from "next/image";
import { setImageData } from "@/app/fetch";
import { Avatar, Button } from "@heroui/react";
import { ChevronRight } from "lucide-react";
    

export const NewTask = () => {
    const [members, setMembers] = useState([])
    
    useEffect(() => {

        const loadImageData = async () => {
            const images = await setImageData();
            setMembers(images)
        }
        loadImageData()
    }, [])

    const ShowAvatar = (img,i) => {
        return (
            <Avatar className={styles.avatar}  key={i}>
                <Image
                    src={img.img}
                    width={90}
                    height={90}
                    alt="Imagenes de los miembros"
                    className={styles.img}
                />
            </Avatar>
        )
    }


    const BtnGoToTasks = () => (
        <Button isIconOnly variant="primary" size="lg">
            <ChevronRight />
        </Button>
    )

    return (
        <div className="container-nextTask">
            <p className={styles.newTask}>Nueva Tarea</p>

            <div className={styles.wrapperContainerImages}>
                <div className={styles.containerImage}>
                    <div>
                        <p className={styles.title}>Desarrolladores</p>
                        <p className={styles.subtitle}>Dashboard UI</p>
                        <p className={styles.team}>Equipo: desarrollo</p>

                        <Image
                            src={imagen}
                            width={90}
                            height={90}
                            alt="imagen"
                            className={styles.imageTask}
                        />

                    </div>
                    <div className={styles.members}>

                        {
                            members.map((item, i) => (i < 3 && <ShowAvatar img={item.image} key={i} />))
                        }
                        <BtnGoToTasks/>
                    </div>

                </div>
                <div className={styles.one}></div>
                <div className={styles.two}></div>

            </div>

        </div>
    )
}