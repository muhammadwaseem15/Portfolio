import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '15+', label: 'Major Projects' },
  { value: '99%', label: 'Data Availability' },
  { value: '4', label: 'Countries Worked' },
]

const highlights = [
  { icon: '🏗️', title: 'Infrastructure Design', desc: 'AMI, Smart Grid, Telecom networks across UAE, Bahrain, Pakistan' },
  { icon: '⚡', title: 'High-Throughput Systems', desc: 'Kafka streaming, millions of instructions/minute, 99.9% uptime' },
  { icon: '👥', title: 'Cross-Functional Leadership', desc: 'Led teams of 25+, managed vendors, stakeholders, executive reporting' },
  { icon: '🔧', title: 'End-to-End Delivery', desc: 'SOW to SLA, architecture to deployment, migration to optimization' },
]

export default function About({ ref }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (ref && containerRef.current) {
      ref.current = containerRef.current
    }
  }, [ref])

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative py-24 px-6 lg:py-32"
      aria-label="About section"
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
            Professional Profile
          </span>
          <h2 className="section-title mt-4 mb-6">About Me</h2>
          <p className="section-subtitle mx-auto">
            Solution Architect bridging telecommunications, enterprise infrastructure, 
            and high-throughput data systems for utility-scale deployments.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Glow ring behind portrait */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/20 via-transparent to-[#0099ff]/20 rounded-3xl blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '4s' }} />
              
              {/* Portrait frame */}
              <div className="relative card-glass rounded-3xl p-1 overflow-hidden">
                <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                  <img 
                    src="/assets/wsm-portrait.jpeg" 
                    alt="Muhammad Waseem - Senior Solution Engineer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-2" style={{ borderColor: 'rgba(0, 212, 170, 0.3)' }} />
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.2), rgba(0, 153, 255, 0.2))' }} />
              <div className="absolute bottom-1/4 -right-4 w-3 h-3 rounded-full" style={{ background: '#00d4aa', boxShadow: '0 0 20px #00d4aa' }} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="card-glass p-6 rounded-2xl text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#00d4aa' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="prose max-w-none mb-8" style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.1rem' }}>
              <p className="mb-6">
                Solution Architect with <strong>8+ years</strong> of robust experience in technical project management, 
                infrastructure design, and systems administration. Successfully transitions a strong foundation in telecom 
                operations (Huawei, ZTE, ZONG) and data optimization into resilient enterprise architectures.
              </p>
              <p className="mb-6">
                Currently specializing in <strong>high-throughput data availability</strong> and complex database performance 
                at Iskraemeco Middle East, leading AMI and smart metering solutions for enterprise utility frameworks 
                across Abu Dhabi (TAQA), Dubai (DEWA), and Bahrain (EWA).
              </p>
              <p className="mb-6">
                Proven track record of <strong>99%+ data availability</strong>, <strong>35% database performance improvement</strong>, 
                and <strong>$2.2M cost savings</strong> through strategic infrastructure optimization and automation.
              </p>
            </div>

            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="card-glass p-5 rounded-2xl flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.2), rgba(0,153,255,0.2))' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 group-hover:text-[#00d4aa] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}