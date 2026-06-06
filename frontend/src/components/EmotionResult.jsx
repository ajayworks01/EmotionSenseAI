import { motion } from 'framer-motion'
import { getEmotion } from '../utils/emotions'
import { FiDownload, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { useState } from 'react'

const ConfidenceBar = ({ value, color }) => (
  <div className="w-full bg-white/5 rounded-full h-2">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      className="h-2 rounded-full"
      style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
    />
  </div>
)

export default function EmotionResult({ result, inputText, onDownloadPDF }) {
  const [speaking, setSpeaking] = useState(false)
  const emotion = getEmotion(result.emotion)

  const speak = () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel()
        setSpeaking(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(
          `Detected emotion: ${result.emotion}. Confidence: ${result.confidence} percent. ${result.explanation}`
        )
        utterance.onend = () => setSpeaking(false)
        window.speechSynthesis.speak(utterance)
        setSpeaking(true)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Main Emotion Card */}
      <div className={`card bg-gradient-to-br ${emotion.bg} ${emotion.border} border`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-6xl"
            >
              {emotion.emoji}
            </motion.div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Detected Emotion</p>
              <h2 className={`text-3xl font-display font-bold ${emotion.text}`}>{emotion.label}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className={`emotion-badge ${emotion.badge}`}>
                  Confidence: {result.confidence}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={speak}
              className="p-2 rounded-lg glass hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              title="Read aloud"
            >
              {speaking ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
            </button>
            <button
              onClick={onDownloadPDF}
              className="p-2 rounded-lg glass hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              title="Download PDF Report"
            >
              <FiDownload size={16} />
            </button>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Confidence Level</span>
            <span className={emotion.text}>{result.confidence}%</span>
          </div>
          <ConfidenceBar value={result.confidence} color={emotion.color} />
        </div>
      </div>

      {/* Probabilities */}
      <div className="card">
        <h3 className="font-display font-semibold text-white mb-4 text-sm">Emotion Probabilities</h3>
        <div className="space-y-3">
          {Object.entries(result.emotion_probabilities || {}).map(([key, value]) => {
            const em = getEmotion(key)
            const pct = Math.round(value * 100)
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="text-lg w-7">{em.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400 capitalize">{key}</span>
                    <span className={em.text}>{pct}%</span>
                  </div>
                  <ConfidenceBar value={pct} color={em.color} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="card">
        <h3 className="font-display font-semibold text-white mb-2 text-sm">AI Explanation</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{result.explanation}</p>
      </div>

      {/* Suggested Response */}
      <div className={`card border ${emotion.border} bg-gradient-to-br ${emotion.bg}`}>
        <h3 className="font-display font-semibold text-white mb-2 text-sm">💬 Suggested Response</h3>
        <p className={`text-sm leading-relaxed ${emotion.text}`}>{result.suggested_response}</p>
      </div>
    </motion.div>
  )
}
