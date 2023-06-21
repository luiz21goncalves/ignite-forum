import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export type QuestionAttachmentsRepository = {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
