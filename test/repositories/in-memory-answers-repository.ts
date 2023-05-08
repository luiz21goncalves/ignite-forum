import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  private items: Answer[]

  constructor() {
    this.items = []
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex(
      (findAnswer) => findAnswer.id.toString() === answer.id.toString(),
    )

    this.items.splice(answerIndex, 1)
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
}
