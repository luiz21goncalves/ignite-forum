import { PAGE } from '@/core/constants/page'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private items: Question[]

  constructor() {
    this.items = []
  }

  public async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  public async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (findQuestion) => findQuestion.id.toString() === question.id.toString(),
    )

    this.items.splice(questionIndex, 1)
  }

  public async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (findQuestion) => findQuestion.id.toString() === question.id.toString(),
    )

    this.items[questionIndex] = question
  }

  public async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find(
      (findQuestion) => findQuestion.slug.value === slug,
    )

    if (!question) {
      return null
    }

    return question
  }

  public async findById(id: string): Promise<Question | null> {
    const question = this.items.find(
      (findQuestion) => findQuestion.id.toString() === id,
    )

    if (!question) {
      return null
    }

    return question
  }

  public async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort(
        (questionA, questionB) =>
          questionB.createdAt.getTime() - questionA.createdAt.getTime(),
      )
      .slice(
        (page - 1) * PAGE.DEFAULT_AMOUNT_OF_ITEMS,
        page * PAGE.DEFAULT_AMOUNT_OF_ITEMS,
      )

    return questions
  }
}
