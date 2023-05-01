import { randomUUID } from 'node:crypto'

export class Student {
  public readonly id: string
  public readonly name: string

  constructor(name: string, id?: string) {
    this.id = id ?? randomUUID()
    this.name = name
  }
}
