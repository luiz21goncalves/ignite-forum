import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

type DeleteAnswerCommentUseCaseRequest = {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = void

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  public async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
