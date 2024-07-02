"use client"

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";
import { User } from "@prisma/client";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType , FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import {socket} from "@/socket";
import { find } from "lodash";

import styles from "./ConversationList.module.css";
import { join } from "path";

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
  }

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,users
}) => {
    const session = useSession();
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const { conversationId, isOpen } = useConversation();

    useEffect(() => {
        const joinRoom = (room : string , socket : any ) => {
            if (room !== '') {
              socket.emit('join_room', room );
            }
          }

        items.forEach((item) => {
            joinRoom(item.id, socket);
        });

        // To update the conversation list when a new message or message updation (like seen status) is received
        const updateConversationHandler = ( message: FullMessageType) => {
            setItems((current) => current.map((currentConversation) => {
                // For each conversation, check if the message belongs to the conversation
                if(!currentConversation.messages && currentConversation.id === message.conversationId){
                    return {
                        ...currentConversation,
                        messages: [message],
                    }
                }
                if (currentConversation.messages && currentConversation.id === message.conversationId) {
                    // If the message belongs to the conversation, update the messages array to include the new message
                    const updated_messages = [...currentConversation.messages, message];
                    return {
                        ...currentConversation,
                        messages: updated_messages,
                    }
                }
                // If the message does not belong to the conversation, return the conversation as is
                return currentConversation;
            }));
        }

        // To update the conversation list when a new conversation is created
        const newConversationHandler = (conversation: FullConversationType) => {
            // Check if the conversation to be added already exists in the conversation list
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                  return current;
                }
                return [conversation, ...current];
            });
            joinRoom(conversation.id, socket);
        };

        const deleteConversationHandler = (conversationId: string) => {
            setItems((current) => current.filter((item) => item.id !== conversationId));
            socket.emit('leave_room', conversationId);
        }

        // Updates the conversation list when a new or updated message is received
        socket.on('recv_updated_conversation', updateConversationHandler);

        // Updates the conversation list when a new conversation is created
        socket.on('recv_new_conversation', newConversationHandler);

        // Updates the conversation list when an existing conversation is deleted
        socket.on('recv_deleted_conversation', deleteConversationHandler);

        socket.on('connect', () => {
            if(userEmail)
                console.log("Connected :" , userEmail);
                axios.post('/api/socket/online', { email: userEmail });
        });
        
        socket.on('disconnect', () => {
            if(!socket.active && userEmail){
                console.log("Disconnected :" , userEmail);
                // POST request which passes the user id to the server
                // axios.post('/api/socket/offline', { email: userEmail });
            }
        });


        return () => {
            socket.off('recv_updated_conversation', updateConversationHandler);
            socket.off('recv_new_conversation', newConversationHandler)
            socket.off('recv_deleted_conversation' , deleteConversationHandler);

            items.forEach((item) => {
                socket.emit('leave_room', item.id);
            });
        }
    }, []);

    return (
        <>
        <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
        />
        <aside className={clsx(
                styles.wrapper,
                isOpen ? styles.open : styles.close
            )}>
            <div>
                <div className={styles.container}>
                    <div className={styles.heading}>
                        Messages
                    </div>
                    <div className={styles.addMsgIcon}
                    onClick={()=> setIsModalOpen(true)}>
                        <MdOutlineGroupAdd size={20} />
                    </div>
                </div>
                {items.map((item) => (
                    <ConversationBox
                    key={item.id}
                    data={item}
                    selected={conversationId === item.id}
                    />
                ))}
            </div>
        </aside>
        </>
    );
}

export default ConversationList;