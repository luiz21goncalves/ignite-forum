import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
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
      attachmentsIds: ['attachment-01', 'attachment-02'],
    })

    const question = await inMemoryQuestionsRepository.findById(
      result.value?.question.id.toString()!,
    )

    expect(result.isRight()).toBe(true)
    expect(result.value?.question).toStrictEqual(question)
    expect(question?.attachments).toHaveLength(2)
    expect(question?.attachments).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('attachment-01'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('attachment-02'),
      }),
    ])
  })
})
