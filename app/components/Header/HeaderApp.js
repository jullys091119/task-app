"use client"
import { Avatar } from '@heroui/react';
import { Bell } from 'lucide-react';
import styles from "./Header.module.css";
import { setImageData } from "./../../fetch"
import { useEffect, useState } from 'react';
import Image from 'next/image';



export const HeaderApp = () => {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const data = await setImageData()
      setMembers(data)
    }

  /*   console.log(members) */
    loadData()

  }, [])

  return (
    <div className={styles.header}>
      <div className={styles.avatarContent}>
        <Avatar size='lg'>
           <Avatar.Image/>
          {members?.[1]?.image && (
            <Image
              src={members[1].image}
              width={90}
              height={90}
              alt="Avatar"
              className={styles.img}
          
            />
          )}
        </Avatar>
        <div className={styles.grettings}>
          <p className={styles.grettingUser}>Good mornig !</p>
          <p className={styles.name}>Juliá Ontiveros</p>
        </div>
      </div>
      <div>
        <Bell absoluteStrokeWidth />
      </div>
    </div>
  )
}



