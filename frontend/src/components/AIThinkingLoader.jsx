import { motion } from 'framer-motion'

const STEPS = [
  'Preprocessing text...',
  'Extracting linguistic features...',
  'Running NLP analysis...',
  'Querying Gemini AI...',
  'Generating insights...',
]

export default function AIThinkingLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card flex flex-col items-center py-10 gap-6"
    >
      {/* Animated brain/AI icon */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-purple-500/30 animate-ping [animation-delay:0.3s]" />
        <div className="absolute inset-4 rounded-full bg-purple-500/40 animate-ping [animation-delay:0.6s]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">🧠</span>
        </div>
      </div>

      <div className="text-center">
        <p className="font-display font-semibold text-white text-lg mb-1">Analyzing Emotion</p>
        <p className="text-gray-500 text-sm">AI is processing your text...</p>
      </div>

      {/* Animated steps */}
      <div className="space-y-2 w-full max-w-xs">
        {STEPS.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
            className="flex items-center gap-2 text-xs text-gray-500"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.4 + 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-purple-500"
            />
            {step}
          </motion.div>
        ))}
      </div>

      {/* Loading dots */}
      <div className="flex gap-2">
        <div className="loading-dot w-2.5 h-2.5 rounded-full bg-purple-500" />
        <div className="loading-dot w-2.5 h-2.5 rounded-full bg-blue-500" />
        <div className="loading-dot w-2.5 h-2.5 rounded-full bg-cyan-500" />
      </div>
    </motion.div>
  )
}
