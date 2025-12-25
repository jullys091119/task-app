import styles from "./DayOverView.module.css"
export const DayOverView = () => {
    return (
        <div className={styles.DayOverView}>
            <p className={styles.title}>Tienes 3 tareas</p>
            <p className={styles.subtitle}>por hacer hoy</p>
        </div>
    )
}