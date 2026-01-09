"use client"
import styles from "./DayOverView.module.css";
import { getProjects } from "../../fetch";
import { useEffect, useState } from "react";

export const DayOverView = () => {
    const [data, setData] = useState([])
     useEffect(() => {
        const loadData = async () => {

          const data = await getProjects();
          setData(data) 
      /*     console.log(data, "data") */

        }
        loadData()
    
    }, [])
    return (
        <div className={styles.DayOverView}>
            <p className={styles.title}>You have {data.length}</p>
            <p className={styles.subtitle}> task for today</p>
        </div>
    )
}