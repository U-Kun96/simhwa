import express from "express";
import generateNewAccessTokenByRefreshToken from "../src/controllers/auth.controller.js";

const router = express.Router();

router.post("/token", generateNewAccessTokenByRefreshToken);

export default router;
