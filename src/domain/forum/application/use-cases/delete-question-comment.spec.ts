import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from '@test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from '@test/repositories/in-memory-question-comments-repository'

import { DeleteQuestionCommentUseCase } from './delete-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    })

    const findQuestionComment =
      await inMemoryQuestionCommentsRepository.findById(
        questionComment.id.toString(),
      )

    expect(findQuestionComment).toBeNull()
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await expect(
      sut.execute({
        authorId: 'author-2',
        questionCommentId: questionComment.id.toString(),
      }),
    ).rejects.toStrictEqual(new Error('Not allowed.'))
  })

  it('should not be able to delete a non-existing question comment', async () => {
    await expect(
      sut.execute({
        authorId: 'author-2',
        questionCommentId: 'non-existing-question-comment',
      }),
    ).rejects.toStrictEqual(new Error('Question comment not found.'))
  })
})
