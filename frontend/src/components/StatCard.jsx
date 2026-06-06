import { motion } from 'framer-motion'

export default function StatCard({ icon, label, value, trend, color = 'purple', delay = 0 }) {
  const colors = {
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-400',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-400',
    green: 'from-green-500/10 to-green-500/5 border-green-500/20 text-green-400',
    red: 'from-red-500/10 to-red-500/5 border-red-500/20 text-red-400',
    amber: 'from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">{label}</p>
          <p className={`text-3xl font-display font-bold ${colors[color].split(' ')[3]}`}>{value}</p>
          {trend && <p className="text-xs text-gray-500 mt-1">{trend}</p>}
        </div>
        <div className={`text-2xl p-2 rounded-xl bg-gradient-to-br ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}
