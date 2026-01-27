"use client"
import styles from "./ViewCalendarTask.module.css"
import { Avatar, Card, Separator } from "@heroui/react"
import { Clock10 } from "lucide-react"
import { getMembers, updateTask } from "../../fetch"
import React, { useEffect, useState } from "react"
import { CircleXmarkFill } from "@gravity-ui/icons"
import ModalTopics from "../ModalTopics/ModalTopics"

export const ViewCalendarTask = ({ data, onDelete, topics }) => {
  const [avatar, setAvatar] = useState([])
  const [topicOpen, setTopicOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const loadAvatar = async () => {
      const avatar = await getMembers()
      setAvatar(avatar)
    }
    loadAvatar()
     console.log(selectedItem,"selected")
  }, [topics])

  const ShowAvatar = ({ visibleAvatars = [], hiddenCount = 0 }) => {
    if (!visibleAvatars.length) return null

    return (
      <div className={styles.assignedTo}>
        <p style={{ margin: "10px 0" }}>Assigned to:</p>

        <div className={styles.containerAvatar}>
          <div className="flex -space-x-2 relative">
            {visibleAvatars.map((user) => (
              <React.Fragment key={user.id}>
                <Avatar
                  className={`
                  ring-1 ring-background
                  ${styles.avatarImage}
                  transition-all duration-200
                  hover:scale-105
                  hover:ring-primary
                `}
                >
                  <Avatar.Image
                    alt={user?.name ?? "User"}
                    src={user?.avatar}
                    className="w-full h-full object-cover"
                  />
                </Avatar>

                {visibleAvatars.length === 1 && (
                  <p style={{ marginLeft: 20 }} className="mt-3">
                    {visibleAvatars[0]?.name}
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
    )
  }

  return (
    <div className={styles.containerTasks}>
      <div>
        {data.map((item) => {
          const assignedAvatars = avatar.filter((user) =>
            item?.asigned?.includes(user.id)
          )
          const visibleAvatars = assignedAvatars.slice(0, 3)
          const hiddenCount = assignedAvatars.length - visibleAvatars.length
          const recortar =
            item?.descriptionTask?.length > 15
              ? item.descriptionTask.slice(0, 25).concat("....")
              : item.descriptionTask

          return (
            <div key={item.id} className={styles.hours}>
              <div className={styles.containerHours}>
                <p className={styles.displayTime}>{item.start}</p>
                <Separator className="my-4 bg-linear-to-r from-transparent via-default-500 to-transparent" />
                <p className={styles.endTime}>{item.end}</p>
              </div>

              <Card
                className="w-[290px]  m-1 position-relative"
                style={{ backgroundColor: item.color }}
                onClick={() => {
                  setSelectedItem(item)
                  setTopicOpen(true)
                }}
              >
                <Card.Header>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Card.Title
                      onClick={(e) => e.stopPropagation()}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        e.stopPropagation()
                        const newTitle = e.currentTarget.textContent
                        updateTask({ id: item.id, title: newTitle })
                      }}
                    >
                      {item.title}
                    </Card.Title>

                    <span
                      style={{ cursor: "pointer", fontWeight: "bold" }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(item.id)
                      }}
                    >
                      <CircleXmarkFill />
                    </span>
                  </div>

                  <div className={styles.eschedule} onClick={(e) => e.stopPropagation()}>
                    <Clock10 strokeWidth={0.75} size={15} color="black" />
                    <Card.Title>
                      {item.start}
                      {"--"}
                      {item.end}
                    </Card.Title>
                  </div>

                  <div className={styles.descriptionCard}>
                    <Card.Title
                      onClick={(e) => e.stopPropagation()}
                      contentEditable
                      suppressContentEditableWarning
                      className={styles.descriptionCardP}
                      onBlur={(e) => {
                        e.stopPropagation()
                        const newDescription = e.currentTarget.textContent
                        updateTask({ id: item.id, descriptionTask: newDescription })
                      }}
                    >
                      {recortar}
                    </Card.Title>
                  </div>
                </Card.Header>

                <ShowAvatar visibleAvatars={visibleAvatars} hiddenCount={hiddenCount} />
              </Card>
            </div>
          )
        })}
      </div>

      {topicOpen && selectedItem && selectedItem.category.includes("event") &&  (
        <ModalTopics
          isOpen={topicOpen}
          closeTopicModal={setTopicOpen}
          topics={selectedItem?.topics}
          data={selectedItem}
          showAvatar={
            <ShowAvatar
              visibleAvatars={avatar
                .filter((user) => selectedItem?.asigned?.includes(user.id))
                .slice(0, 3)}
              hiddenCount={
                avatar.filter((user) => selectedItem?.asigned?.includes(user.id))
                  .length -
                avatar
                  .filter((user) => selectedItem?.asigned?.includes(user.id))
                  .slice(0, 3).length
              }
            />
          }
        />
      )}
      
    </div>
  )
}
