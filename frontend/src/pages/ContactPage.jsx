import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiUser, FiMessageSquare, FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submit
    await new Promise(r => setTimeout(r, 1500))
    toast.success('Message sent! We\'ll get back to you soon.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Contact Us</h1>
          <p className="text-gray-500">Have questions about EmotionSense AI? Reach out.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-mono block mb-2">Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name" className="input-field pl-9" required />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-mono block mb-2">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com" className="input-field pl-9" required />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider font-mono block mb-2">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="What's this about?" className="input-field" required />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider font-mono block mb-2">Message</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell us more..." className="input-field min-h-[140px] resize-y" required />
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
              ) : (
                <><FiSend size={16} /> Send Message</>
              )}
            </button>
          </form>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="card text-center">
            <FiMail className="text-purple-400 mx-auto mb-2" size={20} />
            <p className="text-sm font-medium text-white">Email</p>
            <p className="text-xs text-gray-500 mt-0.5">contact@emotionsense.ai</p>
          </div>
          <div className="card text-center">
            <FiMessageSquare className="text-blue-400 mx-auto mb-2" size={20} />
            <p className="text-sm font-medium text-white">Response Time</p>
            <p className="text-xs text-gray-500 mt-0.5">Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}
