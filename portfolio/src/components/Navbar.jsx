import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ scrolled, onNavClick, refs }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navbarRef = useRef(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    )

    Object.values(refs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [refs])

  const y = useTransform(scrollY, [0, 100], [0, -100])

  const handleNavClick = (sectionRef) => {
    onNavClick(sectionRef)
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled 
          ? 'rgba(10, 15, 26, 0.95)' 
          : 'rgba(10, 15, 26, 0.8)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
        borderBottom: scrolled ? '1px solid rgba(0, 212, 170, 0.1)' : 'none',
        boxShadow: scrolled ? '0 4px 30px -10px rgba(0, 212, 170, 0.1)' : 'none',
      }}
      animate={{ y }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#hero"
          className="font-bold text-xl text-gradient tracking-tight"
          onClick={(e) => { e.preventDefault(); handleNavClick(refs.current.hero) }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MW
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className="relative px-3 py-2 text-sm font-medium transition-colors"
              style={{
                color: activeSection === item.id ? '#00d4aa' : '#94a3b8',
              }}
              onClick={() => handleNavClick(refs.current[item.id])}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #00d4aa, #0099ff)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            className="btn-primary hidden sm:block"
            onClick={() => handleNavClick(refs.current.contact)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.button>
          
          <button
            className="md:hidden p-2 rounded-lg bg-slate-800/50 border border-slate-700"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          className="md:hidden px-6 pb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-glass rounded-2xl p-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  color: activeSection === item.id ? '#00d4aa' : '#94a3b8',
                  background: activeSection === item.id ? 'rgba(0, 212, 170, 0.1)' : 'transparent',
                }}
                onClick={() => handleNavClick(refs.current[item.id])}
                whileHover={{ x: 4 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              className="btn-primary w-full mt-2"
              onClick={() => handleNavClick(refs.current.contact)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}