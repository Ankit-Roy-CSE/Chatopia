"use client";

import { Conversation } from "@prisma/client";
import { userConversation } from "@/app/types";

import useOtherUser from "@/app/hooks/useOtherUser";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";
import styles from "./Header.module.css";


interface HeaderProps {
    conversation: Conversation & {
      userConversations: userConversation[],
    }
  };



const Header: React.FC<HeaderProps> = ({conversation}) => {
    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    const statusText = useMemo(() => {
      if (conversation.isGroup) {
        return `${conversation.userConversations.length} members`;
      }
      const isActive = true ;
      return isActive ? 'Active' : 'Offline';
    }, [conversation]);

    return (
        <>
        <div className={styles.wrapper}>
            <div>
              <Link
                className={styles.icon}
                href="/conversations"
              >
                <HiChevronLeft size={32} />
              </Link>

              <Avatar user={otherUser} />
              <div className={styles.textContainer}>
                <div>
                  {conversation.name || otherUser.name}
                </div>
                <div className={styles.status}>
                  {statusText}
                </div>
              </div>
            </div>
            
            <HiEllipsisHorizontal
            size={32}
            onClick={() => setDrawerOpen(true)}
            className={styles.drawer}
            />
        </div>
        </>
    )
}

export default Header;
