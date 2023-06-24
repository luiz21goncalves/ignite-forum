import { PAGE } from '@/core/constants/page'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  private items: Answer[]

  constructor(
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {
    this.items = []
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(
      (findAnswer) => findAnswer.id.toString() === answer.id.toString(),
    )

    await this.answerAttachmentsRepository.deleteManyByAnswerId(
      answer.id.toString(),
    )

    this.items.splice(answerIndex, 1)
  }

  public async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(
      (findQuestion) => findQuestion.id.toString() === answer.id.toString(),
    )

    this.items[answerIndex] = answer
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find(
      (findAnswer) => findAnswer.id.toString() === id,
    )

    if (!answer) {
      return null
    }

    return answer
  }

  public async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice(
        (page - 1) * PAGE.DEFAULT_AMOUNT_OF_ITEMS,
        page * PAGE.DEFAULT_AMOUNT_OF_ITEMS,
      )

    return answers
  }
}
