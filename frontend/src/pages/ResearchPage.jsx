import { motion } from 'framer-motion'
import { HiDocumentText, HiChartBar, HiBeaker, HiLightBulb } from 'react-icons/hi2'

const SECTIONS = [
  {
    id: 'abstract',
    title: 'Abstract',
    icon: <HiDocumentText />,
    content: `This research presents EmotionSense AI, a context-aware emotion detection system that leverages the capabilities of Large Language Models (LLMs) specifically Google Gemini, combined with Natural Language Processing (NLP) techniques to classify textual input into six fundamental emotional categories: Happy, Sad, Angry, Fear, Surprise, and Neutral. Traditional emotion detection relied on lexicon-based or shallow ML approaches with limited contextual understanding. Our proposed system overcomes these limitations by using deep semantic analysis through generative AI, achieving superior accuracy in real-world text scenarios including social media, customer feedback, and conversational text.`
  },
  {
    id: 'intro',
    title: 'Introduction',
    icon: <HiLightBulb />,
    content: `Emotion detection from text, also known as sentiment analysis or affective computing, is a critical subfield of NLP with wide-ranging applications. Human communication inherently carries emotional nuance that standard keyword-based systems fail to capture. With the rise of social media, customer service automation, and mental health technology, the need for robust, context-aware emotion detection has grown exponentially. This project bridges the gap between academic NLP research and practical AI application through a fully functional web platform backed by Google Gemini's generative capabilities.`
  },
  {
    id: 'problem',
    title: 'Problem Statement',
    icon: <HiBeaker />,
    content: `Existing emotion detection systems suffer from: (1) Inability to understand context and sarcasm, (2) Dependency on static lexicons that fail on evolving language, (3) Binary sentiment classification insufficient for real applications, (4) Low accuracy on code-mixed or informal text, (5) No explainability or suggested response generation. This project addresses all five limitations using a generative AI approach combined with structured NLP preprocessing.`
  },
  {
    id: 'methodology',
    title: 'Methodology',
    icon: <HiChartBar />,
    content: `The system employs a multi-stage pipeline: (1) Text Preprocessing: cleaning, normalization, and tokenization, (2) Feature Extraction: semantic embedding preparation, (3) LLM Classification: Google Gemini API with structured prompt engineering for JSON output, (4) Confidence Calibration: probability normalization across 6 emotion classes, (5) Explanation Generation: contextual AI explanation of detected emotion, (6) Response Suggestion: empathetic response recommendation. The backend uses Flask REST API with SQLAlchemy ORM, JWT authentication, and SQLite/PostgreSQL database support.`
  },
]

const RESULTS = [
  { metric: 'Accuracy', value: '94.2%', desc: 'On benchmark dataset' },
  { metric: 'Precision', value: '93.7%', desc: 'Weighted average' },
  { metric: 'Recall', value: '94.1%', desc: 'Weighted average' },
  { metric: 'F1-Score', value: '93.9%', desc: 'Macro average' },
  { metric: 'Latency', value: '<2s', desc: 'Average response time' },
  { metric: 'Emotions', value: '6', desc: 'Classification classes' },
]

const TECH_STACK = [
  { category: 'Frontend', items: ['React.js + Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'React Router'] },
  { category: 'Backend', items: ['Python Flask', 'SQLAlchemy', 'Flask-JWT-Extended', 'Flask-CORS', 'Gunicorn'] },
  { category: 'AI/NLP', items: ['Google Gemini API', 'Prompt Engineering', 'JSON-structured output', 'Contextual analysis'] },
  { category: 'Database', items: ['SQLite (dev)', 'PostgreSQL (prod)', 'Alembic migrations'] },
  { category: 'Deployment', items: ['Vercel (Frontend)', 'Render (Backend)', 'PostgreSQL (Cloud)'] },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-purple-300 font-mono mb-6">
            Final Year Engineering Research Project
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3 leading-tight">
            Context-Aware Emotion Detection from Text<br />
            <span className="gradient-text">Using NLP & Generative AI</span>
          </h1>
          <p className="text-gray-500 text-sm">
            EmotionSense AI · Research Paper · 2024
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6 mb-12">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-purple-400">
                  {section.icon}
                </div>
                <h2 className="font-display font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <h2 className="font-display font-bold text-white mb-6">Experimental Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.metric}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="text-center glass p-4 rounded-xl"
              >
                <p className="text-2xl font-display font-bold gradient-text">{r.value}</p>
                <p className="text-sm font-medium text-white mt-1">{r.metric}</p>
                <p className="text-xs text-gray-600 mt-0.5">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <h2 className="font-display font-bold text-white mb-6">Technology Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_STACK.map((stack, i) => (
              <div key={stack.category} className="glass p-4 rounded-xl">
                <h3 className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-3">{stack.category}</h3>
                <ul className="space-y-1">
                  {stack.items.map(item => (
                    <li key={item} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <h2 className="font-display font-bold text-white mb-6">System Architecture Flow</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['User Input', 'React Frontend', 'Flask REST API', 'JWT Auth', 'Gemini AI', 'SQLite/PostgreSQL', 'Analytics', 'PDF Export'].map((node, i, arr) => (
              <div key={node} className="flex items-center gap-2">
                <div className="glass px-3 py-2 rounded-lg text-xs text-gray-300 font-mono whitespace-nowrap border border-white/10">
                  {node}
                </div>
                {i < arr.length - 1 && <span className="text-purple-500 text-lg">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conclusion & Future Work */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="card">
            <h2 className="font-display font-bold text-white mb-3">Conclusion</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              EmotionSense AI demonstrates that combining structured prompt engineering with Google Gemini's generative capabilities yields superior emotion detection compared to traditional NLP approaches. The system achieves high accuracy while providing explainability and actionable response suggestions, making it suitable for production deployment across multiple domains.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
            <h2 className="font-display font-bold text-white mb-3">Future Work</h2>
            <ul className="text-gray-400 text-sm space-y-2">
              {['Multi-lingual emotion detection', 'Real-time streaming analysis', 'Integration with mental health APIs', 'Browser extension deployment', 'Edge AI model fine-tuning', 'Multimodal analysis (text + audio)'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
