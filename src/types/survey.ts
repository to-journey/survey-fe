export enum ProblemType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DROPDOWN = 'dropdown',
}

export type Problem = {
  id: string
  number: number
  name: string
  description: string
  type: ProblemType
  options: Array<string>
}

export type Survey = {
  id: string
  name: string
  description: string
  participants: Array<string>
  problems: Array<Problem>
}

export type CreateProblemDto = Omit<Problem, 'id'>

export type CreateSurveyDto = {
  name: string
  description: string
  participants: Array<string>
  problems: Array<CreateProblemDto>
}

export type ProblemAnswerDto = {
  id: string
  answer: string
}
