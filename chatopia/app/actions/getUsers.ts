import prisma from "@/app/libs/prismadb";

import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
            // Not including current user in the list of available users to message
            email: session.user.email
        }
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;