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

    // 이력서 수정
    updateResume = async (req, res, next) => {
      try {
        const { resumeId } = req.params;
        const { userId } = req.user;
        const { title, content, status } = req.body;
        // 해당하는 이력서 찾기
        const resume = await this.resumeService.findResumeById(resumeId);
        // 이력서 생성자와 수정자가 같지 않으면 에러 던지기
        if (userId !== resume.userId) {
          throw new Error("userId가 일치하지 않습니다.");
        }

        // 동일한 사람이면 저장소에 이력서 수정을 요청함
        const updatedResume = await this.resumeService.updateResume(
          resumeId,
          title,
          content,
          status
        );

        return res.status(200).json({ data: updatedResume });
      } catch (err) {
        next(err);
      }
    };

    // 이력서 삭제
    deleteResume = async (req, res, next) => {
      try {
        const { resumeId } = req.params;
        const { userId } = req.user;

        const deletedResume = await this.resumeService.deleteResume(resumeId, userId);

        return res.status(200).json({ data: deletedResume });
      } catch (err) {
        next(err);
      }
    };
  };
}
