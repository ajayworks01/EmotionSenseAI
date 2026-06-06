import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiTrash2, FiDownload, FiActivity } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '../services/api'
import StatCard from '../components/StatCard'

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/users'),
      api.get('/admin/stats'),
    ]).then(([uRes, sRes]) => {
      setUsers(uRes.data.users || [])
      setStats(sRes.data || {})
    }).catch(() => toast.error('Failed to load admin data'))
    .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (userId) => {
    if (!confirm('Delete this user and all their data?')) return
    try {
      await api.delete(`/admin/users/${userId}`)
      setUsers(u => u.filter(user => user.id !== userId))
      toast.success('User deleted')
    } catch {
      toast.error('Delete failed')
    }
  }

  const handleExportAll = async () => {
    try {
      const res = await api.get('/admin/export', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `admin_export_${Date.now()}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Export downloaded')
    } catch {
      toast.error('Export failed')
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-white">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Platform management and analytics</p>
          </div>
          <button onClick={handleExportAll} className="btn-ghost flex items-center gap-2 text-sm py-2 px-4">
            <FiDownload size={14} /> Export All
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<FiUsers />} label="Total Users" value={stats.total_users || 0} color="purple" />
          <StatCard icon={<FiActivity />} label="Total Analyses" value={stats.total_analyses || 0} color="blue" delay={0.1} />
          <StatCard icon="😊" label="Happy %" value={`${stats.happy_pct || 0}%`} color="green" delay={0.2} />
          <StatCard icon="😠" label="Angry %" value={`${stats.angry_pct || 0}%`} color="red" delay={0.3} />
        </div>

        {/* Users Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card overflow-hidden p-0">
          <div className="p-5 border-b border-white/5">
            <h2 className="font-display font-semibold text-white">All Users</h2>
          </div>
          {loading ? (
            <div className="py-12 flex items-center justify-center">
              <div className="flex gap-2">
                <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
                <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
                <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {['ID', 'Name', 'Email', 'Analyses', 'Admin', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="text-left py-3 px-5 text-xs text-gray-500 uppercase tracking-wider font-mono">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] group">
                      <td className="py-3 px-5 text-xs text-gray-600 font-mono">{user.id}</td>
                      <td className="py-3 px-5 text-sm text-white">{user.name}</td>
                      <td className="py-3 px-5 text-sm text-gray-400">{user.email}</td>
                      <td className="py-3 px-5 text-sm text-purple-400 font-mono">{user.analysis_count || 0}</td>
                      <td className="py-3 px-5">
                        {user.is_admin ? (
                          <span className="text-xs glass px-2 py-0.5 rounded-full text-purple-400 border border-purple-500/30">Admin</span>
                        ) : (
                          <span className="text-xs text-gray-600">User</span>
                        )}
                      </td>
                      <td className="py-3 px-5 text-xs text-gray-600 whitespace-nowrap">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-5">
                        {!user.is_admin && (
                          <button onClick={() => handleDelete(user.id)}
                            className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                            <FiTrash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
