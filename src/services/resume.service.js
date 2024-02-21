import { resumeRepository } from "../repositories/resume.repository";

export class resumeService {
  constructor(resumeRepository) {
    this.resumeRepository = resumeRepository;
  }

  // 이력서 생성
  createResume = async (userId, title, content, status = "APPLY") => {
    const createdResume = this.resumeRepository.createResume(userId, title, content, status);

    if (userId !== createdResume.userId) {
      throw new Error("userId가 틀립니다.");
    }
    if (title !== createdResume.title) {
      throw new Error("존재하지 않는 이력서입니다");
    }
    return {
      userId: createdResume.userId,
      title: createdResume.title,
      content: createdResume.content,
      status: createdResume.status
    };
  };

  // 이력서 목록 조회
  findResumes = async () => {
    const resumes = await this.resumeRepository.findResumes();

    // 이력서를 작성 일자로 내림차순
    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return resumes;
  };

  // 이력서 상세 조회
  findResumeById = async (resumeId) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);

    return {
      resumeId: resume.resumeId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      users: {
        select: {
          name: true
        }
      }
    };
  };

  // 이력서 수정
  updateResume = async (userId, resumeId, title, content, status) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);

    if (!resume) {
      throw new Error("존재하지 않는 이력서입니다.");
    }

    // 검증 완료 후 이력서를 수정한다.
    const updatedResume = await this.resumeRepository.updateResume(userId, title, content, status);

    return {
      userId: updatedResume.userId,
      title: updatedResume.title,
      content: updatedResume.content,
      status: updatedResume.status,
      createdAt: updatedResume.createdAt,
      updatedAt: updatedResume.updatedAt
    };
  };

  // 이력서 삭제
}
