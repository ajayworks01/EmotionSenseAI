import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiSparkles, HiArrowRight, HiChartBar, HiDocumentText } from 'react-icons/hi2'
import { FiGithub, FiZap, FiCpu, FiPieChart, FiTrendingUp, FiShield, FiFileText } from 'react-icons/fi'

const FEATURES = [
  { icon: <FiCpu />, title: 'Deep Emotion Detection', desc: 'Classify text into 6 core emotions with contextual understanding powered by Gemini AI.' },
  { icon: <FiCpu />, title: 'NLP Processing', desc: 'Advanced natural language processing pipeline with preprocessing, tokenization, and semantic analysis.' },
  { icon: <HiSparkles className="text-inherit" />, title: 'AI Insights', desc: 'Generative AI explanations and personalized suggested responses for each analysis.' },
  { icon: <FiPieChart />, title: 'Analytics Dashboard', desc: 'Real-time visualizations, trends, and statistics for all your emotion analyses.' },
  { icon: <FiShield />, title: 'Research-Based', desc: 'Built on published NLP research methodologies with academic rigor and precision.' },
  { icon: <FiFileText />, title: 'PDF Reports', desc: 'Export professional PDF reports for each analysis, suitable for presentations.' },
]

const HOW_IT_WORKS = [
  { step: '01', label: 'User Text Input', desc: 'Enter any text, message, review, or statement' },
  { step: '02', label: 'Text Preprocessing', desc: 'Tokenization, normalization, stop-word removal' },
  { step: '03', label: 'Gemini AI Analysis', desc: 'Deep semantic understanding via Google Gemini' },
  { step: '04', label: 'Emotion Detection', desc: 'Classification into 6 core emotion categories' },
  { step: '05', label: 'Insight Generation', desc: 'AI-powered explanation and response suggestion' },
  { step: '06', label: 'Dashboard Visualization', desc: 'Interactive charts and analytics display' },
]

const APPLICATIONS = [
  { emoji: '🧠', label: 'Mental Health Monitoring' },
  { emoji: '💬', label: 'Customer Feedback Analysis' },
  { emoji: '📱', label: 'Social Media Monitoring' },
  { emoji: '🤖', label: 'Chatbot Enhancement' },
  { emoji: '🎓', label: 'Educational Systems' },
  { emoji: '🎯', label: 'Recommendation Systems' },
]

const EMOTIONS_DEMO = [
  { emoji: '😊', label: 'Happy', color: 'text-green-400', bg: 'bg-green-500/10', pct: 85 },
  { emoji: '😢', label: 'Sad', color: 'text-blue-400', bg: 'bg-blue-500/10', pct: 12 },
  { emoji: '😠', label: 'Angry', color: 'text-red-400', bg: 'bg-red-500/10', pct: 3 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl top-20 -left-20" />
          <div className="orb-2 absolute w-80 h-80 rounded-full bg-blue-600/15 blur-3xl bottom-20 right-10" />
          <div className="orb-3 absolute w-64 h-64 rounded-full bg-cyan-600/10 blur-3xl top-1/2 left-1/2" />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-300 mb-8 border border-purple-500/20">
              <HiSparkles className="text-purple-400" />
              <span className="font-mono text-xs">Powered by Google Gemini AI</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            Emotion<span className="gradient-text">Sense</span>
            <br />
            <span className="text-gray-400 text-4xl sm:text-5xl">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Context-Aware Emotion Detection from Text Using{' '}
            <span className="text-purple-400">Natural Language Processing</span> &{' '}
            <span className="text-blue-400">Generative AI</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/analyze" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
              Try Demo <HiArrowRight />
            </Link>
            <Link to="/research" className="btn-ghost flex items-center gap-2 text-base px-8 py-4">
              <HiDocumentText className="text-inherit" /> View Research
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="btn-ghost flex items-center gap-2 text-base px-8 py-4">
              <FiGithub /> GitHub
            </a>
          </motion.div>

          {/* Demo emotion display */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 max-w-lg mx-auto"
          >
            <div className="card text-left">
              <p className="text-xs text-gray-600 font-mono mb-3">// Live Demo Preview</p>
              <p className="text-sm text-gray-300 mb-4 glass px-3 py-2 rounded-lg italic">
                "I just got accepted into my dream internship! This is the best day of my life!"
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">😊</span>
                <div>
                  <p className="font-display font-bold text-green-400 text-xl">Happy</p>
                  <p className="text-xs text-gray-500">Confidence: 94%</p>
                </div>
                <div className="ml-auto glass px-3 py-1 rounded-full">
                  <span className="text-xs text-green-400 font-mono">✓ Analyzed</span>
                </div>
              </div>
              <div className="space-y-2">
                {EMOTIONS_DEMO.map(e => (
                  <div key={e.label} className="flex items-center gap-2 text-xs">
                    <span className={`w-14 ${e.color}`}>{e.emoji} {e.label}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${e.pct}%` }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className={`h-full rounded-full ${e.bg.replace('bg-', 'bg-').replace('/10', '')}`}
                        style={{ background: e.color.includes('green') ? '#22c55e' : e.color.includes('blue') ? '#3b82f6' : '#ef4444' }}
                      />
                    </div>
                    <span className="text-gray-500 w-8 text-right">{e.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-mono text-purple-400 tracking-widest uppercase">Features</motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
              Everything you need for<br />
              <span className="gradient-text">emotion intelligence</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card group hover:border-purple-500/30 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300 text-lg">
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">Methodology</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent hidden md:block" />
            <div className="space-y-4">
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 card"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-mono text-white text-sm font-bold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">{step.label}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Real-World Impact</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
              Real-world <span className="gradient-text">Applications</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {APPLICATIONS.map((app, i) => (
              <motion.div
                key={app.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="card text-center hover:border-purple-500/30 group cursor-default"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{app.emoji}</div>
                <p className="text-sm font-medium text-gray-300">{app.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="card relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />
            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Ready to detect emotions?
              </h2>
              <p className="text-gray-400 mb-8">
                Start analyzing text for emotional content with AI-powered precision.
              </p>
              <Link to="/analyze" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4">
                Launch Analyzer <HiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
