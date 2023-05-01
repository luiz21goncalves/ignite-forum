import { randomUUID } from 'node:crypto'

type QuestionProps = {
  title: string
  content: string
  authorId: string
}

export class Question {
  public readonly id: string
  public readonly title: string
  public readonly content: string
  public readonly authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID()
    this.title = props.title
    this.content = props.content
    this.authorId = props.authorId
  }
}
