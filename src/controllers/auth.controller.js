import verifyRefreshToken from "../services/auth.service.js";

const generateNewAccessTokenByRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const token = await verifyRefreshToken(refreshToken);
  return res.json(token);
};

export default generateNewAccessTokenByRefreshToken;
