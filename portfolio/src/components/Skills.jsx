import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

const skillCategories = [
  {
    name: 'Technical Architecture',
    color: '#00d4aa',
    skills: [
      { name: 'Apache Kafka', level: 95 },
      { name: 'Data Streaming Architectures', level: 90 },
      { name: 'Database Systems (SQL)', level: 88 },
      { name: 'Python & C++', level: 85 },
      { name: 'SDLC & JIRA', level: 90 },
      { name: 'Power BI & Tableau', level: 88 },
      { name: 'MS Visio & MS Project', level: 85 },
      { name: 'Enterprise SAP', level: 80 },
      { name: 'Advanced Data Analytics', level: 87 },
    ],
  },
  {
    name: 'Leadership & Management',
    color: '#0099ff',
    skills: [
      { name: 'Technical Project Management', level: 95 },
      { name: 'Team Leadership', level: 92 },
      { name: 'Scrum Master & Agile', level: 90 },
      { name: 'Strategic Governance', level: 88 },
      { name: 'Product Lifecycle Mgmt', level: 85 },
      { name: 'Stakeholder Management', level: 93 },
      { name: 'Conflict Resolution', level: 88 },
      { name: 'Technical Documentation', level: 90 },
    ],
  },
  {
    name: 'Domain Expertise',
    color: '#6366f1',
    skills: [
      { name: 'AMI & Smart Metering', level: 95 },
      { name: 'Head-End Systems (HES)', level: 93 },
      { name: 'Smart Grid Systems', level: 90 },
      { name: 'Telecom Infrastructure', level: 88 },
      { name: 'DLMS/COSEM Protocols', level: 85 },
      { name: 'MDMS Integration', level: 90 },
      { name: 'Microwave Transmission', level: 82 },
      { name: 'RF Optimization', level: 80 },
    ],
  },
]

function SkillOrbit({ skills, color, radius, speed, index }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    
    skills.forEach((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const delay = (i / skills.length) * 20
      const duration = 20 / speed
      
      const div = document.createElement('div')
      div.className = 'skill-tag'
      div.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        transform-origin: center center;
        padding: 8px 14px;
        border-radius: 100px;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
        background: rgba(17, 24, 39, 0.9);
        border: 1px solid rgba(255,255,255,0.08);
        color: #e8edf5;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px -5px rgba(0,0,0,0.3);
        z-index: 10;
        animation: orbit-${index} ${duration}s linear infinite;
        animation-delay: -${delay}s;
      `
      div.innerHTML = `
        <span>${skill.name}</span>
        <span style="margin-left:8px;color:${color};font-weight:700">${skill.level}%</span>
      `
      
      const radiusPx = radius * 10
      const startAngle = angle * (180 / Math.PI)
      
      const styleSheet = document.styleSheets[0]
      const keyframes = `
        @keyframes orbit-${index}-${i} {
          from { transform: translate(-50%, -50%) rotate(${startAngle}deg) translateX(${radiusPx}px) rotate(${-startAngle}deg); }
          to { transform: translate(-50%, -50%) rotate(${startAngle + 360}deg) translateX(${radiusPx}px) rotate(${-startAngle - 360}deg); }
        }
      `
      
      if (styleSheet.cssRules.length < 1000) {
        try {
          styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
        } catch (e) {
          const style = document.createElement('style')
          style.textContent = keyframes
          document.head.appendChild(style)
        }
      }
      
      div.style.animation = `orbit-${index}-${i} ${duration}s linear infinite`
      
      div.addEventListener('mouseenter', () => {
        div.style.animationPlayState = 'paused'
        div.style.transform = `translate(-50%, -50%) rotate(${angle}rad) translateX(${radiusPx + 10}px) rotate(${-angle}rad) scale(1.1)`
        div.style.borderColor = color
        div.style.boxShadow = `0 8px 30px -5px ${color}40`
        div.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      })
      div.addEventListener('mouseleave', () => {
        div.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        setTimeout(() => {
          div.style.animationPlayState = 'running'
          div.style.borderColor = 'rgba(255,255,255,0.08)'
          div.style.boxShadow = '0 4px 20px -5px rgba(0,0,0,0.3)'
        }, 300)
      })
      
      containerRef.current.appendChild(div)
    })
  }, [skills, color, radius, speed, index])

  // Ring SVG
  const ringSvg = (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      viewBox="0 0 300 300"
      preserveAspectRatio="none"
    >
      <circle 
        cx="150" 
        cy="150" 
        r={radius * 10 - 5} 
        fill="none" 
        stroke={color} 
        strokeWidth="1" 
        strokeOpacity="0.15"
        strokeDasharray="4,4"
      />
      <circle 
        cx="150" 
        cy="150" 
        r={radius * 10 + 5} 
        fill="none" 
        stroke={color} 
        strokeWidth="1" 
        strokeOpacity="0.08"
        strokeDasharray="4,4"
      />
    </svg>
  )

  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ minHeight: '280px' }}>
      {ringSvg}
    </div>
  )
}

export default function Skills({ ref }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (ref && containerRef.current) {
      ref.current = containerRef.current
    }
  }, [ref])

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative py-24 px-6 lg:py-32"
      aria-label="Skills section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#00d4aa' }}>
            Expertise
          </span>
          <h2 className="section-title mt-4">Skills & Technologies</h2>
          <p className="section-subtitle mx-auto mt-4">
            Deep technical expertise across architecture, leadership, and domain-specific domains
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: catIndex * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="card-glass p-6 md:p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="relative aspect-square mb-8" style={{ minHeight: '280px' }}>
                <SkillOrbit 
                  skills={category.skills} 
                  color={category.color} 
                  radius={5 + catIndex * 1.5} 
                  speed={0.15 + catIndex * 0.05} 
                  index={catIndex}
                />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)` }}>
                    <svg className="w-5 h-5" style={{ color: category.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </div>
                
                <div className="space-y-2">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.03 * i }}
                      className="group relative"
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium group-hover:text-[#00d4aa] transition-colors">{skill.name}</span>
                        <span style={{ color: category.color }} className="font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + 0.03 * i, ease: [0.4, 0, 0.2, 1] }}
                          className="h-full rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                            boxShadow: `0 0 10px ${category.color}60`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-50" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Certified Apache Kafka Professional', icon: '🏆' },
            { label: 'HSE Health, Safety & Environment', icon: '🛡️' },
            { label: 'Cyber Security for Infrastructure', icon: '🔐' },
            { label: 'Intermediate SQL for Data Science', icon: '📊' },
          ].map((cert, i) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="card-glass p-5 rounded-2xl flex items-center gap-4 text-center md:text-left group"
            >
              <span className="text-3xl">{cert.icon}</span>
              <span className="text-sm font-medium group-hover:text-[#00d4aa] transition-colors">{cert.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}