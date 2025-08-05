"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Globe, ArrowDown } from "lucide-react"

const Hero = () => {
  const [displayText, setDisplayText] = useState("")
  const fullText = "AI & BLOCKCHAIN DEVELOPER"
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const socialLinks = [
    { href: "https://github.com/videv93", icon: Github, label: "GitHub" },
    { href: "https://twitter.com/videv93", icon: Twitter, label: "Twitter" },
    { href: "https://www.virtualdev.xyz/", icon: Globe, label: "Website" },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-brutal-gradient-1 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-black" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black uppercase mb-4 brutal-heading">
              <span className="block transform -rotate-2 mb-2">VI</span>
              <span className="block transform rotate-1">TRAN</span>
            </h1>
            
            {/* Animated Subtitle */}
            <div className="brutal-card bg-white inline-block px-6 py-4 transform rotate-1">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider">
                {displayText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <div className="brutal-card bg-brutal-pink text-white max-w-2xl mx-auto transform -rotate-1">
              <p className="text-lg md:text-xl font-bold">
                BUILDING AI-POWERED VIRTUAL DEV AGENCY. SPECIALIZING IN MULTI-AGENT SYSTEMS, 
                SMART CONTRACT DEVELOPMENT, AND FULL-STACK APPLICATIONS.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              variant="brutal"
              size="brutal"
              onClick={() => scrollToSection("#projects")}
              className="bg-brutal-blue transform rotate-1 hover:rotate-0"
            >
              VIEW PROJECTS
            </Button>
            <Button
              variant="brutal-primary"
              size="brutal"
              onClick={() => scrollToSection("#contact")}
              className="transform -rotate-1 hover:rotate-0"
            >
              GET IN TOUCH
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`brutal-card w-16 h-16 flex items-center justify-center bg-white hover:bg-brutal-yellow transition-colors duration-200 transform ${
                  index % 2 === 0 ? "rotate-3" : "-rotate-3"
                } hover:rotate-0`}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection("#about")}
              className="brutal-card bg-white p-4 animate-bounce hover:animate-pulse"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero