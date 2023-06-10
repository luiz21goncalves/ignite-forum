import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { makeAnswer } from '@test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from '@test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository'

import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const newAnswer = makeAnswer()
    const content = faker.lorem.text()

    await inMemoryAnswersRepository.create(newAnswer)
    const result = await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
      content,
    })

    const { answerComment } = result.value as { answerComment: AnswerComment }

    expect(result.isRight()).toBe(true)
    expect(answerComment.authorId.toString()).toStrictEqual(
      newAnswer.authorId.toString(),
    )
    expect(answerComment.answerId.toString()).toStrictEqual(
      newAnswer.id.toString(),
    )
    expect(answerComment.content).toStrictEqual(content)
  })

  it('should not be able to comment on a non-existing answer', async () => {
    const content = faker.lorem.text()

    const result = await sut.execute({
      authorId: 'author-1',
      answerId: 'non-existing-answer',
      content,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
