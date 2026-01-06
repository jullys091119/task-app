"use client"
import { useState, useEffect } from "react";
import styles from "./NewTask.module.css";
import imagen from "../../img/thinking.png"
import Image from "next/image";
import { getMembers, getProjects, setImageData } from "@/app/fetch";
import { Avatar, Button } from "@heroui/react";
import { Car, ChevronRight, ChevronLeft } from "lucide-react";
import { TooltipTask } from "../TooltipTask/TooltipTask"


export const NewTask = () => {
  const [members, setMembers] = useState([])
  const [project, setProjects] = useState([])
  const [chevronLeft, setChevronLeft] = useState(false)
  const [count, setCount] = useState(0)
  const [avatarsMembers, setAvatarsMembers] = useState([])
  const [tooltip, setTooltip] = useState(false);

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


  const ShowAvatar = ({ img, i }) => {
    return (
      <Avatar className={styles.avatar} key={i}>
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


  const handleTooltip = () => {
    setTooltip(!tooltip)
  }

  const CardProjects = () => {
    return (
      <>
        <div>
          {
            count < project.length && (
              <div className={styles.wrapperContainerImages} onClick={handleTooltip} >
                {<TooltipTask isOpen={tooltip} description={project[count].descripcion} />}

                <div className={styles.containerImage}>
                  <div className={styles.wrapperContent}>
                    <>
                      <p className={styles.title}>{project[count]?.nombre}</p>
                      <p className={styles.subtitle}>Dashboard UI</p>
                      <p className={styles.team}>Team: {project[count]?.subtitulo}</p>
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
                    <div>
                      {
                        avatarsMembers
                          .filter(member =>
                            project[count]?.asignados.includes(member.id)
                          )
                          .slice(0, 3)


                          .map(member => {
                            const currentProject = project[count];
                            const isThreeAssigned = currentProject?.asignados.length === 3;
                            return (
                              <ShowAvatar
                                key={`${project[count].id}-${member.id}`}
                                img={member.avatar}
                              />
                            )
                        })
                      }

                    </div>
                    <div>
                      {chevronLeft ? <BtnBackToTasks /> : <BtnGoToTasks />}
                    </div>
                  </div>
                </div>
                <div className={styles.one}></div>
                <div className={styles.two}></div>
              </div>)
          }
        </div>
      </>

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
      <p className={styles.newTask}>Next Project</p>
      <CardProjects />
    </div>
  )
}