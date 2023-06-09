import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { makeAnswer } from '@test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from '@test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository'

import { CommentOnAnswerUseCase } from './comment-on-answer'

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
    const { answerComment } = await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
      content,
    })

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

    await expect(
      sut.execute({
        authorId: 'author-1',
        answerId: 'non-existing-answer',
        content,
      }),
    ).rejects.toStrictEqual(new Error('Answer not found.'))
  })
})
