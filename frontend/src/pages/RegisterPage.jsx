import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill all fields')
      return
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/analyze')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb absolute w-80 h-80 rounded-full bg-purple-600/15 blur-3xl top-20 right-10" />
        <div className="orb-2 absolute w-64 h-64 rounded-full bg-blue-600/10 blur-3xl bottom-20 left-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 mb-4 shadow-lg shadow-purple-500/30">
            <HiSparkles className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Create account</h1>
          <p className="text-gray-500 text-sm mt-1">Join EmotionSense AI</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', icon: <FiUser size={16} />, placeholder: 'John Doe', type: 'text' },
              { key: 'email', label: 'Email', icon: <FiMail size={16} />, placeholder: 'you@example.com', type: 'email' },
            ].map(({ key, label, icon, placeholder, type }) => (
              <div key={key}>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-mono block mb-2">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</span>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="input-field pl-9"
                    required
                  />
                </div>
              </div>
            ))}

            {[
              { key: 'password', label: 'Password', placeholder: '••••••••' },
              { key: 'confirm', label: 'Confirm Password', placeholder: '••••••••' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-mono block mb-2">{label}</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="input-field pl-9 pr-10"
                    required
                  />
                  {key === 'password' && (
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                      {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center flex items-center gap-2 mt-2 disabled:opacity-60">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
