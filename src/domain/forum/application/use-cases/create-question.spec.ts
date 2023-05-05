import { expect, test } from 'vitest'

import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  async create() {},
}

test('create a question', async () => {
  const sut = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await sut.execute({
    authorId: '1',
    title: 'New Question',
    content: 'Question content',
  })

  expect(question.id).toBeTruthy()
  expect(question.title).toEqual('New Question')
  expect(question.content).toEqual('Question content')
  expect(question.authorId.toValue()).toEqual('1')
})
