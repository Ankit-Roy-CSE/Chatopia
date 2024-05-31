'use client';

import Image from "next/image";
import { User } from "@prisma/client";
// import useActiveList from "../hooks/useActiveList";
import styles from "./Avatar.module.css";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
  user
}) => {

    const isActive = true;

    return ( 
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image
                alt="Avatar"
                src={user?.image || '/logo.png'}
                fill
                />
            </div>
            <span className={styles.activeStatus}/>
        </div>
    );
}
 
export default Avatar;