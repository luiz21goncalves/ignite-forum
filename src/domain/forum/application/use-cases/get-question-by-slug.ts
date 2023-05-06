import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

type GetQuestionBySlugRequest = {
  slug: string
}

type GetQuestionBySlugResponse = {
  question: Question
}

export class GetQuestionBySlug {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return { question }
  }
}
