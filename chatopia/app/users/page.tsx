'use client'
// import { signOut } from "next-auth/react"
import styles from './Users.module.css'
import EmptyState from '../components/EmptyState'


export default function Users(){
    return (
        <div className={styles.container}>
            <EmptyState />
        </div>
    )
}