import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const contactInfo = [
  {
    icon: '📧',
    label: 'Email',
    value: 'muhammadwaseem1@hotmail.com',
    href: 'mailto:muhammadwaseem1@hotmail.com',
    color: '#00d4aa',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+92 317 1148001',
    href: 'tel:+923171148001',
    color: '#0099ff',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Karachi, Pakistan',
    href: null,
    color: '#6366f1',
  },
  {
    icon: '🔗',
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://linkedin.com',
    color: '#0077b5',
  },
]

export default function Contact({ ref }) {
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    if (ref && containerRef.current) {
      ref.current = containerRef.current
    }
  }, [ref])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setFormState({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setStatus('error')
    }
    
    setTimeout(() => setStatus('idle'), 3000)
  }

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative py-24 px-6 lg:py-32"
      aria-label="Contact section"
    >
      {/* CSS-only animated background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0a0f1a] to-[#111827]" />
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
        <div className="grid-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#00d4aa' }}>
            Get In Touch
          </span>
          <h2 className="section-title mt-4">Let's Collaborate</h2>
          <p className="section-subtitle mx-auto mt-4">
            Open to opportunities, consulting, and interesting conversations about 
            AMI, smart grid, data architecture, or engineering leadership.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href ? '_blank' : undefined}
                  rel={item.href ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="card-glass p-6 rounded-2xl flex items-center gap-5 group"
                  style={{ borderColor: `rgba(${parseInt(item.color.slice(1,2),16)*16}, ${parseInt(item.color.slice(2,3),16)*16}, ${parseInt(item.color.slice(3,4),16)*16}, 0.2)` }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" 
                    style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)` }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                    <p className="font-medium group-hover:text-[#00d4aa] transition-colors">{item.value}</p>
                  </div>
                  {item.href && (
                    <motion.div className="ml-auto w-8 h-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`, color: item.color }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 card-glass p-6 rounded-2xl"
            >
              <h3 className="font-semibold mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#00d4aa', boxShadow: '0 0 10px #00d4aa' }} />
                  <span className="text-slate-300">Open for consulting & advisory</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#00d4aa', boxShadow: '0 0 10px #00d4aa' }} />
                  <span className="text-slate-300">Available for speaking engagements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#0099ff', boxShadow: '0 0 10px #0099ff' }} />
                  <span className="text-slate-300">Selective full-time opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#6366f1', boxShadow: '0 0 10px #6366f1' }} />
                  <span className="text-slate-300">Mentorship & technical guidance</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="card-glass p-8 rounded-3xl" noValidate>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#e8edf5',
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#e8edf5',
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all appearance-none"
                  style={{ 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#e8edf5',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%2364748b%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem',
                  }}
                >
                  <option value="">Select a topic</option>
                  <option value="consulting">Consulting & Advisory</option>
                  <option value="ami">AMI / Smart Metering Projects</option>
                  <option value="architecture">System Architecture & Design</option>
                  <option value="kafka">Kafka & Data Streaming</option>
                  <option value="leadership">Engineering Leadership</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="mentorship">Mentorship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{ 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#e8edf5',
                  }}
                  whileFocus={{ scale: 1.01 }}
                  placeholder="Tell me about your project, challenge, or opportunity..."
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full py-4 text-lg"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {status === 'submitting' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </span>
                ) : status === 'error' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Failed. Try again.
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
              
              <p className="text-center text-sm text-slate-500 mt-4">
                Or email directly at <a href="mailto:muhammadwaseem1@hotmail.com" className="underline hover:text-[#00d4aa] transition-colors">muhammadwaseem1@hotmail.com</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}