import type { CreateSurveyDto, ProblemAnswerDto, Survey } from '@/types/survey'
import axios from '@/lib/axios'

export const createSurvey = async (survey: CreateSurveyDto) => {
  const response = await axios.post('/survey', survey)
  return response.data
}

export const getSurveys = async () => {
  const response = await axios.get('/survey')
  return response.data
}

export const getSurvey = async (id: string) => {
  const response = await axios.get(`/survey/${id}`)
  return response.data
}

export const updateSurvey = async (survey: Survey) => {
  const response = await axios.put(`/survey/${survey.id}`, survey)
  return response.data
}

export const deleteSurvey = async (id: string) => {
  const response = await axios.delete(`/survey/${id}`)
  return response.data
}

export const submitProblem = async (id: string, problemAnswer: ProblemAnswerDto) => {
  const response = await axios.post(`/survey/${id}/problem/${problemAnswer.id}/submit`, { answer: problemAnswer.answer })
  return response.data
}

export const getSurveyParticipations = async (id: string) => {
  const response = await axios.get(`/survey/${id}/user`)
  return response.data
}

export const getSurveyAnswers = async (id: string, userId: string) => {
  const response = await axios.get(`/survey/${id}/user/${userId}/answer`)
  return response.data
}
