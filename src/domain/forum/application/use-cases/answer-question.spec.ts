import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository'

import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      content: 'Nova resposta',
      instructorId: '1',
      questionId: '2',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer.id).toBeTruthy()
    expect(result.value?.answer.content).toEqual('Nova resposta')
    expect(result.value?.answer.authorId.toValue()).toEqual('1')
    expect(result.value?.answer.questionId.toValue()).toEqual('2')
  })
})
