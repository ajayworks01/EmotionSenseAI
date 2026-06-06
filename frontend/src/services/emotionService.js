import api from './api'

export const analyzeEmotion = async (text) => {
  const res = await api.post('/analyze', { text })
  return res.data
}

export const getHistory = async (page = 1, search = '') => {
  const res = await api.get(`/history?page=${page}&search=${encodeURIComponent(search)}`)
  return res.data
}

export const deleteHistory = async (id) => {
  const res = await api.delete(`/history/${id}`)
  return res.data
}

export const getAnalytics = async () => {
  const res = await api.get('/analytics')
  return res.data
}

export const exportCSV = async () => {
  const res = await api.get('/history/export', { responseType: 'blob' })
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `emotionsense_history_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  link.remove()
}
