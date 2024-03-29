import express from "express";
import { prisma } from "../models/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { ResumeController } from "../src/controllers/resume.controller.js";
import { ResumeService } from "../src/services/resume.service.js";
import { ResumeRepository } from "../src/repositories/resume.repository.js";

const router = express.Router();
const resumeController = new ResumeController(resumeService);
const resumeService = new ResumeService(resumeRepository);
const resumeRepository = new ResumeRepository(prisma);

// 이력서 생성 API
router.post("/resume", authMiddleware, resumeController.createResume);

/** 이력서 목록 조회 API **/
router.get("/resume", authMiddleware, resumeController.findResumes);

/** 이력서 상세 조회 API **/
router.get("/resume/:resumeId", authMiddleware, resumeController.findResumeById);

//이력서 수정 api
router.put("/resume/:resumeId", authMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { title, content, status = "APPLY" } = req.body;
  const { resumeId } = req.params;
  const Statuses = ["APPLY", "DROP", "PASS", "INTERVIEW1", "INTERVIEW2", "FINAL_PASS"];

  const rrResume = await prisma.resume.findUnique({
    where: { resumeId: +resumeId }
  });
  if (!rrResume) {
    return res.status(404).json({
      message: "이력서가 없습니다."
    });
  }
  if (rrResume.userId !== userId) {
    return res.status(404).json({
      message: "아이디가 다릅니다."
    });
  }
  if (!Statuses.includes(status)) {
    return res.status(409).json({
      message: "이력서 조회에 실패하였습니다."
    });
  }
  const resume = await prisma.resume.update({
    where: { resumeId: +resumeId },
    data: {
      userId: +userId,
      title,
      content,
      status
    }
  });
  return res.status(201).json({ data: resume });
});

// ### 이력서 삭제 API **(✅ 인증 필요 - middleware 활용)**

router.delete("/resume/:resumeId", authMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { resumeId } = req.params;

  const rrResume = await prisma.resume.findUnique({
    where: { resumeId: +resumeId }
  });
  if (!rrResume) {
    return res.status(404).json({
      message: "이력서가 없습니다."
    });
  }
  if (rrResume.userId !== userId) {
    return res.status(404).json({
      message: "아이디가 다릅니다."
    });
  }

  const deletedResume = await prisma.resume.delete({
    where: { resumeId: +resumeId }
  });
  return res.status(201).json({ data: deletedResume });
});

export default router;
