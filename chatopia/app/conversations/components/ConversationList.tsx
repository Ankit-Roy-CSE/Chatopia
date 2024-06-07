"use client"

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";
import { User } from "@prisma/client";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { useSession } from "next-auth/react";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

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