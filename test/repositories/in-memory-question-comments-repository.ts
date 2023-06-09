import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  private items: QuestionComment[]

  constructor() {
    this.items = []
  }

  public async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
