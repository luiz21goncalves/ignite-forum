import { randomUUID } from 'node:crypto'

import { Slug } from './value-objects/slug'

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question {
  public readonly id: string
  public readonly title: string
  public readonly slug: Slug
  public readonly content: string
  public readonly authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID()
    this.title = props.title
    this.slug = props.slug
    this.content = props.content
    this.authorId = props.authorId
  }
}
