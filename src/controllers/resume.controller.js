import { resumeService } from "../services/resume.service.js"; // 객체일 때 {} = 밸류값만
export class resumeController {
  //   constructor(resumeService) {
  //     this.resumeService = resumeService;
  //   }

  // 이력서 생성
  creatResume = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const { title, content, status = "APPLY" } = req.body;
    } catch (err) {
      next(err);
    }
  };
}
