"use client"
import styles from "./NavigationMenuBar.module.css"
import { Button, Avatar } from "@heroui/react"
import { House, CalendarDays, SquarePen, User } from "lucide-react"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const NavigationMenuBar = () => {
    const router = useRouter();
    const path = usePathname()
    const [activeId, setActiveId] = useState(null);

    const handleOpen = (id) => {
        setActiveId(id)
        switch (id) {
            case 1: router.push("/")
                break;
            case 2: router.push("/CalendarTask");
                break;
            case 3: router.push("/filterTasks")
        }

    }

    const BtnGoToTasks = () => {
        const buttons = [
            { id: 1, icon: <House /> },
            { id: 2, icon: <CalendarDays /> },
           { id: 3, icon: <SquarePen /> },
          /*   { id: 4, icon: <User /> }  */
        ]
        return (
            buttons.map((btn, i) => (
                <Avatar key={i}>
                    <Button key={btn.id} className={`${styles.button} ${activeId === btn.id ? styles.activeButton : styles.button}`} onClick={() => handleOpen(btn.id)} >
                        {btn.icon}
                    </Button>
                </Avatar>
            ))
        )
    }


    useEffect(() => {
        path === "/" ? setActiveId(1) : null
    }, [path])

    return (
        <div className={styles.containerNav}>
            <BtnGoToTasks />
        </div>

    )
}


