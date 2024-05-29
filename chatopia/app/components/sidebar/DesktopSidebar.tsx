'use client'
import { useState } from "react";
import useRoutes from "@/app/hooks/useRoutes"
import styles from "./DesktopSidebar.module.css";
import DesktopItem from "./DesktopItem";

export default function DesktopSidebar(){
    const routes = useRoutes();
    const [isOpen , setIsOpen] = useState(false);
    return (
        <div className={styles.wrapper}>
            <nav className={styles.navbar}>
                <ul role="list" className={styles.list}>
                {routes.map((item) => (
                    <DesktopItem
                        key={item.label}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        active={item.active}
                        onClick={item.onClick}
                    />
                ))}
                </ul>
            </nav>
        </div>
    )
}