import express from "express";
import { prisma } from "./models/index.js";
import { ResumeController } from "./src/controllers/resume.controller.js";
import { ResumeService } from "./src/services/resume.service.js";
import { ResumeRepository } from "./src/repositories/resume.repository.js";

const router = express();
const resumeRepository = new ResumeRepository(prisma);
const resumeService = new ResumeService(resumeRepository);
const resumeController = new ResumeController(resumeService);

// 이력서 조회
router.get("/", resumeController.findResumes);

// 이력서 상세 조회
router.get("/:resumeId", resumeController.findResumesById);

// 이력서 작성
router.post("/", resumeController.creatResume);

// 이력서 수정
router.update("/:resumeId", resumeController.updateResume);

// 이력서 삭제
router.delete("/:resumeId", resumeController.deleteResume);
