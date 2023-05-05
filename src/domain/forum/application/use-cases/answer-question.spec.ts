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
    const { answer } = await sut.execute({
      content: 'Nova resposta',
      instructorId: '1',
      questionId: '2',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual('Nova resposta')
    expect(answer.authorId.toValue()).toEqual('1')
    expect(answer.questionId.toValue()).toEqual('2')
  })
})
