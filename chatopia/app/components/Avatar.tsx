'use client';

import Image from "next/image";
import { User } from "@prisma/client";
import styles from "./Avatar.module.css";
import { FullConversationType } from "@/app/types";

interface AvatarProps {
  user?: User;
  group?: FullConversationType;
}

const Avatar: React.FC<AvatarProps> = ({
  user , group
}) => {

    const isActive = true;
    return ( 
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image
                alt="Avatar"
                src={user?.image || group?.image || '/logo.png'}
                fill
                />
            </div>
            <span className={styles.activeStatus}/>
        </div>
    );
}
 
export default Avatar;