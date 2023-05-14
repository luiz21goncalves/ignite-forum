import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@test/factories/make-answer'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository'

import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const { answer } = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
      content: 'Conteúdo test',
    })

    expect(answer).toMatchObject({ content: 'Conteúdo test' })
  })

  it('should not be able to edit an answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
        content: 'Conteúdo test',
      }),
    ).rejects.toStrictEqual(new Error('Not allowed.'))
  })

  it('should not be able to edit an answer non existing', async () => {
    await expect(() =>
      sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
        content: 'new content',
      }),
    ).rejects.toStrictEqual(new Error('Answer not found.'))
  })
})
