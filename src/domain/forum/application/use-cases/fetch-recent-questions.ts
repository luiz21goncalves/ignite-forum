import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

type FetchResentQuestionsRequest = {
  page: number
}

type FetchResentQuestionsResponse = {
  questions: Question[]
}

export class FetchResentQuestions {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute({
    page,
  }: FetchResentQuestionsRequest): Promise<FetchResentQuestionsResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}