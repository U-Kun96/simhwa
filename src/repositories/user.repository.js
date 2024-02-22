import { prisma } from "../models/index.js";
const findOneUserByUserId = async (userId) => {
  const user = await prisma.user.findFirst({
    where: {
      userId
    }
  });
  return user;
};

export default findOneUserByUserId;
