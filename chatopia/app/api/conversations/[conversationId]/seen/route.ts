import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
};

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const {
      conversationId
    } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find the existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            userSeenMessages:{
                include:{
                    user:true
                }
            }
          }
        },
        userConversations:{
            include:{
                user:true
            }
        }
      }
    });

    // If conversation does not exist, return Invalid ID
    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const seenIds = lastMessage.userSeenMessages.map((userSeenMsg) => userSeenMsg.user.id);
    if (seenIds.indexOf(currentUser.id) !== -1) {
      console.log("Current USER Already Seen")
      return NextResponse.json(conversation);
    }

    // Update seen of last message if conversation is not seen already
    const updatedMessage = await prisma.message.update({
        // Extract the last message via its id
        where: {
            id: lastMessage.id
        },
        // Fetch the sender and the users who have seen the message
        include: {
            sender: true,
            userSeenMessages:{
                include:{
                    user:true
                }
            }
        },
        // Add current user to the list of users who have seen the message
        data: {
            userSeenMessages: {
                create: {
                    user: {
                    connect: { id: currentUser.id }
                    }
                }
            }
        }
    });
    console.log("Message Seen :" , updatedMessage)
    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse("Internal Error", { status: 500 });
  }
}