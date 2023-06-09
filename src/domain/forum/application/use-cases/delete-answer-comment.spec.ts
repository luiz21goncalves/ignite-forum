import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from '@test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from '@test/repositories/in-memory-answer-comments-repository'

import { DeleteAnswerCommentUseCase } from './delete-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    const findAnswerComment = await inMemoryAnswerCommentsRepository.findById(
      answerComment.id.toString(),
    )

    expect(findAnswerComment).toBeNull()
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await expect(
      sut.execute({
        authorId: 'author-2',
        answerCommentId: answerComment.id.toString(),
      }),
    ).rejects.toStrictEqual(new Error('Not allowed.'))
  })

  it('should not be able to delete a non-existing answer comment', async () => {
    await expect(
      sut.execute({
        authorId: 'author-2',
        answerCommentId: 'non-existing-answer-comment',
      }),
    ).rejects.toStrictEqual(new Error('Answer comment not found.'))
  })
})
