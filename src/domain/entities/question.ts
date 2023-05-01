import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Slug } from './value-objects/slug'

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }
}
