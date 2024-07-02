import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import {
  HiArrowLeftOnRectangle,
  HiUsers
} from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";
import axios from "axios";
import { useSession } from "next-auth/react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const session = useSession();

  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiChat,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUsers,
      active: pathname === '/users'
    },
    {
      label: 'Logout',
      href: '#',
      onClick: () => signOut(),
      icon: HiArrowLeftOnRectangle
    }
  ], [pathname, conversationId]);

  return routes;
}

export default useRoutes;