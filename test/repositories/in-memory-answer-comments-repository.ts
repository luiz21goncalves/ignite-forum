import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  private items: AnswerComment[]

  constructor() {
    this.items = []
  }

  public async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
