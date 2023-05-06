import { Question } from '../../enterprise/entities/question'

export type QuestionsRepository = {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
}
