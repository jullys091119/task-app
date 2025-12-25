"use client"
import { useEffect, useState } from "react"
import { Avatar } from "@heroui/react"
import styles from "./Members.module.css";
import { setImageData } from "./../../fetch";
import Image from "next/image";

export const Members = () => {
  const [members, setMembers] = useState([])


  useEffect(() => {
    const loadData = async () => {
      const data = await setImageData();
      setMembers(data)
    }
    loadData()
  }, [])

  const ShowAvatar = (img) => {
    return (
      <Avatar>
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

  return (
    <div className="container-members">
      <p className={styles.membersTitle}>{members.length} Members</p>
      <div className={styles.containerMembers}>
        {
          members.map((item, i) => (<ShowAvatar img={item.image} key={i} />))
        }
      </div>

    </div>
  )
}