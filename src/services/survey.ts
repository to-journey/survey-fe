import type { CreateSurveyDto, Survey } from '@/types/survey'
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
