const findOneUserById = async (userId) => {
  const user = await Prisma.user.findFirst({
    where: {
      userId
    }
  });
  return user;
};

export default findOneUserById;
