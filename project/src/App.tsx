"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"
import {
  Code2,
  Code,
  Component,
  Flame,
  // Palette,
  Smartphone,
  Database,
  Globe,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Briefcase,
  ArrowRight,
  Send,
  Download,
  Menu,
  X,
  Star,
  Zap,
  Cpu,
  // Layers,
  Sparkles,
  Award,
  Users,
  Coffee,
  Heart,
  CheckCircle,
  AlertCircle,
  Brain,
  Search,
  MessageSquare,
  Link,
  Monitor,
  Tablet,
  GitBranch,
} from "lucide-react"

import { FileCode, Layers, Palette, Server, Cloud, Container, Settings, Bot, Network, BookOpen, Workflow } from 'lucide-react';
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true)
          setHasAnimated(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px",
        ...options,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, options])

  return [ref, isIntersecting] as const
}
const useCounter = (end: number, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, shouldStart])

  return count
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formMessage, setFormMessage] = useState("")

  // Animation refs
  const [heroRef, heroInView] = useIntersectionObserver()
  const [aboutRef, aboutInView] = useIntersectionObserver()
  const [experienceRef, experienceInView] = useIntersectionObserver()
  const [skillsRef, skillsInView] = useIntersectionObserver()
  const [projectsRef, projectsInView] = useIntersectionObserver()
  const [contactRef, contactInView] = useIntersectionObserver()
  const [statsRef, statsInView] = useIntersectionObserver()
  const projectsCount = useCounter(15, 2000, statsInView)
  const clientsCount = useCounter(15, 2000, statsInView)
  const yearsCount = useCounter(2, 2000, statsInView)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ["hero", "about", "experience", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleResumeDownload = () => {
  const link = document.createElement("a")
  link.href = "/Tazeen SE.pdf"
  link.download = "Tazeen SE.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("loading")
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (response.ok) {
        setFormStatus("success")
        setFormMessage("Thank you! Your message has been sent successfully.")
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setFormStatus("error")
      setFormMessage("Sorry, there was an error sending your message. Please try again.")
    }
    setTimeout(() => {
      setFormStatus("idle")
      setFormMessage("")
    }, 5000)
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <div className="logo-cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>
          <div className="loading-text">
            <span>T</span>
            <span>A</span>
            <span>Z</span>
            <span>E</span>
            <span>E</span>
            <span>N</span>
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="portfolio">
      <div
        className="custom-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      <div className="particle-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-3d">TA</div>
          </div>
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            {["hero", "about", "experience", "skills", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section === "hero" ? "Home" : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <section id="hero" className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="floating-shapes">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`shape shape-${(i % 5) + 1} ${heroInView ? "animate-in" : ""}`}
                style={{
                  transform: `translateY(${scrollY * 0.1 * ((i % 3) + 1)}px) rotateZ(${scrollY * 0.05}deg)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
          <div className="hero-gradient-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className={`hero-text ${heroInView ? "slide-in-left" : ""}`}>
            <h1 className="hero-title">
              <span className="title-line">Hi, I'm</span>
              <span className="title-name">Tazeen Amir</span>
              <span className="title-role">Software Engineer</span>
            </h1>
            <p className="hero-description">
              Crafting exceptional digital experiences with cutting-edge technology and innovative design solutions.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection("projects")}>
                View My Work
                <ArrowRight className="btn-icon" />
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection("contact")}>
                Get In Touch
              </button>
            </div>
          </div>
          <div className={`hero-visual ${heroInView ? "slide-in-right" : ""}`}>
            <div className="hero-3d-scene">
              <div
                className={`floating-card card-1 ${heroInView ? "float-in" : ""}`}
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px) rotateX(${scrollY * 0.02}deg) rotateY(${scrollY * 0.01}deg)`,
                  animationDelay: "0.2s",
                }}
              >
                <div className="card-content">
                  <Code2 className="card-icon" />
                  <span>Full Stack Developer</span>
                </div>
              </div>
              <div
                className={`floating-card card-2 ${heroInView ? "float-in" : ""}`}
                style={{
                  transform: `translateY(${Math.cos(scrollY * 0.01) * 15}px) rotateX(${-scrollY * 0.01}deg) rotateY(${scrollY * 0.02}deg)`,
                  animationDelay: "0.4s",
                }}
              >
                <div className="card-content">
                  <Palette className="card-icon" />
                  <span>UI/UX Designer</span>
                </div>
              </div>
              <div
                className={`floating-card card-3 ${heroInView ? "float-in" : ""}`}
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.015) * 12}px) rotateX(${scrollY * 0.015}deg) rotateY(${-scrollY * 0.01}deg)`,
                  animationDelay: "0.6s",
                }}
              >
                <div className="card-content">
                  <Smartphone className="card-icon" />
                  <span>AI Engineer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection("about")}>
          <ChevronDown className="scroll-icon" />
        </div>
      </section>
      <section id="about" className="about" ref={aboutRef}>
        <div className="section-bg-effects">
          <div className="floating-elements">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`floating-element element-${(i % 4) + 1} ${aboutInView ? "animate-in" : ""}`}
                style={{
                  left: `${10 + i * 6}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="container">
          <div className={`section-header ${aboutInView ? "fade-in-up" : ""}`}>
            <div className="section-badge">
              <Sparkles className="badge-icon" />
              <span>About Me</span>
            </div>
            <h2 className="section-title">Passionate Developer & Creative Thinker</h2>
            <p className="section-subtitle">
              Transforming ideas into exceptional digital experiences through innovation and expertise
            </p>
          </div>
          <div className="about-content">
            <div className={`about-left ${aboutInView ? "slide-in-left" : ""}`}>
              <div className="profile-showcase">
                <div className="profile-card-3d">
                  <div className="profile-image-container">
                    <div className="profile-image">
                      <div className="avatar-placeholder">
                        <div
  style={{
    width: '300vw',              // Scales with viewport width
    maxWidth: '200px',          // Limits max size
    aspectRatio: '1 / 1',       // Keeps it a perfect circle
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <img
    src="/profile.jpg"
    alt="User Avatar"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
</div>

                      </div>
                      <div className="profile-ring"></div>
                      <div className="profile-glow"></div>
                    </div>
                    <div className="floating-badges">
                      <div
                        className={`badge badge-1 ${aboutInView ? "float-in" : ""}`}
                        style={{ animationDelay: "0.5s" }}
                      >
                        {/* <Award className="badge-icon" />
                        <span>2+ Years</span> */}
                      </div>
                      <div
                        className={`badge badge-2 ${aboutInView ? "float-in" : ""}`}
                        style={{ animationDelay: "0.7s" }}
                      >
                        {/* <Users className="badge-icon" />
                        <span>15+ Projects</span> */}
                      </div>
                      <div
                        className={`badge badge-3 ${aboutInView ? "float-in" : ""}`}
                        style={{ animationDelay: "0.9s" }}
                      >
                        {/* <Coffee className="badge-icon" />
                        <span>∞ Coffee</span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stats-showcase" ref={statsRef}>
                  <div className={`stat-card ${statsInView ? "scale-in" : ""}`} style={{ animationDelay: "0.1s" }}>
                    <div className="stat-icon">
                      <Zap className="icon" />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{projectsCount}+</div>
                      <div className="stat-label">Projects Delivered</div>
                    </div>
                  </div>
                  <div className={`stat-card ${statsInView ? "scale-in" : ""}`} style={{ animationDelay: "0.2s" }}>
                    <div className="stat-icon">
                      <Heart className="icon" />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{clientsCount}+</div>
                      <div className="stat-label">Happy Clients</div>
                    </div>
                  </div>
                  <div className={`stat-card ${statsInView ? "scale-in" : ""}`} style={{ animationDelay: "0.3s" }}>
                    <div className="stat-icon">
                      <Star className="icon" />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{yearsCount}+</div>
                      <div className="stat-label">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`about-right ${aboutInView ? "slide-in-right" : ""}`}>
              <div className="about-story">
                <div
                  className={`story-card primary ${aboutInView ? "fade-in-up" : ""}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="card-header">
                    <div className="card-icon">
                      <Cpu className="icon" />
                    </div>
                    <h3>Technical Excellence</h3>
                  </div>
                  <p>
                   I’m a final-year Software Engineering student at NED University with hands-on experience in full-stack development using React.js, Next.js, TypeScript, Node.js, and Express.js. I also work with AI agents using LangChain, combining solid development practices with emerging technologies to build scalable and efficient solutions.
                  </p>
                </div>
                <div
                  className={`story-card secondary ${aboutInView ? "fade-in-up" : ""}`}
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="card-header">
                    <div className="card-icon">
                      <Layers className="icon" />
                    </div>
                    <h3>Creative Innovation</h3>
                  </div>
                  <p>
                    I blend technical skills with creative thinking to build responsive, user-focused interfaces and intelligent features. From clean UI design to AI-powered interactions, I strive to create digital products that are both functional and future-ready.


                  </p>
                </div>
                <div
                  className={`story-card accent ${aboutInView ? "fade-in-up" : ""}`}
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="card-header">
                    <div className="card-icon">
                      <Globe className="icon" />
                    </div>
                    <h3>Global Impact</h3>
                  </div>
                  <p>
                    I’ve contributed to diverse client projects with real-world impact, developing solutions that are scalable, collaborative, and globally relevant. My ability to adapt and learn quickly helps me deliver meaningful results across industries and platforms.


                  </p>
                </div>
              </div>
              <div className={`resume-section ${aboutInView ? "fade-in-up" : ""}`} style={{ animationDelay: "0.8s" }}>
                <button className="resume-btn" onClick={handleResumeDownload}>
                  <div className="btn-content">
                    <Download className="btn-icon" />
                    <span>Download Resume</span>
                  </div>
                  <div className="btn-glow"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Compact Experience Section */}
      <section id="experience" className="experience-compact" ref={experienceRef}>
        <div className="container">
          <div className={`section-header ${experienceInView ? "fade-in-up" : ""}`}>
            <div className="section-badge">
              <Briefcase className="badge-icon" />
              <span>Professional Journey</span>
            </div>
            <h2 className="section-title">Experience Highlights</h2>
            <p className="section-subtitle">Key milestones in my software development career</p>
          </div>
          <div className="experience-grid">
            <div
              className={`experience-card current ${experienceInView ? "slide-in-up" : ""}`}
              style={{ animationDelay: "0.1s" }}
            >
              <div className="card-header">
                <div className="company-logo">
                  <Briefcase className="logo-icon" />
                </div>
                <div className="job-badge current">Current</div>
</div>
<div className="job-details">
  <h3 className="job-title">Workflow Automation Engineer</h3>
  <div className="company-name">Mavikk</div>
  <div className="job-period">July 2025 - Present | Remote</div>
</div>

<div className="job-highlights">
  <div className="highlight-item">
    <Star className="highlight-icon" />
    <span>Built intelligent automation workflows in n8n</span>
  </div>
  <div className="highlight-item">
    <Zap className="highlight-icon" />
    <span>Integrated APIs, Airtable, databases & third-party services</span>
  </div>
  <div className="highlight-item">
    <Award className="highlight-icon" />
    <span>Streamlined processes & reduced manual effort</span>
  </div>
</div>

<div className="tech-stack-mini">
  <span className="tech-pill">n8n</span>
  <span className="tech-pill">Airtable</span>
  <span className="tech-pill">API Integration</span>
  <span className="tech-pill">Workflow Automation</span>
  <span className="tech-pill">Databases</span>
</div>

            </div>
            <div
              className={`experience-card ${experienceInView ? "slide-in-up" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="card-header">
                <div className="company-logo">
                  <Code2 className="logo-icon" />
                </div>
                <div className="job-badge">Previous</div>
              </div>
              <div className="job-details">
  <h3 className="job-title">Web Developer Intern</h3>
  <div className="company-name">Acom Corp</div>
  <div className="job-period">April 2025 – June 2025 | Karachi, Pakistan</div>
</div>
              <div className="job-highlights">
  <div className="highlight-item">
    <Star className="highlight-icon" />
    <span>Built full-stack web features using React, Next.js, and MySQL</span>
  </div>
  <div className="highlight-item">
    <Zap className="highlight-icon" />
    <span>Ensured efficient data flow and smooth user interactions</span>
  </div>
  <div className="highlight-item">
    <Award className="highlight-icon" />
    <span>Developed scalable backend APIs with Node.js & Express</span>
  </div>
</div>
              <div className="tech-stack-mini">
  <span className="tech-pill">React</span>
  <span className="tech-pill">Next.js</span>
  <span className="tech-pill">Node.js</span>
  <span className="tech-pill">Express</span>
  <span className="tech-pill">MySQL</span>
</div>
            </div>
            <div
              className={`experience-card ${experienceInView ? "slide-in-up" : ""}`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="card-header">
                <div className="company-logo">
                  <Smartphone className="logo-icon" />
                </div>
                <div className="job-badge">Early Career</div>
              </div>
              <div className="job-details">
  <h3 className="job-title">Web Developer Intern</h3>
  <div className="company-name">Quality Enhancement Cell (QEC) – NED</div>
  <div className="job-period">Feb 2024 – Jun 2024 | Karachi, Pakistan</div>
</div>
              <div className="job-highlights">
  <div className="highlight-item">
    <Star className="highlight-icon" />
    <span>Collaborated with team on QEC portal project using Node.js & Express.js</span>
  </div>
  <div className="highlight-item">
    <Zap className="highlight-icon" />
    <span>Created automated workflows to replace manual processes</span>
  </div>
  <div className="highlight-item">
    <Award className="highlight-icon" />
    <span>Enhanced accuracy and efficiency in internal operations</span>
  </div>
</div>
            <div className="tech-stack-mini">
              <span className="tech-pill">React.js</span>
  <span className="tech-pill">Node.js</span>
  <span className="tech-pill">Express.js</span>
  <span className="tech-pill">Workflow Automation</span>
  <span className="tech-pill">Team Collaboration</span>
</div>
            </div>
          </div>
        </div>
      </section>
     {/* i?mport { Code2?, FileCode, Palette, Component, Layers, Zap, Database, Server, Code, Globe, Flame, Brain, Link, Search, Settings, MessageSquare, Cpu, Smartphone, Monitor, Tablet, Cloud, Container, GitBranch } from 'lucide-react'; */}

<section
  id="skills"
  className="skills relative overflow-hidden"
  ref={skillsRef}
>
  {/* Background Animated Grid */}
  <div className="skills-bg-effects absolute inset-0 pointer-events-none">
    <div className="tech-grid">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className={`tech-node node-${(i % 4) + 1} ${
            skillsInView ? "animate-in" : ""
          }`}
          style={{
            left: `${5 + i * 5}%`,
            top: `${10 + (i % 5) * 15}%`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  </div>

  {/* Section Content */}
  <div className="container relative z-10 px-4 md:px-8">
    {/* Header */}
    <div
      className={`section-header text-center ${
        skillsInView ? "fade-in-up" : ""
      }`}
    >
      <div className="section-badge flex justify-center items-center gap-2 mb-2">
        <Cpu className="badge-icon w-6 h-6 text-indigo-500" />
        <span className="text-lg font-semibold text-gray-100">
          Skills & Expertise
        </span>
      </div>
      <h2 className="section-title text-3xl md:text-4xl font-bold text-white">
        Technologies I Master
      </h2>
      <p className="section-subtitle text-gray-300 max-w-2xl mx-auto mt-2">
        A comprehensive toolkit for building exceptional digital experiences
      </p>
    </div>

    {/* Skills Grid */}
    <div className="skills-showcase mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* === Frontend + Backend Development === */}
      <div
        className={`skill-category-3d ${
          skillsInView ? "slide-in-left" : ""
        } transition-transform duration-500`}
      >
        <div className="category-header flex items-center gap-3 mb-4">
          <div className="category-icon-container relative">
            <Code2 className="category-icon w-8 h-8 text-indigo-400" />
            <div className="icon-glow absolute inset-0 bg-indigo-500/30 blur-lg rounded-full"></div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Frontend + Backend Development
            </h3>
            <p className="text-gray-300 text-sm">
              Creating full-stack, scalable web applications
            </p>
          </div>
        </div>

        <div className="skills-grid-3d grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: "React", icon: <Code2 />, level: "expert" },
            { name: "Next.js", icon: <Zap />, level: "advanced" },
            { name: "Node.js", icon: <Cpu />, level: "expert" },
            { name: "Express.js", icon: <Layers />, level: "expert" },
            { name: "FastAPI", icon: <Database />, level: "advanced" },
          ].map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-card ${
                skillsInView ? "scale-in" : ""
              } flex flex-col items-center p-3 rounded-xl bg-gray-800/70 backdrop-blur-md border border-gray-700 relative`}
              style={{
                animationDelay: `${0.2 + index * 0.1}s`,
                willChange: "transform",
              }}
            >
              <div className="skill-icon text-indigo-400 mb-2">
                {skill.icon}
              </div>
              <span className="skill-name text-sm text-white">
                {skill.name}
              </span>
              <div className="skill-level w-full h-1 bg-gray-600 rounded mt-2 overflow-hidden">
                <div
                  className={`level-bar ${skill.level} h-full bg-indigo-500`}
                  style={{
                    width:
                      skill.level === "expert"
                        ? "100%"
                        : skill.level === "advanced"
                        ? "75%"
                        : "50%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === AI & Machine Learning === */}
      <div
        className={`skill-category-3d ${
          skillsInView ? "slide-in-right" : ""
        } transition-transform duration-500`}
      >
        <div className="category-header flex items-center gap-3 mb-4">
          <div className="category-icon-container relative">
            <Brain className="category-icon w-8 h-8 text-purple-400" />
            <div className="icon-glow absolute inset-0 bg-purple-500/30 blur-lg rounded-full"></div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              AI & Machine Learning
            </h3>
            <p className="text-gray-300 text-sm">
              Intelligent systems and language models
            </p>
          </div>
        </div>

        <div className="skills-grid-3d grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: "LangChain", icon: <Link />, level: "advanced" },
            { name: "RAG Systems", icon: <Search />, level: "advanced" },
            { name: "Fine-tuning", icon: <Settings />, level: "intermediate" },
            { name: "LLM Integration", icon: <MessageSquare />, level: "expert" },
            { name: "OpenAI API", icon: <Cpu />, level: "expert" },
            { name: "N8N Automation", icon: <Database />, level: "advanced" },
          ].map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-card ${
                skillsInView ? "scale-in" : ""
              } flex flex-col items-center p-3 rounded-xl bg-gray-800/70 backdrop-blur-md border border-gray-700 relative`}
              style={{
                animationDelay: `${0.3 + index * 0.1}s`,
                willChange: "transform",
              }}
            >
              <div className="skill-icon text-purple-400 mb-2">
                {skill.icon}
              </div>
              <span className="skill-name text-sm text-white">
                {skill.name}
              </span>
              <div className="skill-level w-full h-1 bg-gray-600 rounded mt-2 overflow-hidden">
                <div
                  className={`level-bar ${skill.level} h-full bg-purple-500`}
                  style={{
                    width:
                      skill.level === "expert"
                        ? "100%"
                        : skill.level === "advanced"
                        ? "75%"
                        : "50%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="projects" ref={projectsRef}>
        <div className="container">
          <div className={`section-header ${projectsInView ? "fade-in-up" : ""}`}>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Some of my recent work</p>
          </div>
          <div className="projects-grid">
            {[
              {
                title: "Elevate360",
                description:
                  "Elevate360 is an AI-powered platform that automates the entire SDLC, team management, and project payments via PayFast — boosting productivity, transparency, and efficiency.",
                tech: ["React", "Node.js", "MySQL","Express.js","MistralAI", "PayFast"],
                image: "/elevate.png",
                liveUrl: "https://ecommerce-demo.example.com",
                githubUrl: "https://github.com/ErajT/Elevate360/tree/tazeen",
              },
              {
                title: "Deliberative",
                description:
                  "Deliberative is a training management system that assesses how well trainees apply learned concepts in real life. Based on their implementation scores, a leaderboard is generated to measure training effectiveness.",
                tech: ["React.js", "MySQL", "Node.js","Express.js"],
                image: "/delib.png",
                liveUrl: "hhttps://deliberatives.com/",
                githubUrl: "https://github.com/ErajT/learn/tree/tazeen",
              },
              {
                title: "Learn Flow",
                description:
                  "Create collections, add notes, collaborate with peers, and generate flashcards. LearnFlow makes learning easier and more efficient than ever before.",
                tech: ["React.js", "RAG", "Firebase", "Express.js","Node.js"],
                image: "/learn1.png",
                liveUrl: "https://learn-flow-delta.vercel.app/",
                githubUrl: "https://github.com/ErajT/iba-hackathon/tree/tazeen",
              },
            ].map((project, index) => (
              <div
                key={project.title}
                className={`project-card ${projectsInView ? "slide-in-up" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} />
                  <div className="project-overlay">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn"
                      aria-label="View project"
                    >
                      <ExternalLink />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn"
                      aria-label="View code"
                    >
                      <Github />
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`projects-cta ${projectsInView ? "fade-in-up" : ""}`} style={{ animationDelay: "0.4s" }}>
            <a href="https://github.com/tazeenamir" target="_blank" rel="noopener noreferrer" className="view-more-btn">
              <div className="btn-content">
                <Github className="btn-icon" />
                <span>View More Projects</span>
              </div>
              <div className="btn-glow"></div>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="contact" ref={contactRef}>
        <div className="contact-bg-effects">
          <div className="contact-orbs">
            <div className="contact-orb orb-1"></div>
            <div className="contact-orb orb-2"></div>
            <div className="contact-orb orb-3"></div>
          </div>
          <div className="contact-grid">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`grid-item item-${(i % 3) + 1} ${contactInView ? "animate-in" : ""}`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="container">
          <div className={`section-header ${contactInView ? "fade-in-up" : ""}`}>
            <div className="section-badge">
              <Send className="badge-icon" />
              <span>Get In Touch</span>
            </div>
            <h2 className="section-title">Let's Create Something Amazing</h2>
            <p className="section-subtitle">Ready to bring your vision to life? Let's discuss your next project</p>
          </div>
          <div className="contact-content">
            <div className={`contact-info ${contactInView ? "slide-in-left" : ""}`}>
              <div className="contact-intro">
                <h3>Let's Connect</h3>
                <p>
                  I'm always excited to work on new projects and collaborate with amazing people. Whether you have a
                  project in mind or just want to chat about technology, I'd love to hear from you.
                </p>
              </div>
              <div className="contact-methods">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    value: "tazeenamir969@gmail.com",
                    note: "Best for detailed discussions",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    value: "+923366864869",
                    note: "Available Mon-Fri, 9AM-6PM PST",
                  },
                  {
                    icon: MapPin,
                    title: "Location",
                    value: "Karachi, Pakistan",
                    note: "Open to remote collaboration",
                  },
                ].map((method, index) => (
                  <div
                    key={method.title}
                    className={`contact-method ${contactInView ? "slide-in-left" : ""}`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="method-icon">
                      <method.icon className="icon" />
                      <div className="icon-glow"></div>
                    </div>
                    <div className="method-info">
                      <h4>{method.title}</h4>
                      <p>{method.value}</p>
                      <span className="method-note">{method.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`contact-form-container ${contactInView ? "slide-in-right" : ""}`}>
              <div className="form-header">
                <h3>Send Me a Message</h3>
                <p>Fill out the form below and I'll get back to you within 24 hours</p>
              </div>
              {formMessage && (
                <div className={`form-message ${formStatus}`}>
                  {formStatus === "success" ? (
                    <CheckCircle className="message-icon" />
                  ) : (
                    <AlertCircle className="message-icon" />
                  )}
                  <span>{formMessage}</span>
                </div>
              )}
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required />
                    <div className="input-glow"></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required />
                    <div className="input-glow"></div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Project Discussion" required />
                  <div className="input-glow"></div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or idea..."
                    rows={6}
                    required
                  ></textarea>
                  <div className="input-glow"></div>
                </div>
                <button type="submit" className="submit-btn" disabled={formStatus === "loading"}>
                  <div className="btn-content">
                    <Send className="btn-icon" />
                    <span>{formStatus === "loading" ? "Sending..." : "Send Message"}</span>
                  </div>
                  <div className="btn-particles">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`particle particle-${i + 1}`} />
                    ))}
                  </div>
                  <div className="btn-glow"></div>
                </button>
              </form>
            </div>
          </div>
          <div
  className={`social-connect ${contactInView ? "fade-in-up" : ""}`}
  style={{
    animationDelay: "0.5s",
    textAlign: "center",
    marginTop: "2rem",
    width: "100%",
  }}
>
  <h4
    style={{
      color: "#fff",
      marginBottom: "1rem",
      fontSize: "1.25rem",
      fontWeight: "600",
    }}
  >
    Connect With Me
  </h4>

  <div
    className="social-links"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.8rem",
      flexWrap: "nowrap", // Force one row only
      transform: "scale(1)", // Default scale
    }}
  >
    {/* === GitHub === */}
    <a
      href="https://github.com/tazeenamir"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link github"
      aria-label="GitHub"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "rgba(255, 255, 255, 0.05)",
        padding: "0.5rem 0.9rem",
        borderRadius: "8px",
        fontSize: "0.95rem",
        color: "#fff",
        transition: "transform 0.2s ease, background 0.3s ease",
        whiteSpace: "nowrap",
        minWidth: "80px",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")
      }
    >
      <Github style={{ width: "18px", height: "18px" }} />
      <span>GitHub</span>
    </a>

    {/* === LinkedIn === */}
    <a
      href="https://www.linkedin.com/in/tazeen-amir-092812252/"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link linkedin"
      aria-label="LinkedIn"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "rgba(255, 255, 255, 0.05)",
        padding: "0.5rem 0.9rem",
        borderRadius: "8px",
        fontSize: "0.95rem",
        color: "#fff",
        transition: "transform 0.2s ease, background 0.3s ease",
        whiteSpace: "nowrap",
        minWidth: "80px",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")
      }
    >
      <Linkedin style={{ width: "18px", height: "18px" }} />
      <span>LinkedIn</span>
    </a>

    {/* === Resume Button === */}
    <button
      className="social-link resume"
      onClick={handleResumeDownload}
      aria-label="Download Resume"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "rgba(255, 255, 255, 0.05)",
        padding: "0.5rem 0.9rem",
        borderRadius: "8px",
        fontSize: "0.95rem",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease, background 0.3s ease",
        whiteSpace: "nowrap",
        minWidth: "80px",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")
      }
    >
      <Download style={{ width: "18px", height: "18px" }} />
      <span>Resume</span>
    </button>
  </div>
</div>

        </div>
        
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">
                <div className="logo-3d">TA</div>
              </div>
              <p>Building the future, one line of code at a time.</p>
            </div>
            <div className="footer-right">
              <p>&copy; 2024 Tazeen Amir. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio
