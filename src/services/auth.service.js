import jwtwebToken from "jsonwebtoken";
const verifyRefreshToken = async (refreshToken) => {
  const token = jwtwebToken.verify(refreshToken, "resume&%*");

  if (!token.userId) {
    // res는 http를 통해서 넘어오는 값이기 때문에 그대로 사용해서 안된다.
    throw {
      code: 401,
      message: "토큰 정보가 올바르지 않습니다."
    };
  }

  const user = await Prisma.user.findFirst({
    where: {
      userId: token.userId
    }
  });

  if (!user) {
    // res는 http를 통해서 넘어오는 값이기 때문에 그대로 사용해서 안된다.
    throw {
      code: 401,
      message: "토큰 정보가 올바르지 않습니다."
    };
  }

  // refreshToken 유효 => accessToken, refreshToken 재발급
  const newAccessToken = jwtwebToken.sign({ userId: user.userId }, "resume&%*", {
    expiresIn: "12h"
  });
  const newRefreshToken = jwtwebToken.sign({ userId: user.userId }, "resume&%*", {
    expiresIn: "7d"
  });

  return res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  });
};
