import { AnswerComment } from '../../enterprise/entities/answer-comment'

export type AnswerCommentsRepository = {
  create(questionComment: AnswerComment): Promise<void>
}
