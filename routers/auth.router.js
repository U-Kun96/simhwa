import express from "express";
import jwtwebToken from "jsonwebtoken";
import { prisma } from "../models/index.js";
import generateNewAccessTokenByRefreshToken from "../src/controllers/auth.controller.js";

const router = express.Router();

router.post("/token", generateNewAccessTokenByRefreshToken);

export default router;
