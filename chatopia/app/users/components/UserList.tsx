"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { useContext } from 'react'
import { ThemeContext } from '@/app//context/ThemeContext'
import styles from './UserList.module.css';

interface UserListProps {
  items: User[]
};

const UserList: React.FC<UserListProps> = ({items}) => {
    const {isDark ,setIsDark} = useContext(ThemeContext);
  
    return (
        <aside className={styles.wrapper} data-theme={isDark ? "dark" : "light"}>
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