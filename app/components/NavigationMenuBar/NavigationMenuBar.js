"use client"
import styles from "./NavigationMenuBar.module.css"
import { Button, Avatar } from "@heroui/react"
import { House, CalendarDays, SquarePen, User } from "lucide-react"
import { useEffect } from "react"

export const NavigationMenuBar = () => {

    const BtnGoToTasks = () => {
        const buttons = [
            { id: 1, icon: <House /> },
            { id: 2, icon: <CalendarDays /> },
            { id: 3, icon: <SquarePen /> },
            { id: 4, icon: <User /> }
        ]
        return (
            buttons.map(btn => (
               <Avatar className={styles.avatar}>
                    <Button key={btn.id} className={styles.button} >
                        {btn.icon}
                    </Button>
               </Avatar>
            ))
        )
    }


    return (
        <div className={styles.containerNav}>
           <BtnGoToTasks/>
        </div>

    )
}


