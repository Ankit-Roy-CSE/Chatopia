'use client';

import Image from "next/image";
import { User } from "@prisma/client";
import styles from "./Avatar.module.css";
import { FullConversationType } from "@/app/types";
import { useEffect, useState } from "react";
import {socket} from "@/socket"

interface AvatarProps {
  user?: User;
  group?: FullConversationType;
  isActive?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ user , group , isActive}) => {
    // const [ activeStatus , setActiveStatus ] = useState(false);

    // useEffect(()=>{
    //   const activeChangeHandler = ( users : string[] )=>{
    //     // If current avatar belongs to individual user , and not to group
    //     if(user){
    //       // If current user belongs to list of online users , then mark activeStatus as true
    //       const newStatus = ( users.indexOf(user?.id) !== -1 );
    //       setActiveStatus(newStatus);
    //     }
    //   }

    //   socket.on("status_change" , activeChangeHandler);
      
    //   return () => {
    //     socket.off("status_change" , activeChangeHandler)
    //   }
    // },[])

    const activeStatus = isActive ? true : false;
    // console.log("Active :" ,activeStatus);
    // console.log("User :" , user);

    return ( 
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image
                alt="Avatar"
                src={user?.image || group?.image || '/logo.png'}
                fill
                />
            </div>
            {activeStatus && <span className={styles.activeStatus}/>}
        </div>
    );
}
 
export default Avatar;