import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@test/factories/make-question'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'

import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'Pergunta Test',
      content: 'Conteúdo test',
    })

    expect(question).toMatchObject({
      title: 'Pergunta Test',
      content: 'Conteúdo test',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        title: 'Pergunta Test',
        content: 'Conteúdo test',
      }),
    ).rejects.toStrictEqual(new Error('Not allowed.'))
  })
})
