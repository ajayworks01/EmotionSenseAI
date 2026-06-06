import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { access_token, user } = res.data
    localStorage.setItem('token', access_token)
    localStorage.setItem('user', JSON.stringify(user))
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    setUser(user)
    toast.success(`Welcome back, ${user.name}! 👋`)
    return user
  }

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password })
    const { access_token, user } = res.data
    localStorage.setItem('token', access_token)
    localStorage.setItem('user', JSON.stringify(user))
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    setUser(user)
    toast.success(`Account created! Welcome, ${user.name}! 🎉`)
    return user
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
