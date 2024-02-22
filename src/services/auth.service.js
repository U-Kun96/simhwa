import jwt from "jsonwebtoken";
import findOneUserByUserId from "../repositories/user.repository.js";

const verifyRefreshToken = async (refreshToken) => {
  const token = jwt.verify(refreshToken, "resume&%*");

  if (!token.userId) {
    // res는 http를 통해서 넘어오는 값이기 때문에 그대로 사용해서 안된다.
    throw {
      code: 401,
      message: "토큰 정보가 올바르지 않습니다."
    };
  }

  const user = await findOneUserByUserId(token.userId);

  if (!user) {
    // res는 http를 통해서 넘어오는 값이기 때문에 그대로 사용해서 안된다.
    throw {
      code: 401,
      message: "토큰 정보가 올바르지 않습니다."
    };
  }

  // refreshToken 유효 => accessToken, refreshToken 재발급
  const newAccessToken = jwt.sign({ userId: user.userId }, "resume&%*", {
    expiresIn: "12h"
  });
  const newRefreshToken = jwt.sign({ userId: user.userId }, "resume&%*", {
    expiresIn: "7d"
  });

  // res는 사용할 수 없기 때문에 삭제해줌
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

export default verifyRefreshToken;
