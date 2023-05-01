import { randomUUID } from 'node:crypto'

export class Answer {
  public readonly id: string
  public readonly content: string

  constructor(content: string, id?: string) {
    this.id = id ?? randomUUID()
    this.content = content
  }
}
