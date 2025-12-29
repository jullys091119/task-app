"use client"
import { useEffect, useState } from "react"
import { Avatar } from "@heroui/react"
import styles from "./Members.module.css";
import { setImageData, getMembers } from "./../../fetch";
import Image from "next/image";
import { Plus } from "lucide-react";
import {FormAddMember} from "../FormAddMember/FormAddMemeber"


export const Members = () => {
  const [members, setMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    const loadData = async () => {
      const data = await getMembers();
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


  const handleModalNewMember = () => {
    setModalVisible(true)
  }

  return (
    <div>
      {modalVisible && <FormAddMember isOpen={modalVisible}  close={() => setModalVisible(false)} />}

      <div className="container-members">
        <div className={styles.containerAvatarMembers}>
          <p className={styles.membersTitle}>{members.length} Members</p>
          <Avatar size="sm" className={styles.avatarMembers} onClick={handleModalNewMember} >
            <Plus size={16} strokeWidth={0.5} absoluteStrokeWidth color="#ffffff" />
          </Avatar>
        </div>
        <div className={styles.containerMembers}>
          {
            members.map((item, i) => (<ShowAvatar img={item.avatar} key={i} />))
          }
        </div>


      </div>
    </div>
  )
}