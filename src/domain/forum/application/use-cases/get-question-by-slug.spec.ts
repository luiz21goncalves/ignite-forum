import { beforeEach, describe, expect, it } from 'vitest'

import { makeQuestion } from '@test/factories/make-question'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'

import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlug } from './get-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlug

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question).toStrictEqual(newQuestion)
  })
})
