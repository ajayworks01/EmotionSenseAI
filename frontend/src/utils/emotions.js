export const EMOTIONS = {
  happy: {
    emoji: '😊',
    label: 'Happy',
    color: '#22c55e',
    bg: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    text: 'text-green-400',
    badge: 'bg-green-500/20 text-green-300 border border-green-500/30',
  },
  sad: {
    emoji: '😢',
    label: 'Sad',
    color: '#3b82f6',
    bg: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  },
  angry: {
    emoji: '😠',
    label: 'Angry',
    color: '#ef4444',
    bg: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/30',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-300 border border-red-500/30',
  },
  fear: {
    emoji: '😨',
    label: 'Fear',
    color: '#a855f7',
    bg: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  },
  surprise: {
    emoji: '😲',
    label: 'Surprise',
    color: '#f59e0b',
    bg: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  },
  neutral: {
    emoji: '😐',
    label: 'Neutral',
    color: '#6b7280',
    bg: 'from-gray-500/20 to-slate-500/20',
    border: 'border-gray-500/30',
    text: 'text-gray-400',
    badge: 'bg-gray-500/20 text-gray-300 border border-gray-500/30',
  },
}

export const getEmotion = (key) => EMOTIONS[key?.toLowerCase()] || EMOTIONS.neutral

export const CHART_COLORS = ['#8b5cf6', '#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#6b7280']
