import { expect, test } from 'vitest'

import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
  const sut = new AnswerQuestionUseCase()

  const answer = sut.execute({
    content: 'Nova resposta',
    instructorId: '1',
    questionId: '2',
  })

  expect(answer.content).toEqual('Nova resposta')
  expect(answer.authorId).toEqual('1')
  expect(answer.questionId).toEqual('2')
})
