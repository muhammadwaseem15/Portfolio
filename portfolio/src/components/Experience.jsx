import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

const experiences = [
  {
    id: 'iskraemeco',
    company: 'Iskraemeco Middle East',
    role: 'Senior Solution Engineer (Advanced Metering Infrastructure)',
    period: 'Sep 2024 — Present',
    location: 'Middle East (UAE, Bahrain)',
    description: 'Lead the end-to-end delivery, design, and optimization of Advanced Metering Infrastructure (AMI) and smart metering solutions for enterprise utility frameworks. Act as the primary technical expert bridging telecommunications infrastructure, Head-End Systems (HES), and high-throughput data environments.',
    achievements: [
      { title: 'Head-End System Upgrade | TAQA (Abu Dhabi)', desc: 'Led complex software platform upgrade to Symbiot Configurator v3.18. Implemented advanced customer use cases for robust reporting, enhancing device lifecycle, data availability, and theft protection.' },
      { title: 'Head-End System Deployment | DEWA (Dubai)', desc: 'Engineered and deployed complete HES architecture. Structured end-to-end communication matrix and created functional enterprise use cases for smart water metering infrastructure and analytics.' },
      { title: 'Head-End System Upgrade | EWA (Bahrain)', desc: 'Modernized Apache Kafka architecture to optimize data streaming performance. Designed custom Grafana dashboards, drastically improving real-time data availability visibility and monitoring.' },
    ],
    tech: ['Apache Kafka', 'Linux', 'Grafana', 'Symbiot Configurator', 'MDMS', 'SAP Integration', 'DLMS/COSEM'],
  },
  {
    id: 'kelectric',
    company: 'K Electric - KESC',
    role: 'Project Manager (DM Projects, AMI and Smart Grid Systems/Software)',
    period: 'Jan 2023 — Sep 2024',
    location: 'Karachi, Pakistan',
    description: 'Oversaw the HES (Head End System) gateway processing millions of instructions every minute. Successfully maintained data availability at 99% to drive the end-to-end billing cycle.',
    achievements: [
      { title: 'In-House Database Purging Activity', desc: 'Executed high-impact data purging workflow compliant with retention policies, recovering 30% storage space and saving ~2.2M PKR. Rebuilt indexes and removed obsolete data enhancing security and speed.' },
      { title: 'ISKRA Head-End System Upgrade', desc: 'Authored SOW, designed target architecture, managed system migration, integrated database replication, supervised HES deployment with MDMS web integrations. Achieved 99.9% data availability and 35% DB performance boost.' },
      { title: 'Standardization of Access Points for AMR', desc: 'Unified APN configurations across all meters via automated job schedules with telecom partners. Optimized push topologies using DLMS-compliant job configurations, reducing listener service overhead by 40%.' },
      { title: 'Centralized Backup Repository', desc: 'Engineered centralized backup infrastructure for KE HES utilizing Dell Networker, slashing full database backup windows by 80% while increasing data security and integrity.' },
    ],
    tech: ['QlikView', 'ETL', 'Grafana', 'SolarWinds', 'JIRA', 'MS Project', 'SQL', 'Dell Networker', 'DLMS/COSEM'],
  },
  {
    id: 'zong',
    company: 'Zong CMPAK (China Mobile)',
    role: 'Associate Site Acquisition Engineer',
    period: 'Jul 2021 — Dec 2022',
    location: 'Pakistan',
    description: 'Acquired new telecom sites for newly released nominal network positions. Executed infrastructure dismantling and relocation projects yielding 20% operational cost reduction and 40% increase in localized revenue.',
    achievements: [
      { title: 'Network Expansion Program', desc: 'Supervised execution of 3G and 4G technology upgrades and network expansion efforts spanning over 1,390 infrastructure sites.' },
      { title: 'Executive Project Visualization', desc: 'Maintained executive project visualizations using Power BI, JIRA Atlassian, and advanced MS Excel dashboards to track complex deployment schedules.' },
    ],
    tech: ['Power BI', 'JIRA', 'MS Excel', 'Site Acquisition', 'Telecom Infrastructure', '3G/4G Upgrades'],
  },
  {
    id: 'zte',
    company: 'ZTE Technologies',
    role: 'Base Station Service Engineer',
    period: 'Jan 2019 — Jun 2021',
    location: 'Pakistan (Southern Region)',
    description: 'Commissioned new LTE sites throughout the southern regional network of the PTCL wireless division using BS8900 BTS hardware. Acted as Level-3 (L3) technical support to diagnose critical network anomalies and execute formal Root Cause Analysis (RCA).',
    achievements: [
      { title: 'FTP Server Engineering Initiative', desc: 'Re-commissioned deprecated legacy hardware into a high-efficiency FTP server. Mitigated performance tracking bottlenecks, guaranteed uninterrupted network statistics reporting, minimized resource footprints, saved 15% in capital hardware costs, and boosted reporting throughput by 20%.' },
      { title: 'Massive MIMO Deployment', desc: 'Controlled massive MIMO deployment initiatives focused on RF optimization and rapid fault rectification.' },
      { title: 'Microwave Transmission Optimization', desc: 'Troubleshot and optimized microwave transmission infrastructure (NR8120 & NR8150) to preserve high transmission uptime.' },
    ],
    tech: ['BS8900 BTS', 'LTE/4G', 'Microwave (NR8120/NR8150)', 'Massive MIMO', 'RF Optimization', 'Root Cause Analysis', 'FTP Server Engineering'],
  },
]

export default function Experience({ ref }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (ref && containerRef.current) {
      ref.current = containerRef.current
    }
  }, [ref])

  return (
    <section 
      ref={containerRef}
      id="experience" 
      className="relative py-24 px-6 lg:py-32"
      aria-label="Experience section"
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
            Career Journey
          </span>
          <h2 className="section-title mt-4">Professional Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, #00d4aa, #0099ff, #6366f1)' }} />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="relative pl-16"
              >
                <div className="absolute left-6 top-2 w-4 h-4 rounded-full border-4 flex-shrink-0"
                  style={{ 
                    background: '#0a0f1a',
                    borderColor: index === 0 ? '#00d4aa' : 'rgba(0, 212, 170, 0.3)',
                    boxShadow: index === 0 ? '0 0 0 4px rgba(0, 212, 170, 0.2)' : 'none',
                  }}
                />
                
                <motion.div
                  className="card-glass p-6 md:p-8 rounded-2xl group"
                  whileHover={{ y: -4, boxShadow: '0 25px 50px -12px rgba(0, 212, 170, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-lg font-medium" style={{ color: '#00d4aa' }}>{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end text-right md:flex-row md:items-center gap-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium border"
                        style={{ 
                          background: 'rgba(0, 212, 170, 0.1)',
                          borderColor: 'rgba(0, 212, 170, 0.3)',
                          color: '#00d4aa',
                        }}>
                        {exp.period}
                      </span>
                      <span className="text-sm text-slate-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 2 16.5 3.5 17.657 4.657A8 8 0 116.343 18.657z" />
                        </svg>
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">{exp.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 * i }}
                        className="p-4 rounded-xl border-l-4 transition-all"
                        style={{ 
                          background: 'rgba(0, 212, 170, 0.05)',
                          borderColor: 'rgba(0, 212, 170, 0.3)',
                        }}
                      >
                        <h4 className="font-semibold mb-1 group-hover:text-[#00d4aa] transition-colors">{achievement.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{achievement.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.02 * i }}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          background: 'rgba(0, 212, 170, 0.1)',
                          borderColor: 'rgba(0, 212, 170, 0.2)',
                          color: '#00d4aa',
                          border: '1px solid rgba(0, 212, 170, 0.2)',
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}