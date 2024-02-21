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

      return res.status(201).json({ createdResume });
    } catch (err) {
      next(err);
    }
  };

  // 이력서 목록 조회
  findResumes = async (req, res, next) => {
    try {
      const resumes = await this.resumeController.findResumes();

      return res.status(200).json({ resumes });
    } catch (err) {
      next(err);
    }
  };
}
