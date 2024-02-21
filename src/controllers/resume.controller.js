// import { resumeService } from "../services/resume.service.js"; // 객체일 때 {} = 밸류값만
export class resumeController {
  constructor(resumeService) {
    this.resumeService = resumeService;
  }

  // 이력서 생성
  creatResume = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const { title, content, status = "APPLY" } = req.body;

      const createdResume = await this.resumeController.creatResume(userId, title, content, status);

      return res.status(201).json({ data: createdResume });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 목록 조회
  findResumes = async (req, res, next) => {
    try {
      const resumes = await this.resumeService.findResumes();

      return res.status(200).json({ data: resumes });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 상세 조회
  findResumesById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const resume = await this.resumeService.findResumeById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };
}
