import styles from "./NewTask.module.css";
import imagen from "../../img/thinking.png"
import Image from "next/image";

export const NewTask = () => {
    return (
        <div className="container-nextTask">
            <p className={styles.newTask}>Nueva Tarea</p>

            <div className={styles.wrapperContainerImages}>
                <div className={styles.containerImage}>
                    <div>
                        <p className={styles.title}>Desarrolladores</p>
                        <p className={styles.subtitle}>Dashboard UI</p>
                         <p className={styles.team}>Equipo: desarrollo</p>

                        <Image
                            src={imagen}
                            width={90}
                            height={90}
                            alt="imagen"
                            className={styles.imageTask}
                        />

                    </div>
                    <div className={styles.members}>

                    </div>

                </div>
                <div className={styles.one}></div>
                <div className={styles.two}></div>

            </div>

        </div>
    )
}