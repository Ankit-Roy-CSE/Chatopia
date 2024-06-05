"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";

import MessageBox from "./MessageBox";
import styles from "./Body.module.css"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {

    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null); //to scroll to bottom of latest messages

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
      }, [conversationId]);

    return (
        <div className={styles.wrapper}>
            {messages.map((message, i) => (
                <MessageBox
                isLast={i === messages.length - 1}
                key={message.id}
                data={message}
                />
            ))}
            <div ref={bottomRef} className={styles.scrollBtn} />
        </div>
    )
}

export default Body;