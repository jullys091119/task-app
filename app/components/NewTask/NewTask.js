"use client"
import { useState, useEffect } from "react";
import styles from "./NewTask.module.css";
import imagen from "../../img/thinking.png"
import Image from "next/image";
import { getMembers, getProjects, setImageData } from "@/app/fetch";
import { Avatar, Button } from "@heroui/react";
import { Car, ChevronRight, ChevronLeft } from "lucide-react";


export const NewTask = () => {
  const [members, setMembers] = useState([])
  const [project, setProjects] = useState([])
  const [chevronLeft, setChevronLeft] = useState(false)
  const [count, setCount] = useState(0)
  const [avatarsMembers, setAvatarsMembers] = useState([])

  useEffect(() => {
    const loadImageData = async () => {
      const images = await setImageData();
      const data = await getProjects();
      const getAvatarMembers = await getMembers();
      setAvatarsMembers(getAvatarMembers)
      setProjects(data)
      setMembers(images)
    }
    loadImageData()


  }, [count])


  const ShowAvatar = ({ img, i, asignados }) => {

    return (
      <Avatar className={styles.avatar} key={i}>
        {
          /*   console.log(asignado, "asignado") */
        }
        <Image
          src={img}
          width={90}
          height={90}
          alt="Imagenes de los miembros"
          className={styles.img}
        />
      </Avatar>
    )
  }


  const nextProject = () => {
    if (count < project.length - 1) {
      setCount(count + 1)
    }

    if (count === project.length - 2) {
      setChevronLeft(true)
    }

  }

  const backProject = () => {
    if (count > 0) {
      setCount(count - 1)
    } else {
      setCount(0)
    }

    if (count === 1) {
      setChevronLeft(false)
    }
  }



  const CardProjects = () => {


    return (
      <div>
        {
          count < project.length && (
            <div className={styles.wrapperContainerImages}>

              <div className={styles.containerImage}>
                <div className={styles.wrapperContent}>
                  <>
                    <p className={styles.title}>{project[count]?.nombre}</p>
                    <p className={styles.subtitle}>Dashboard UI</p>
                    <p className={styles.team}>Equipo: {project[count]?.subtitulo}</p>
                  </>
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
                    avatarsMembers
                      .filter(member =>
                        project[count]?.asignados.includes(member.id)
                      )
                      .slice(0, 3)
                      .map(member => (
                        <ShowAvatar
                           key={`${project[count].id}-${member.id}`}
                          img={member.avatar}
                        />
                      ))
                  }

                  {chevronLeft ? <BtnBackToTasks /> : <BtnGoToTasks />}
                </div>


              </div>

              <div className={styles.one}></div>
              <div className={styles.two}></div>

            </div>)
        }


      </div>
    )
  }


  const BtnGoToTasks = () => (
    <Button isIconOnly variant="primary" size="lg" onClick={() => { nextProject() }}>
      <ChevronRight />
    </Button>
  )

  const BtnBackToTasks = () => (
    <Button isIconOnly variant="primary" size="lg" onClick={() => { backProject() }}>
      <ChevronLeft />
    </Button>
  )

  return (
    <div className="container-nextTask">
      <p className={styles.newTask}>Siguiente Tarea</p>
      <CardProjects />
    </div>
  )
}