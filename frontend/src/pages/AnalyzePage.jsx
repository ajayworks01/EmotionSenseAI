import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMic, FiMicOff, FiSend, FiTrash2, FiInfo } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import toast from 'react-hot-toast'
import { analyzeEmotion } from '../services/emotionService'
import { generatePDFReport } from '../services/pdfService'
import EmotionResult from '../components/EmotionResult'
import AIThinkingLoader from '../components/AIThinkingLoader'
import EmotionCharts from '../charts/EmotionCharts'

const SAMPLE_TEXTS = [
  "I just got accepted into my dream university! This is the best day of my life!",
  "I'm so frustrated with this project. Nothing seems to be working and I've been stuck for hours.",
  "I don't know what to do anymore. Everything feels empty and pointless.",
  "Oh wow, I can't believe you remembered my birthday! I'm completely speechless!",
  "The meeting is scheduled for 3 PM tomorrow in conference room B.",
]

export default function AnalyzePage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to analyze')
      return
    }
    if (text.trim().length < 5) {
      toast.error('Text too short. Please enter at least 5 characters.')
      return
    }

    setLoading(true)
    setResult(null)
    try {
      const data = await analyzeEmotion(text)
      setResult(data)
      toast.success('Emotion analysis complete! 🎯')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser')
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.onresult = (e) => {
      setText(e.results[0][0].transcript)
      setListening(false)
      toast.success('Voice input captured!')
    }
    recognition.onerror = () => {
      setListening(false)
      toast.error('Voice recognition failed')
    }
    recognition.onend = () => setListening(false)
    recognition.start()
    recognitionRef.current = recognition
    setListening(true)
    toast.success('Listening... Speak now')
  }

  const stopVoice = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) handleAnalyze()
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-300 mb-4">
            <HiSparkles className="text-purple-400" />
            <span className="font-mono text-xs">Gemini AI Powered</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Emotion Analyzer</h1>
          <p className="text-gray-500">Enter any text to detect its emotional content with AI precision</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-semibold text-white">Input Text</h2>
                <span className="text-xs text-gray-600 font-mono">{text.length} chars</span>
              </div>

              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your thoughts, message, review, tweet, paragraph, or emotional statement here...&#10;&#10;Press Ctrl+Enter to analyze"
                className="input-field min-h-[200px] resize-y text-sm leading-relaxed"
                disabled={loading}
              />

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !text.trim()}
                  className="btn-primary flex items-center gap-2 flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiSparkles />
                  Analyze Emotion
                </button>
                <button
                  onClick={listening ? stopVoice : startVoice}
                  disabled={loading}
                  className={`p-3 rounded-xl border transition-all duration-200 ${
                    listening 
                      ? 'bg-red-500/20 border-red-500/30 text-red-400 animate-pulse' 
                      : 'glass border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={listening ? 'Stop listening' : 'Voice input'}
                >
                  {listening ? <FiMicOff size={18} /> : <FiMic size={18} />}
                </button>
                <button
                  onClick={() => { setText(''); setResult(null) }}
                  disabled={loading}
                  className="p-3 rounded-xl glass border border-white/10 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  title="Clear"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>

              <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                <FiInfo size={10} /> Press Ctrl+Enter to analyze
              </p>
            </motion.div>

            {/* Sample Texts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="font-display font-semibold text-white text-sm mb-3">Try Sample Texts</h3>
              <div className="space-y-2">
                {SAMPLE_TEXTS.map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => { setText(sample); setResult(null) }}
                    className="w-full text-left text-xs text-gray-500 hover:text-gray-300 glass px-3 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10 truncate"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Results Panel */}
          <div>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AIThinkingLoader />
                </motion.div>
              ) : result ? (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <EmotionResult
                    result={result}
                    inputText={text}
                    onDownloadPDF={() => {
                      generatePDFReport(result, text)
                      toast.success('PDF report downloaded!')
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-display font-semibold text-white mb-2">Awaiting Analysis</h3>
                  <p className="text-gray-600 text-sm max-w-xs">
                    Enter text in the panel on the left and click "Analyze Emotion" to see AI-powered results here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Charts */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <EmotionCharts probabilities={result.emotion_probabilities} confidence={result.confidence} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
