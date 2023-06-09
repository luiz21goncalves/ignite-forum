import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  private items: QuestionComment[]

  constructor() {
    this.items = []
  }

  public async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (findQuestion) => findQuestion.id.toString() === id,
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  public async delete(questionComment: QuestionComment): Promise<void> {
    const questionCommentIndex = this.items.findIndex((findQuestionComment) => {
      return findQuestionComment.id.toString() === questionComment.id.toString()
    })

    this.items.splice(questionCommentIndex, 1)
  }

  public async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
