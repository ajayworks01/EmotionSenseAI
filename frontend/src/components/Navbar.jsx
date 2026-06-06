import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyzer' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/history', label: 'History' },
  { to: '/research', label: 'Research' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all duration-300">
              <HiSparkles className="text-white text-sm" />
            </div>
            <span className="font-display font-bold text-white text-lg">
              Emotion<span className="gradient-text">Sense</span>
            </span>
            <span className="text-xs glass px-1.5 py-0.5 rounded text-purple-400 font-mono hidden sm:block">AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-body
                  ${location.pathname === link.to 
                    ? 'text-white bg-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-white font-medium hidden sm:block">{user.name?.split(' ')[0]}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-48 glass-dark rounded-xl border border-white/10 p-1 shadow-xl shadow-black/50"
                    >
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm"
                      >
                        <FiUser size={14} /> Profile
                      </Link>
                      {user.is_admin && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm"
                        >
                          <FiSettings size={14} /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => { logout(); setProfileOpen(false); navigate('/') }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 text-sm"
                      >
                        <FiLogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost py-2 px-4 text-sm">Sign In</Link>
                <Link to="/register" className="btn-primary py-2 px-4 text-sm">Get Started</Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-3 border-t border-white/5"
            >
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all
                    ${location.pathname === link.to 
                      ? 'text-white bg-white/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
