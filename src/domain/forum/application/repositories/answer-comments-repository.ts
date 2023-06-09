import { AnswerComment } from '../../enterprise/entities/answer-comment'

export type AnswerCommentsRepository = {
  findById(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
