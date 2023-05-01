import { expect, test } from 'vitest'

import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  async create() {},
}

test('create an answer', async () => {
  const sut = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await sut.execute({
    content: 'Nova resposta',
    instructorId: '1',
    questionId: '2',
  })

  expect(answer.content).toEqual('Nova resposta')
  expect(answer.authorId).toEqual('1')
  expect(answer.questionId).toEqual('2')
})
