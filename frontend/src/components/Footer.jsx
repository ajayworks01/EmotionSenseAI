import { Link } from 'react-router-dom'
import { HiSparkles } from 'react-icons/hi2'
import { FiGithub, FiMail, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <HiSparkles className="text-white text-sm" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Emotion<span className="gradient-text">Sense</span> AI
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Context-aware emotion detection from text using NLP and Generative AI. 
              Powered by Google Gemini.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                <FiGithub size={16} />
              </a>
              <a href="mailto:contact@emotionsense.ai"
                className="p-2 rounded-lg glass hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                <FiMail size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-3">Product</h4>
            <ul className="space-y-2">
              {[['Analyzer', '/analyze'], ['Dashboard', '/dashboard'], ['History', '/history'], ['Research', '/research']].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-3">Info</h4>
            <ul className="space-y-2">
              {[['About', '/about'], ['Contact', '/contact'], ['Register', '/register'], ['Sign In', '/login']].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} EmotionSense AI. Final Year Engineering Research Project.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with <FiHeart size={10} className="text-purple-500" /> using React & Google Gemini
          </p>
        </div>
      </div>
    </footer>
  )
}
