import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  private items: AnswerComment[]

  constructor() {
    this.items = []
  }

  public async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find(
      (findAnswerComment) => findAnswerComment.id.toString() === id,
    )

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  public async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  public async delete(answerComment: AnswerComment): Promise<void> {
    const answerIndex = this.items.findIndex((findAnswerComment) => {
      return findAnswerComment.id.toString() === answerComment.id.toString()
    })

    this.items.splice(answerIndex, 1)
  }
}
