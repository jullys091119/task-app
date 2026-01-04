import styles from "./ViewCalendarTask.module.css"
import { Avatar, Card, Separator } from "@heroui/react";
import { Clock10 } from "lucide-react";
import Image from "next/image";

export const ViewCalendarTask = ({ data }) => {
  return (
    <div className={styles.containerTasks}>
      <div>
        {
          data.map((item) => {
            return (
              <div key={item.id} className={styles.hours}>
                <div className={styles.containerHours}>
                  <p className={styles.displayTime}>{item.displayTime}</p>
                  <Separator className="my-4 bg-linear-to-r from-transparent via-default-500 to-transparent" />
                  <p className={styles.endTime}>{item.endTime}</p>
                  <Separator className="my-4 bg-linear-to-r from-transparent via-default-500 to-transparent" />
                </div>

                <Card className="w-[240px] h-[160px] m-1" style={{ backgroundColor: item.color }}>
                  <Card.Header>
                    <Card.Title>{item.title}</Card.Title>

                    <div className={styles.eschedule}>
                      <Clock10 strokeWidth={0.75} size={15} color="black" />
                      <Card.Title>{item.displayTime}-{item.endTime}</Card.Title>
                    </div>

                    <div className={styles.assignedTo}>
                      <span>Assigned to:</span>
                      <div className={styles.containerAvatar}>
                        {item.assignedTo ? (
                          <>
                            <Avatar>
                              <Image
                                src={item.assignedTo.avatar}
                                width={40}
                                height={40}
                                alt="imagen"
                                className="rounded-full"
                              />
                            </Avatar>
                            <p>{item.assignedTo.name}</p>
                          </>
                        ) : item.isGroup ? (
                          <p className="text-sm font-medium">
                            {item.participantsCount} participants
                          </p>
                        ) : (
                          <p>No asignado</p>
                        )}
                      </div>
                    </div>
                  </Card.Header>

                  <Card.Footer />
                </Card>

              </div>
            )

          })
        }
      </div>
    </div>
  )
}