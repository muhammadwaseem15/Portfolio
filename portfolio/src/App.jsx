import { Canvas } from '@react-three/fiber'
import { Stars, Html, useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThreeBackground from './components/ThreeBackground'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const sectionRefs = useRef({
    hero: null,
    about: null,
    experience: null,
    skills: null,
    projects: null,
    contact: null
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen">
      <div className="canvas-container">
        <ThreeBackground />
        
        <div className="glow-orb orb-1" aria-hidden="true" />
        <div className="glow-orb orb-2" aria-hidden="true" />
        <div className="glow-orb orb-3" aria-hidden="true" />
      </div>

      <Navbar 
        scrolled={scrolled} 
        onNavClick={scrollTo}
        refs={sectionRefs}
      />

      <main className="content-layer">
        <Hero ref={sectionRefs.current.hero} />
        <About ref={sectionRefs.current.about} />
        <Experience ref={sectionRefs.current.experience} />
        <Skills ref={sectionRefs.current.skills} />
        <Projects ref={sectionRefs.current.projects} />
        <Contact ref={sectionRefs.current.contact} />
      </main>

      <Footer />
    </div>
  )
}

export default App