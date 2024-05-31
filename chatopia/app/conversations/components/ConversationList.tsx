"use client"

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";

import ConversationBox from "./ConversationBox";

import styles from "./ConversationList.module.css";

interface ConversationListProps {
    initialItems: FullConversationType[];

  }

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems
}) => {
    const [items, setItems] = useState(initialItems);

    const router = useRouter();
    const { conversationId, isOpen } = useConversation();

    return (
        <aside className={clsx(
                styles.wrapper,
                isOpen ? styles.open : styles.close
            )}>
            <div>
                <div className={styles.container}>
                    <div className={styles.heading}>
                        Messages
                    </div>
                    <div className={styles.addMsgIcon}>
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
    );
}

export default ConversationList;