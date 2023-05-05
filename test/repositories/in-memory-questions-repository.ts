import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private items: Question[]

  constructor() {
    this.items = []
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }
}
