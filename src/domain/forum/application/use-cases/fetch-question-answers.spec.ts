import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@test/factories/make-answer'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository'

import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const questionId = new UniqueEntityID()

    await Promise.all([
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
    ])

    const { answers } = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    })

    expect(answers).toHaveLength(4)
  })

  it('should be able to fetch paginated question answers', async () => {
    const questionId = new UniqueEntityID()
    const promises: Promise<any>[] = []

    for (let index = 1; index <= 25; index++) {
      promises.push(
        inMemoryAnswersRepository.create(makeAnswer({ questionId })),
      )
    }

    await Promise.all(promises)

    const { answers } = await sut.execute({
      page: 2,
      questionId: questionId.toString(),
    })

    expect(answers).toHaveLength(5)
  })
})
