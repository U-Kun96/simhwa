// import { prisma } from "../../models/index.js";

export class ResumeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 이력서 생성
  createResume = async (userId, title, content, status = "APPLY") => {
    const createdResume = await this.prisma.resume.create({
      data: {
        userId,
        title,
        content,
        status
      }
    });
    return createdResume;
  };

  // 이력서 목록 조회
  findResumes = async () => {
    const resumes = await this.prisma.resume.findMany({});
    return resumes;
  };

  // 이력서 상세 조회
  findResumeById = async (resumeId) => {
    // findFirst를 사용한 이유: 유니크는 스키마에 @unique로 지정한 필드만 찾을 수 있다고 해서
    const resume = await this.prisma.resume.findFirst({
      where: { resumeId: +resumeId }
    });

    return resume;
  };

  // 이력서 수정
  updateResume = async (userId, title, content, status) => {
    const updatedResume = await this.prisma.resume.update({
      where: { userId: +userId },
      data: {
        title,
        content,
        status
      }
    });
    return updatedResume;
  };

  // 이력서 삭제
  deleteResume = async (resumeId, userId) => {
    const deletedResume = await this.prisma.resume.delete({
      where: { resumeId: +resumeId, userId: +userId }
    });
    return deletedResume;
  };
}
