import { motion } from 'framer-motion'

const OBJECTIVES = [
  'Implement context-aware emotion detection using Generative AI',
  'Develop a full-stack web application with modern UI/UX',
  'Apply NLP preprocessing pipeline for text analysis',
  'Integrate Google Gemini API with structured prompt engineering',
  'Build analytics dashboard for emotion trend visualization',
  'Enable PDF report generation and CSV data export',
]

const APPLICATIONS = [
  { emoji: '🧠', title: 'Mental Health', desc: 'Monitor emotional patterns over time to support mental wellness.' },
  { emoji: '💼', title: 'Customer Service', desc: 'Analyze feedback and support tickets for emotional tone.' },
  { emoji: '📱', title: 'Social Media', desc: 'Track brand sentiment and public emotional response.' },
  { emoji: '🎓', title: 'Education', desc: 'Understand student engagement and learning frustration.' },
  { emoji: '🤖', title: 'Chatbots', desc: 'Build empathetic AI assistants with emotional awareness.' },
  { emoji: '📊', title: 'Market Research', desc: 'Extract emotional insights from product reviews.' },
]

const FUTURE_SCOPE = [
  'Multi-language emotion detection support',
  'Real-time streaming text analysis',
  'Mobile application (React Native)',
  'Browser extension for web content analysis',
  'Custom model fine-tuning on domain-specific data',
  'Integration with enterprise CRM systems',
  'Multimodal analysis combining text and speech',
  'Federated learning for privacy-preserving analysis',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-3">About <span className="gradient-text">EmotionSense AI</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A final year engineering research project demonstrating the power of combining 
            Natural Language Processing with Generative AI for emotion detection.
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card mb-6">
          <h2 className="font-display font-bold text-white mb-3">Project Overview</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            EmotionSense AI is a production-ready full-stack web application that detects human emotions from text 
            using Google Gemini's generative AI capabilities. Built with React.js on the frontend and Python Flask 
            on the backend, it provides a complete emotion intelligence platform with analytics, history tracking, 
            PDF reports, voice input, and user authentication. The system classifies text into six core emotions — 
            Happy, Sad, Angry, Fear, Surprise, and Neutral — providing confidence scores, probability distributions, 
            AI explanations, and suggested responses.
          </p>
        </motion.div>

        {/* Objectives */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="card mb-6">
          <h2 className="font-display font-bold text-white mb-4">Project Objectives</h2>
          <ul className="space-y-2">
            {OBJECTIVES.map((obj, i) => (
              <motion.li
                key={obj}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 text-sm text-gray-400"
              >
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {obj}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Applications */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="card mb-6">
          <h2 className="font-display font-bold text-white mb-4">Real-World Applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {APPLICATIONS.map((app, i) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 glass p-4 rounded-xl"
              >
                <span className="text-2xl">{app.emoji}</span>
                <div>
                  <h3 className="font-display font-semibold text-white text-sm">{app.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{app.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Scope */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="card">
          <h2 className="font-display font-bold text-white mb-4">Future Scope</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FUTURE_SCOPE.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
