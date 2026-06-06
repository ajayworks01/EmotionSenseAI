import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/analyze'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb absolute w-80 h-80 rounded-full bg-purple-600/15 blur-3xl top-20 left-10" />
        <div className="orb-2 absolute w-64 h-64 rounded-full bg-blue-600/10 blur-3xl bottom-20 right-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 mb-4 shadow-lg shadow-purple-500/30">
            <HiSparkles className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to EmotionSense AI</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider font-mono block mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="input-field pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider font-mono block mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-field pl-9 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center flex items-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Create one
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-3 glass rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600">Demo: <span className="text-gray-400 font-mono">demo@emotionsense.ai</span> / <span className="text-gray-400 font-mono">demo123</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
