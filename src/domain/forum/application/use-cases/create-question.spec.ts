import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
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
})
