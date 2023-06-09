import { QuestionComment } from '../../enterprise/entities/question-comment'

export type QuestionCommentsRepository = {
  create(questionComment: QuestionComment): Promise<void>
}
