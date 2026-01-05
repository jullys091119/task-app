"use client"
import styles from "./ViewCalendarTask.module.css"
import { Avatar, Card, Separator } from "@heroui/react";
import { Clock10 } from "lucide-react";
import Image from "next/image";
import { getMembers } from "../../fetch";
import { useEffect, useState } from "react";

export const ViewCalendarTask = ({ data }) => {
  const [avatar, setAvatar] = useState([])


  useEffect(() => {
    const loadAvatar = async () => {
      const avatar = await getMembers();
      setAvatar(avatar)
    }
    loadAvatar()
  }, [])

  return (
    <div className={styles.containerTasks}>
      <div>
        {
          data.map((item) => {
             const recortar = item.descriptionTask.length > 15 ? 
             item.descriptionTask.slice(0,25).concat("...."):
             item.descriptionTask
           
             
            return (
              <div key={item.id} className={styles.hours}>
                <div className={styles.containerHours}>
                  <p className={styles.displayTime}>{item.start.hour}{":"}{item.start.minute}{"0"}</p>
                  <Separator className="my-4 bg-linear-to-r from-transparent via-default-500 to-transparent" />
                  <p className={styles.endTime}>{item.end.hour}{":"}{item.end.minute}{"0"}</p>
                </div>
                <Card className="w-[290px]  m-1" style={{ backgroundColor: item.color }}>
                  <Card.Header>
                    <Card.Title>{item.title}</Card.Title>
                    <div className={styles.eschedule}>
                      <Clock10 strokeWidth={0.75} size={15} color="black" />
                      <Card.Title>{item.start.hour}{":"}{item.start.minute}{"0"}--{item.end.hour}{":"}{item.end.minute}{"0"}</Card.Title>
                    </div>
                    <div className={styles.descriptionCard}>
                      <p className={styles.descriptionCardP}>{recortar}</p>
                    </div>
                    <div className={styles.assignedTo}>
                      <p style={{ margin: "10px 0" }}>Assigned to:</p>
                      <div className={styles.containerAvatar}>
                        {
                          avatar.map((itemAvatar) => {
                            return (
                              <div key={itemAvatar.id}>
                                {
                                  item.asigned.includes(itemAvatar.id) &&
                                  <Avatar size="sm" className={styles.avatarCard} key={itemAvatar.id}>
                                    <Image
                                      src={itemAvatar.avatar}
                                      width={60}
                                      height={60}
                                      alt="imagen"
                                      className="rounded-full"
                                    />
                                  </Avatar>
                                }
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </Card.Header>
                </Card>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}