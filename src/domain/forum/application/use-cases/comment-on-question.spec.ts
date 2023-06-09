import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { makeQuestion } from '@test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from '@test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'

import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const newQuestion = makeQuestion()
    const content = faker.lorem.text()

    await inMemoryQuestionsRepository.create(newQuestion)
    const { questionComment } = await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      content,
    })

    expect(questionComment.authorId.toString()).toStrictEqual(
      newQuestion.authorId.toString(),
    )
    expect(questionComment.questionId.toString()).toStrictEqual(
      newQuestion.id.toString(),
    )
    expect(questionComment.content).toStrictEqual(content)
  })

  it('should not be able to comment on a non-existing question', async () => {
    const content = faker.lorem.text()

    await expect(
      sut.execute({
        authorId: 'author-1',
        questionId: 'non-existing-question',
        content,
      }),
    ).rejects.toStrictEqual(new Error('Question not found.'))
  })
})
