"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

import styles from './UserList.module.css';

interface UserListProps {
  items: User[]
};

const UserList: React.FC<UserListProps> = ({items}) => {
  
    return (
        <aside className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>People</div>
                </div>

                {items.map((item) => (
                    <UserBox key={item.id} data={item}/>
                ))}
            </div>
        </aside>
    );
}

export default UserList;