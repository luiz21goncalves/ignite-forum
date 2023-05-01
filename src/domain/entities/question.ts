import { randomUUID } from 'node:crypto'

export class Question {
  public readonly id: string
  public readonly title: string
  public readonly content: string

  constructor(title: string, content: string, id?: string) {
    this.id = id ?? randomUUID()
    this.title = title
    this.content = content
  }
}
