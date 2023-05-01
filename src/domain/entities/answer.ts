import { randomUUID } from 'node:crypto'

type AnswerProps = {
  content: string
  authorId: string
  questionId: string
}

export class Answer {
  public readonly id: string
  public readonly content: string
  public readonly authorId: string
  public readonly questionId: string

  constructor(props: AnswerProps, id?: string) {
    this.id = id ?? randomUUID()
    this.content = props.content
    this.authorId = props.authorId
    this.questionId = props.questionId
  }
}
