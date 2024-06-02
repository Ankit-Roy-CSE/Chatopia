"use client"

import { FullMessageType } from "@/app/types";
import styles from "./Body.module.css"

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    return (
        <div className={styles.wrapper}>
            Body
        </div>
    )
}

export default Body;