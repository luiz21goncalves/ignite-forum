import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@test/factories/make-answer'
import { makeQuestion } from '@test/factories/make-question'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({ questionId: newQuestion.id })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    const { question } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(question.bestAnswerId).toStrictEqual(newAnswer.id)
  })

  it('should not be able to choose another user question nest awnser', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })
    const newAnswer = makeAnswer({ questionId: newQuestion.id })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    await expect(
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-2',
      }),
    ).rejects.toStrictEqual(new Error('Not allowed.'))
  })

  it('should not be able to choose the best answer non existing an answer', async () => {
    await expect(
      sut.execute({
        answerId: 'answer-1',
        authorId: 'author-1',
      }),
    ).rejects.toStrictEqual(new Error('Answer not found.'))
  })

  it('should not be able to choose the best answer non existing a question', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-1',
      }),
    ).rejects.toStrictEqual(new Error('Question not found.'))
  })
})
