import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiMail, FiCalendar, FiActivity } from 'react-icons/fi'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white">Profile</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card mb-6">
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/30">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-white">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              {user?.is_admin && (
                <span className="text-xs glass px-2 py-0.5 rounded-full text-purple-400 border border-purple-500/30 mt-1 inline-block">Admin</span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: <FiUser />, label: 'Full Name', value: user?.name },
              { icon: <FiMail />, label: 'Email Address', value: user?.email },
              { icon: <FiCalendar />, label: 'Member Since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' },
              { icon: <FiActivity />, label: 'Total Analyses', value: user?.total_analyses || 0 },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 glass p-4 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">{label}</p>
                  <p className="text-sm font-medium text-white mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
