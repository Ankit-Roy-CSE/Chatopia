"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";

import MessageBox from "./MessageBox";
import styles from "./Body.module.css"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";
import { socket } from "@/socket";
import { find } from "lodash";

interface BodyProps {
    initialMessages: FullMessageType[],
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {

    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null); //to scroll to bottom of latest messages

    const { conversationId } = useConversation();

    useEffect(() => {
        const joinRoom = (room : string , socket : any ) => {
          if (room !== '') {
            socket.emit('join_room', room );
          }
        }
        console.log("Form Socket" , socket.id);
        joinRoom(conversationId , socket);

        return () => {
          socket.emit('leave_room', conversationId);
        }
      }
      ,[]);
  

    // Body component will listen for new messages and update the state whenever a new message is received through the socket
    useEffect(() => {

      const updateMessageHandler = (newMessage: FullMessageType) => {
        setMessages((current) => current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
  
          return currentMessage;
        }));
      }

      const messageHandler = (message: FullMessageType) => {
        axios
        .post(`/api/conversations/${conversationId}/seen`)
        .then((res) => {
          const updatedMessage = res.data;
          socket.emit('message_seen', updatedMessage);
          console.log("Message Seen")
        });
      
        setMessages((current) =>{ 
          if(find(current, {id: message.id})){
            return current;
          }
          return [...current, message]}
        );
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      socket.on('receive_message', messageHandler);
      socket.on('update_message', updateMessageHandler);
  
      // Remove event listener on component unmount
      return () => socket.off('receive_message', messageHandler);
    }, [conversationId, socket]);

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