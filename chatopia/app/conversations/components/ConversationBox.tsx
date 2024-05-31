"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns"
import { useSession } from "next-auth/react";
import clsx from "clsx";


import { FullConversationType } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import styles from "./ConversationBox.module.css";
import useOtherUser from "@/app/hooks/useOtherUser";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean;
  }


  
const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected
}) => {
      const otherUser = useOtherUser(data)
      const session = useSession();
      const router = useRouter();

      const handleClick = useCallback(() => {
          // Redirecting to the conversation page
          router.push(`/conversations/${data.id}`);
      }, [data.id, router]);
    
      const lastMessage = useMemo(() => {
        // Extracting all messages from the conversation
        const messages = data.messages || [];
    
        // Returning the last message
        return messages[messages.length - 1];
      }, [data.messages]);

      const userEmail = useMemo(() => {
        // Extracting the email of the current logged in user
        return session.data?.user?.email;
      }, [session.data?.user?.email]);
    
      // If user has not seen the last message return false
      const hasSeen = useMemo(() => {
        // If there is no last message return false
        if (!lastMessage) {
          return false;
        }
        
        // Extracting the userSeenMessages array from the last message
        const userSeenMessagesArray = lastMessage.userSeenMessages || [];
    
        // If there is no current user email return false
        if (!userEmail) {
          return false;
        }

        // Extracting the users who have seen the last message
        const seenArray = userSeenMessagesArray.map((userSeenMessage) => userSeenMessage.user);

        // Checking if the current user has seen the last message
        return seenArray.filter((user : User) => 
          user.email === userEmail).length !== 0;
      }, [userEmail, lastMessage]);
    
      const lastMessageText = useMemo(() => {
        // If last message of conversation is an image
        if (lastMessage?.image) {
          return 'Sent an image';
        }
        
        // If last message of conversation is a text message
        if (lastMessage?.body) {
          return lastMessage.body;
        }
        
        // If no last message exists
        return "Started a conversation";
      }, [lastMessage]);

    return (
        <div 
          onClick={handleClick}
          className={clsx(
            styles.wrapper,
            selected ? styles.selected : styles.unselected
        )}
        >
            <Avatar user={otherUser} />
            <div className={styles.container}>
              <div>
                <div className={styles.conversation}>
                  <p className={styles.name}>
                    {data.name || otherUser.name}
                  </p>
                  {lastMessage?.createdAt && (
                    <p className={styles.dateTime}>
                      {format(new Date(lastMessage.createdAt), 'p')}
                    </p>
                  )}
                </div>
                <p
                  className={clsx(
                    styles.msg,
                    hasSeen ? styles.hasSeen : styles.hasNotSeen
                  )}
                >
                  {lastMessageText}
                </p>
              </div>
            </div>
        </div>
    );


}

export default ConversationBox;
