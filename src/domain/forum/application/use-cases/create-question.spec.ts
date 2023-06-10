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
    const result = await sut.execute({
      authorId: '1',
      title: 'New Question',
      content: 'Question content',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual('New Question')
    expect(result.value?.question.content).toEqual('Question content')
    expect(result.value?.question.authorId.toValue()).toEqual('1')
  })
})
