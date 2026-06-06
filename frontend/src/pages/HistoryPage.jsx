import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiTrash2, FiDownload, FiFilter } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getHistory, deleteHistory, exportCSV } from '../services/emotionService'
import { getEmotion } from '../utils/emotions'

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterEmotion, setFilterEmotion] = useState('')

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const data = await getHistory(page, search)
      setHistory(data.items || [])
      setTotalPages(data.pages || 1)
    } catch {
      toast.error('Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(fetchHistory, 300)
    return () => clearTimeout(timer)
  }, [page, search])

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id)
      setHistory(h => h.filter(item => item.id !== id))
      toast.success('Entry deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const handleExport = async () => {
    try {
      await exportCSV()
      toast.success('CSV exported!')
    } catch {
      toast.error('Export failed')
    }
  }

  const filtered = filterEmotion
    ? history.filter(h => h.emotion?.toLowerCase() === filterEmotion)
    : history

  const EMOTIONS_LIST = ['happy', 'sad', 'angry', 'fear', 'surprise', 'neutral']

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-display font-bold text-white mb-1">Analysis History</h1>
              <p className="text-gray-500 text-sm">All your past emotion analyses</p>
            </div>
            <button onClick={handleExport} className="btn-ghost flex items-center gap-2 text-sm py-2 px-4">
              <FiDownload size={14} /> Export CSV
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search analyses..."
              className="input-field pl-9 text-sm"
            />
          </div>
          <select
            value={filterEmotion}
            onChange={e => setFilterEmotion(e.target.value)}
            className="input-field sm:w-44 text-sm"
          >
            <option value="">All Emotions</option>
            {EMOTIONS_LIST.map(e => (
              <option key={e} value={e}>{getEmotion(e).emoji} {e}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex gap-2">
                <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
                <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
                <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-600 text-sm">No analyses found.</p>
              <a href="/analyze" className="text-purple-400 text-sm hover:underline mt-1 block">Start analyzing text →</a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-4 px-5 text-xs text-gray-500 uppercase tracking-wider font-mono">Text</th>
                    <th className="text-left py-4 px-5 text-xs text-gray-500 uppercase tracking-wider font-mono">Emotion</th>
                    <th className="text-left py-4 px-5 text-xs text-gray-500 uppercase tracking-wider font-mono">Confidence</th>
                    <th className="text-left py-4 px-5 text-xs text-gray-500 uppercase tracking-wider font-mono">Date</th>
                    <th className="py-4 px-5" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => {
                    const emotion = getEmotion(item.emotion)
                    return (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="py-4 px-5 max-w-xs">
                          <p className="text-sm text-gray-300 truncate" title={item.input_text}>
                            {item.input_text}
                          </p>
                        </td>
                        <td className="py-4 px-5">
                          <span className={`emotion-badge ${emotion.badge} text-xs`}>
                            {emotion.emoji} {emotion.label}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <span className={`font-mono text-sm font-semibold ${emotion.text}`}>
                            {item.confidence}%
                          </span>
                        </td>
                        <td className="py-4 px-5 text-xs text-gray-600 whitespace-nowrap">
                          {new Date(item.timestamp).toLocaleString()}
                        </td>
                        <td className="py-4 px-5">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-ghost py-2 px-4 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-gray-500 text-sm font-mono">{page} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-ghost py-2 px-4 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
