import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

type FetchAnswerCommentsRequest = {
  page: number
  answerId: string
}

type FetchAnswerCommentsResponse = {
  answerComment: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  public async execute({
    page,
    answerId,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answerComment =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return { answerComment }
  }
}
