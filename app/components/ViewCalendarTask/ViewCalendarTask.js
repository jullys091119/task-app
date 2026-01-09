"use client"
import styles from "./ViewCalendarTask.module.css"
import { Avatar, Card, Separator } from "@heroui/react";
import { Clock10} from "lucide-react";
import { getMembers,updateTask } from "../../fetch";
import React, { useEffect, useState } from "react";
import {CircleXmarkFill} from '@gravity-ui/icons';


export const ViewCalendarTask = ({ data, onDelete }) => {
  const [avatar, setAvatar] = useState([])
 


  useEffect(() => {
    const loadAvatar = async () => {
      const avatar = await getMembers();
      setAvatar(avatar)
    }
    loadAvatar()
  }, [])


  function formatTime(time) {
    const hour12 = time.hour % 12 || 12;
    const period = time.hour >= 12 ? "PM" : "AM";
    const minute = time.minute.toString().padStart(2, "0");
    return `${hour12}:${minute} ${period}`;
  }

  return (
    <div className={styles.containerTasks}>
      <div>
        {
          data.map((item, i) => {
            const assignedAvatars = avatar.filter(user =>
              item.asigned.includes(user.id)
            );
            const visibleAvatars = assignedAvatars.slice(0, 3);
            const hiddenCount = assignedAvatars.length - visibleAvatars.length;
            const recortar = item.descriptionTask.length > 15 ?
              item.descriptionTask.slice(0, 25).concat("....") :
              item.descriptionTask
            return (
              <div key={item.id} className={styles.hours}>
                <div className={styles.containerHours}>
                  <p className={styles.displayTime}>{formatTime(item.start)}</p>
                  <Separator className="my-4 bg-linear-to-r from-transparent via-default-500 to-transparent" />
                  <p className={styles.endTime}>{formatTime(item.end)}</p>
                </div>
                <Card className="w-[290px]  m-1 position-relative" style={{ backgroundColor: item.color }} >
                  <Card.Header>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Card.Title
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newTitle = e.currentTarget.textContent;
                          updateTask({ id: item.id, title: newTitle });
                        }}
                        onClick={() => setLocalEdit(true)}
                      >
                        {item.title}
                      </Card.Title>

                     <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => onDelete(item.id)}><CircleXmarkFill/></span>

                    </div>
                    <div className={styles.eschedule}>
                      <Clock10 strokeWidth={0.75} size={15} color="black" />
                      <Card.Title>{formatTime(item.start)}{"--"}{formatTime(item.end)}</Card.Title>
                    </div>
                    <div className={styles.descriptionCard}>
                      <Card.Title
                        contentEditable
                        suppressContentEditableWarning
                        className={styles.descriptionCardP}
                        onBlur={(e) => {
                          const newDescription = e.currentTarget.textContent;
                          updateTask({ id: item.id, descriptionTask: newDescription });
                        }}
                      >
                        {recortar}
                      </Card.Title>
                    </div>
                    <div className={styles.assignedTo}>
                      <p style={{ margin: "10px 0" }}>Assigned to:</p>
                      <div className={styles.containerAvatar}>
                        <div className="flex -space-x-2">
                          {visibleAvatars.map(user => (
                            <React.Fragment key={user.id}>
                              <Avatar className="ring-1 ring-background">
                                <Avatar.Image
                                  alt={user.name}
                                  src={user.avatar}
                                  className="w-full h-full object-cover"
                                />
                              </Avatar>
                              {assignedAvatars.length === 1 && (
                                <p style={{ marginLeft: 20 }} className="mt-3">
                                  {assignedAvatars[0].nombre}
                                </p>
                              )}
                            </React.Fragment>
                          ))}
                          {hiddenCount > 0 && (
                            <Avatar className="ring-2 ring-background">
                              <Avatar.Fallback className="text-xs">
                                +{hiddenCount}
                              </Avatar.Fallback>
                            </Avatar>
                          )}
                        </div>
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
