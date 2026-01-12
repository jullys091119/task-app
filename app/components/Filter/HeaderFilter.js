"use client";
import styles from "./HeaderFilter.module.css"
import { ArrowLeft } from '@gravity-ui/icons';
import { useRouter } from "next/navigation";
import {ListFilterTask} from "./ListFilterTask/ListFilterTask";

const HeaderFilter = () => {
    const router = useRouter();
    const goHome = () => {
        router.push("/")
    }
    return (
        <header>
            <div className={styles.navFilter}>
                <ArrowLeft onClick={goHome} />
                <h1>Daily filter</h1>
                <ListFilterTask  />
            </div>
        </header>
    )

}


export default HeaderFilter