import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

type FetchQuestionAnswersRequest = {
  page: number
  questionId: string
}

type FetchQuestionAnswersResponse = {
  answers: Answer[]
}

export class FetchQuestionAnswers {
  constructor(private readonly answersRepository: AnswersRepository) {}

  public async execute({
    page,
    questionId,
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return { answers }
  }
}
