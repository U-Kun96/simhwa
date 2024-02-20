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
}
