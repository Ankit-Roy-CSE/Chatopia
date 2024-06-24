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
        const updateConversationHandler = ( message: FullMessageType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === message.conversationId) {
                    const updated_messages = [...currentConversation.messages, message];
                  return {
                    ...currentConversation,
                    messages: updated_messages,
                  }
                }
        
                return currentConversation;
            }));
        }

        const newConversationHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                  return current;
                }
        
                return [conversation, ...current];
            });
        };

        socket.on('recv_updated_conversation', updateConversationHandler);
        socket.on('recv_new_conversation', newConversationHandler);

        return () => {
            socket.off('recv_updated_conversation', updateConversationHandler);
            socket.off('recv_new_conversation', newConversationHandler);
        }
    }, [items]);

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