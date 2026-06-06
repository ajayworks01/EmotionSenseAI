import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, CartesianGrid } from 'recharts'
import { getAnalytics } from '../services/emotionService'
import StatCard from '../components/StatCard'
import { CHART_COLORS, EMOTIONS } from '../utils/emotions'
import { FiTrendingUp, FiSmile, FiFrown, FiActivity } from 'react-icons/fi'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass-dark rounded-xl px-3 py-2 text-xs border border-white/10">
        <p className="text-white font-medium">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnalytics()
      .then(setAnalytics)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="flex gap-2">
        <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
        <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
        <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
      </div>
    </div>
  )

  const stats = analytics?.stats || {}
  const emotionDist = analytics?.emotion_distribution || []
  const dailyData = analytics?.daily_trend || []
  const weeklyData = analytics?.weekly_trend || []

  const pieData = emotionDist.map((d, i) => ({
    name: d.emotion,
    value: d.count,
    fill: CHART_COLORS[i],
    emoji: EMOTIONS[d.emotion?.toLowerCase()]?.emoji || '😐',
  }))

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-500">Comprehensive overview of all emotion analyses</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<FiActivity />} label="Total Analyses" value={stats.total || 0} color="purple" delay={0} />
          <StatCard icon={<FiSmile />} label="Most Common" value={stats.most_common ? `${EMOTIONS[stats.most_common]?.emoji} ${stats.most_common}` : 'N/A'} color="green" delay={0.1} />
          <StatCard icon={<FiTrendingUp />} label="Positive %" value={`${stats.positive_pct || 0}%`} color="blue" delay={0.2} />
          <StatCard icon={<FiFrown />} label="Negative %" value={`${stats.negative_pct || 0}%`} color="red" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Emotion Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="font-display font-semibold text-white mb-4">Emotion Distribution</h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-600">No data yet</div>
            )}
          </motion.div>

          {/* Daily Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="font-display font-semibold text-white mb-4">Daily Analyses (Last 7 Days)</h3>
            {dailyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} name="Analyses" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-600">No data yet</div>
            )}
          </motion.div>
        </div>

        {/* Emotion Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-6"
        >
          <h3 className="font-display font-semibold text-white mb-4">Emotion Breakdown</h3>
          {emotionDist.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={emotionDist} margin={{ left: -10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="emotion" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(val) => `${EMOTIONS[val?.toLowerCase()]?.emoji || ''} ${val}`} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6,6,0,0]} name="Count">
                  {emotionDist.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-600">
              <p className="text-sm">No analyses yet. <a href="/analyze" className="text-purple-400 hover:underline">Start analyzing text</a></p>
            </div>
          )}
        </motion.div>

        {/* Weekly comparison */}
        {weeklyData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h3 className="font-display font-semibold text-white mb-4">Weekly Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} margin={{ left: -10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6,6,0,0]} fill="#3b82f6" name="Analyses" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  )
}
