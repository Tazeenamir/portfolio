"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"
import {
  Code2,
  Palette,
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
  Layers,
  Sparkles,
  Award,
  Users,
  Coffee,
  Heart,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

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
  const projectsCount = useCounter(50, 2000, statsInView)
  const clientsCount = useCounter(30, 2000, statsInView)
  const yearsCount = useCounter(5, 2000, statsInView)

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
    link.href = "/placeholder.svg?height=800&width=600"
    link.download = "Tazeen_Amir_Resume.pdf"
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
      const response = await fetch("http://localhost:5000/api/contact", {
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
                  <span>Mobile Developer</span>
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
    width: '40vw',              // Scales with viewport width
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
                        <Award className="badge-icon" />
                        <span>5+ Years</span>
                      </div>
                      <div
                        className={`badge badge-2 ${aboutInView ? "float-in" : ""}`}
                        style={{ animationDelay: "0.7s" }}
                      >
                        <Users className="badge-icon" />
                        <span>50+ Projects</span>
                      </div>
                      <div
                        className={`badge badge-3 ${aboutInView ? "float-in" : ""}`}
                        style={{ animationDelay: "0.9s" }}
                      >
                        <Coffee className="badge-icon" />
                        <span>∞ Coffee</span>
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
                    I'm a passionate software engineer with 5+ years of experience crafting digital solutions that make
                    a real impact. My expertise spans full-stack development, with deep knowledge of modern frameworks
                    and cutting-edge technologies.
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
                    My approach combines technical precision with creative thinking. I believe in writing clean,
                    maintainable code while delivering exceptional user experiences that exceed expectations and drive
                    business growth.
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
                    From startups to enterprise solutions, I've helped businesses across the globe transform their
                    digital presence. Every project is an opportunity to push boundaries and create something
                    extraordinary.
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
                <h3 className="job-title">Senior Software Engineer</h3>
                <div className="company-name">TechCorp Inc.</div>
                <div className="job-period">2022 - Present</div>
              </div>
              <div className="job-highlights">
                <div className="highlight-item">
                  <Star className="highlight-icon" />
                  <span>Led team of 5 developers</span>
                </div>
                <div className="highlight-item">
                  <Zap className="highlight-icon" />
                  <span>40% performance improvement</span>
                </div>
                <div className="highlight-item">
                  <Award className="highlight-icon" />
                  <span>Microservices architecture</span>
                </div>
              </div>
              <div className="tech-stack-mini">
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">AWS</span>
                <span className="tech-pill">Docker</span>
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
                <h3 className="job-title">Full Stack Developer</h3>
                <div className="company-name">StartupXYZ</div>
                <div className="job-period">2020 - 2022</div>
              </div>
              <div className="job-highlights">
                <div className="highlight-item">
                  <Users className="highlight-icon" />
                  <span>100K+ daily users</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle className="highlight-icon" />
                  <span>15+ client projects</span>
                </div>
                <div className="highlight-item">
                  <Cpu className="highlight-icon" />
                  <span>50% performance boost</span>
                </div>
              </div>
              <div className="tech-stack-mini">
                <span className="tech-pill">Vue.js</span>
                <span className="tech-pill">Python</span>
                <span className="tech-pill">PostgreSQL</span>
                <span className="tech-pill">GraphQL</span>
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
                <h3 className="job-title">Mobile App Developer</h3>
                <div className="company-name">MobileFirst Agency</div>
                <div className="job-period">2019 - 2020</div>
              </div>
              <div className="job-highlights">
                <div className="highlight-item">
                  <Star className="highlight-icon" />
                  <span>4.8+ App Store ratings</span>
                </div>
                <div className="highlight-item">
                  <Smartphone className="highlight-icon" />
                  <span>8 mobile apps delivered</span>
                </div>
                <div className="highlight-item">
                  <Zap className="highlight-icon" />
                  <span>85% crash rate reduction</span>
                </div>
              </div>
              <div className="tech-stack-mini">
                <span className="tech-pill">React Native</span>
                <span className="tech-pill">TypeScript</span>
                <span className="tech-pill">Firebase</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="skills" className="skills" ref={skillsRef}>
        <div className="skills-bg-effects">
          <div className="tech-grid">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`tech-node node-${(i % 4) + 1} ${skillsInView ? "animate-in" : ""}`}
                style={{
                  left: `${5 + i * 4.5}%`,
                  top: `${10 + (i % 5) * 15}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="container">
          <div className={`section-header ${skillsInView ? "fade-in-up" : ""}`}>
            <div className="section-badge">
              <Cpu className="badge-icon" />
              <span>Skills & Expertise</span>
            </div>
            <h2 className="section-title">Technologies I Master</h2>
            <p className="section-subtitle">A comprehensive toolkit for building exceptional digital experiences</p>
          </div>
          <div className="skills-showcase">
            <div
              className={`skill-category-3d frontend ${skillsInView ? "slide-in-left" : ""}`}
              style={{ animationDelay: "0.1s" }}
            >
              <div className="category-header">
                <div className="category-icon-container">
                  <Code2 className="category-icon" />
                  <div className="icon-glow"></div>
                </div>
                <div className="category-info">
                  <h3>Frontend Development</h3>
                  <p>Creating beautiful, responsive user interfaces</p>
                </div>
              </div>
              <div className="skills-grid-3d">
                {[
                  { name: "React", icon: "⚛️", level: "expert" },
                  { name: "TypeScript", icon: "📘", level: "expert" },
                  { name: "Tailwind CSS", icon: "🎨", level: "advanced" },
                  { name: "Next.js", icon: "⚡", level: "advanced" },
                ].map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`skill-card ${skill.level} ${skillsInView ? "scale-in" : ""}`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-level">
                        <div className={`level-bar ${skill.level}`}></div>
                        <span className="level-text">{skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}</span>
                      </div>
                    </div>
                    <div className="skill-glow"></div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`skill-category-3d backend ${skillsInView ? "slide-in-right" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="category-header">
                <div className="category-icon-container">
                  <Database className="category-icon" />
                  <div className="icon-glow"></div>
                </div>
                <div className="category-info">
                  <h3>Backend Development</h3>
                  <p>Building robust, scalable server solutions</p>
                </div>
              </div>
              <div className="skills-grid-3d">
                {[
                  { name: "Node.js", icon: "🟢", level: "expert" },
                  { name: "Python", icon: "🐍", level: "advanced" },
                  { name: "PostgreSQL", icon: "🗄️", level: "advanced" },
                  { name: "Firebase", icon: "🔥", level: "intermediate" },
                ].map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`skill-card ${skill.level} ${skillsInView ? "scale-in" : ""}`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-level">
                        <div className={`level-bar ${skill.level}`}></div>
                        <span className="level-text">{skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}</span>
                      </div>
                    </div>
                    <div className="skill-glow"></div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`skill-category-3d mobile ${skillsInView ? "slide-in-left" : ""}`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="category-header">
                <div className="category-icon-container">
                  <Smartphone className="category-icon" />
                  <div className="icon-glow"></div>
                </div>
                <div className="category-info">
                  <h3>Mobile Development</h3>
                  <p>Cross-platform mobile applications</p>
                </div>
              </div>
              <div className="skills-grid-3d">
                {[
                  { name: "React Native", icon: "📱", level: "expert" },
                  { name: "Android", icon: "🤖", level: "intermediate" },
                  { name: "iOS", icon: "🍎", level: "intermediate" },
                  { name: "Flutter", icon: "🎯", level: "beginner" },
                ].map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`skill-card ${skill.level} ${skillsInView ? "scale-in" : ""}`}
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-level">
                        <div className={`level-bar ${skill.level}`}></div>
                        <span className="level-text">
                          {skill.level === "beginner"
                            ? "Learning"
                            : skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="skill-glow"></div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`skill-category-3d devops ${skillsInView ? "slide-in-right" : ""}`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="category-header">
                <div className="category-icon-container">
                  <Globe className="category-icon" />
                  <div className="icon-glow"></div>
                </div>
                <div className="category-info">
                  <h3>DevOps & Cloud</h3>
                  <p>Deployment and infrastructure management</p>
                </div>
              </div>
              <div className="skills-grid-3d">
                {[
                  { name: "AWS", icon: "☁️", level: "advanced" },
                  { name: "Docker", icon: "🐳", level: "advanced" },
                  { name: "Kubernetes", icon: "⚙️", level: "intermediate" },
                  { name: "CI/CD", icon: "🔄", level: "advanced" },
                ].map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`skill-card ${skill.level} ${skillsInView ? "scale-in" : ""}`}
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-level">
                        <div className={`level-bar ${skill.level}`}></div>
                        <span className="level-text">{skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}</span>
                      </div>
                    </div>
                    <div className="skill-glow"></div>
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
                title: "E-commerce Platform",
                description:
                  "Full-stack e-commerce solution with real-time inventory management and payment processing.",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                image: "/placeholder.svg?height=200&width=350",
                liveUrl: "https://ecommerce-demo.example.com",
                githubUrl: "https://github.com/tazeenamir/ecommerce-platform",
              },
              {
                title: "Task Management App",
                description:
                  "Collaborative project management tool with real-time updates and team collaboration features.",
                tech: ["Vue.js", "Socket.io", "PostgreSQL", "Redis"],
                image: "/placeholder.svg?height=200&width=350",
                liveUrl: "https://taskmanager-demo.example.com",
                githubUrl: "https://github.com/tazeenamir/task-management-app",
              },
              {
                title: "Mobile Banking App",
                description:
                  "Secure mobile banking application with biometric authentication and real-time transactions.",
                tech: ["React Native", "TypeScript", "Firebase", "Biometrics"],
                image: "/placeholder.svg?height=200&width=350",
                liveUrl: "https://banking-app-demo.example.com",
                githubUrl: "https://github.com/tazeenamir/mobile-banking-app",
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
                    value: "+1 (555) 123-4567",
                    note: "Available Mon-Fri, 9AM-6PM PST",
                  },
                  {
                    icon: MapPin,
                    title: "Location",
                    value: "San Francisco, CA",
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
              <div className={`social-connect ${contactInView ? "fade-in-up" : ""}`} style={{ animationDelay: "0.5s" }}>
                <h4>Connect With Me</h4>
                <div className="social-links">
                  <a
                    href="https://github.com/tazeenamir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link github"
                    aria-label="GitHub"
                  >
                    <Github className="social-icon" />
                    <span>GitHub</span>
                    <div className="link-glow"></div>
                  </a>
                  <a
                    href="https://linkedin.com/in/tazeenamir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="social-icon" />
                    <span>LinkedIn</span>
                    <div className="link-glow"></div>
                  </a>
                  <button className="social-link resume" onClick={handleResumeDownload} aria-label="Download Resume">
                    <Download className="social-icon" />
                    <span>Resume</span>
                    <div className="link-glow"></div>
                  </button>
                </div>
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
