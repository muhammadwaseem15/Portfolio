import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const projects = [
  {
    id: 'taqa',
    title: 'Head-End System Upgrade — TAQA (Abu Dhabi)',
    category: 'AMI / Smart Metering',
    period: '2024',
    description: 'Led the complex software platform upgrade to Symbiot Configurator version 3.18. Formulated and implemented advanced customer use cases for a robust reporting mechanism, significantly enhancing device lifecycle, data availability, and theft protection.',
    impact: [
      'Platform upgrade to v3.18',
      'Advanced reporting use cases',
      'Enhanced device lifecycle mgmt',
      'Improved theft protection',
      '99.9% data availability',
    ],
    tech: ['Symbiot Configurator', 'Apache Kafka', 'Linux', 'Grafana', 'MDMS'],
    metrics: { availability: '99.9%', devices: '500K+', uptime: '99.95%' },
  },
  {
    id: 'dewa',
    title: 'Head-End System Deployment — DEWA (Dubai)',
    category: 'Smart Water Metering',
    period: '2024',
    description: 'Successfully engineered and deployed the complete Head-End System (HES) architecture. Structured and managed the end-to-end communication matrix and created functional enterprise use cases tailored specifically to smart water metering infrastructure and analytics.',
    impact: [
      'Complete HES architecture deployment',
      'End-to-end communication matrix',
      'Smart water metering use cases',
      'Enterprise analytics integration',
      'Real-time monitoring dashboards',
    ],
    tech: ['HES Architecture', 'DLMS/COSEM', 'Kafka', 'SAP Integration', 'Grafana'],
    metrics: { meters: '200K+', latency: '<100ms', coverage: '100%' },
  },
  {
    id: 'ewa',
    title: 'Head-End System Upgrade — EWA (Bahrain)',
    category: 'Data Streaming Optimization',
    period: '2024',
    description: 'Spearheaded a major infrastructure upgrade by modernizing the Apache Kafka architecture to optimize data streaming performance. Designed and implemented custom Grafana dashboards, drastically improving real-time data availability visibility and monitoring for the client.',
    impact: [
      'Kafka architecture modernization',
      'Custom Grafana dashboards',
      'Real-time data visibility',
      'Streaming performance optimization',
      'Operational monitoring enhancement',
    ],
    tech: ['Apache Kafka', 'Grafana', 'Linux', 'Data Streaming', 'Monitoring'],
    metrics: { throughput: '5M+/min', latency: '<50ms', dashboards: '15+' },
  },
  {
    id: 'ke-purging',
    title: 'In-House Database Purging — K Electric',
    category: 'Database Optimization',
    period: '2023-2024',
    description: 'Executed a high-impact data purging workflow in compliance with corporate retention policies, recovering 30% storage space and saving approximately 2.2 million PKR in operational costs. Rebuilt indexes and removed obsolete data to enhance database security and speed.',
    impact: [
      '30% storage recovery',
      '2.2M PKR cost savings',
      'Index rebuilding',
      'Security enhancement',
      'Performance optimization',
    ],
    tech: ['SQL Server', 'Database Admin', 'Automation', 'Retention Policies', 'Indexing'],
    metrics: { storage: '30%↑', savings: '2.2M PKR', speed: '35%↑' },
  },
  {
    id: 'ke-hes',
    title: 'ISKRA Head-End System Upgrade — K Electric',
    category: 'System Migration',
    period: '2023-2024',
    description: 'Authored the SOW, designed the target architecture, managed system migration, integrated database replication schemes, and supervised Iskraemeco HES deployment with MDMS web integrations. Achieved 99.9% data availability and enhanced DB performance by 35%.',
    impact: [
      'SOW & architecture design',
      'System migration management',
      'Database replication integration',
      'MDMS web integrations',
      '99.9% data availability',
    ],
    tech: ['Iskraemeco HES', 'MDMS', 'Database Replication', 'Migration', 'SAP'],
    metrics: { availability: '99.9%', perf: '35%↑', migration: 'Zero-downtime' },
  },
  {
    id: 'ke-apn',
    title: 'APN Standardization for AMR — K Electric',
    category: 'Telecom Optimization',
    period: '2023-2024',
    description: 'Unified APN configurations across all meters via automated job schedules in coordination with telecom partners. Optimized push topologies using DLMS-compliant job configurations on Iskraemeco HES, reducing listener service overhead by 40%.',
    impact: [
      'APN unification across meters',
      'Automated job scheduling',
      'DLMS-compliant optimization',
      '40% overhead reduction',
      'Telecom partner coordination',
    ],
    tech: ['DLMS/COSEM', 'APN Config', 'Automation', 'Telecom Integration', 'HES'],
    metrics: { overhead: '40%↓', meters: '1M+', partners: '3' },
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div
      className="card-glass p-6 md:p-8 rounded-2xl relative overflow-hidden group h-full flex flex-col"
      whileHover={{ y: -8, boxShadow: '0 30px 60px -15px rgba(0, 212, 170, 0.2)' }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity" 
        style={{ background: `linear-gradient(135deg, ${hovered ? '#00d4aa' : '#0099ff'}10, transparent)` }} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block"
              style={{ background: 'rgba(0, 212, 170, 0.1)', color: '#00d4aa', border: '1px solid rgba(0, 212, 170, 0.2)' }}>
              {project.category}
            </span>
            <h3 className="text-xl font-bold mb-1 group-hover:text-[#00d4aa] transition-colors">{project.title}</h3>
            <span className="text-sm text-slate-400">{project.period}</span>
          </div>
        </div>
        
        <p className="text-slate-300 mb-6 flex-1 leading-relaxed text-sm md:text-base">{project.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="p-3 rounded-xl" style={{ background: 'rgba(0, 212, 170, 0.05)', border: '1px solid rgba(0, 212, 170, 0.1)' }}>
              <div className="text-2xl font-bold" style={{ color: '#00d4aa' }}>{value}</div>
              <div className="text-xs text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span key={i} className="px-2 py-1 rounded text-xs font-medium"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.05)' }}>
              {t}
            </span>
          ))}
        </div>
        
        <div className="pt-4 border-t border-slate-800/50">
          <h4 className="text-sm font-medium mb-3 text-slate-300">Key Outcomes</h4>
          <ul className="space-y-2">
            {project.impact.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="flex items-center gap-2 text-sm text-slate-400"
              >
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#00d4aa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ ref }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (ref && containerRef.current) {
      ref.current = containerRef.current
    }
  }, [ref])

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative py-24 px-6 lg:py-32"
      aria-label="Projects section"
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
            Key Projects
          </span>
          <h2 className="section-title mt-4">Major Deliveries & Milestones</h2>
          <p className="section-subtitle mx-auto mt-4">
            High-impact projects across AMI, smart metering, data infrastructure, and system modernization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            { label: 'FYP Competition', desc: '3rd Prize — Geeks\'17 Final Year Project', icon: '🥉' },
            { label: 'BITS Presidency', desc: 'Led 25-member executive team bridging industry-academia', icon: '👑' },
            { label: 'Rotaract Leadership', desc: 'District Secretary, Rotary International District 3271', icon: '🤝' },
          ].map((achievement, i) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="card-glass p-6 rounded-2xl text-center group"
            >
              <span className="text-4xl mb-3 block">{achievement.icon}</span>
              <h4 className="font-semibold mb-1 group-hover:text-[#00d4aa] transition-colors">{achievement.label}</h4>
              <p className="text-sm text-slate-400">{achievement.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}