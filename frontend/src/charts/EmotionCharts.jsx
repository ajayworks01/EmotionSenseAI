import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import { CHART_COLORS, EMOTIONS } from '../utils/emotions'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark rounded-xl px-3 py-2 text-sm">
        <p className="text-white font-medium capitalize">{payload[0].name}</p>
        <p className="text-purple-400">{(payload[0].value * 100).toFixed(1)}%</p>
      </div>
    )
  }
  return null
}

export default function EmotionCharts({ probabilities = {}, confidence = 0 }) {
  const data = Object.entries(probabilities).map(([name, value], i) => ({
    name,
    value: parseFloat(value),
    fullMark: 1,
    fill: CHART_COLORS[i],
    emoji: EMOTIONS[name]?.emoji || '😐',
  }))

  const pieData = data.filter(d => d.value > 0)
  
  const RADIAN = Math.PI / 180
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="16">
        {pieData[index]?.emoji}
      </text>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="card">
          <h4 className="font-display font-semibold text-white text-xs mb-3">Emotion Distribution</h4>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={60} dataKey="value" labelLine={false} label={renderCustomLabel}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h4 className="font-display font-semibold text-white text-xs mb-3">Confidence Comparison</h4>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="emoji" tick={{ fontSize: 14 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4,4,0,0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="card">
        <h4 className="font-display font-semibold text-white text-xs mb-3">Emotion Radar</h4>
        <ResponsiveContainer width="100%" height={180}>
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} />
            <Radar name="Probability" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
