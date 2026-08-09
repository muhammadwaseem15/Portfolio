import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function Hero({ ref }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (ref && containerRef.current) {
      ref.current = containerRef.current
    }
  }, [ref])

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* CSS-only animated background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0a0f1a] to-[#111827]" />
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
        <div className="grid-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm text-sm font-medium mb-8">
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: '#00d4aa' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Senior Solution Engineer • AMI & Smart Grid Specialist
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="text-gradient font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', letterSpacing: '-0.03em', display: 'inline-block' }}
            >
              Muhammad Waseem
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-lg md:text-xl max-w-3xl mx-auto lg:mx-0 mb-10"
              style={{ color: '#94a3b8', lineHeight: 1.7 }}
            >
              Solution Architect with 8+ years designing resilient enterprise architectures, 
              leading AMI deployments, and optimizing high-throughput data infrastructure 
              for utility giants across the Middle East.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16"
            >
              <motion.a
                href="#contact"
                className="btn-primary px-8 py-4 text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Collaborate
              </motion.a>
              <motion.a
                href="#experience"
                className="px-8 py-4 text-base font-medium rounded-xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:border-slate-600 hover:bg-slate-800/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Experience
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-12 text-sm"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-5 h-5" style={{ color: '#00d4aa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 2 16.5 3.5 17.657 4.657A8 8 0 116.343 18.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-5 h-5" style={{ color: '#00d4aa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:muhammadwaseem1@hotmail.com" className="hover:text-[#00d4aa] transition-colors">muhammadwaseem1@hotmail.com</a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-5 h-5" style={{ color: '#00d4aa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>PEC: 72562</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Glow ring behind portrait */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/20 via-transparent to-[#0099ff]/20 rounded-3xl blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '4s' }} />
              
              {/* Portrait frame */}
              <div className="relative card-glass rounded-3xl p-1 overflow-hidden">
                <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                  <img 
                    src="/assets/wsm-portrait.jpeg" 
                    alt="Muhammad Waseem - Senior Solution Engineer"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-2" style={{ borderColor: 'rgba(0, 212, 170, 0.3)' }} />
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.2), rgba(0, 153, 255, 0.2))' }} />
              <div className="absolute bottom-1/4 -right-4 w-3 h-3 rounded-full" style={{ background: '#00d4aa', boxShadow: '0 0 20px #00d4aa' }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-500 uppercase tracking-wider">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-slate-700/50 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#00d4aa' }}
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}