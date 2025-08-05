"use client"

import { useEffect, useState, useRef } from "react"
import { BrutalCard } from "@/components/ui/card"

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ repos: 0, experience: 0, followers: 0 })
  const ref = useRef<HTMLElement>(null)

  const targetCounts = { repos: 39, experience: 7, followers: 14 }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      if (step <= steps) {
        setCounts({
          repos: Math.round((targetCounts.repos * step) / steps),
          experience: Math.round((targetCounts.experience * step) / steps),
          followers: Math.round((targetCounts.followers * step) / steps),
        })
        step++
      } else {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={ref} id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 brutal-heading">
            <span className="block transform rotate-2 text-brutal-pink">ABOUT</span>
            <span className="block transform -rotate-1 text-brutal-blue">ME</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="space-y-8">
            <BrutalCard className="bg-brutal-gradient-2 text-white transform rotate-1">
              <p className="text-lg font-bold leading-relaxed">
                I'M A PASSIONATE SOFTWARE DEVELOPER FROM HO CHI MINH CITY, VIETNAM, 
                WITH EXPERTISE IN AI/ML, BLOCKCHAIN TECHNOLOGY, AND FULL-STACK DEVELOPMENT. 
                I SPECIALIZE IN BUILDING INTELLIGENT SYSTEMS THAT SOLVE REAL-WORLD PROBLEMS.
              </p>
            </BrutalCard>

            <BrutalCard className="bg-brutal-yellow transform -rotate-1">
              <p className="text-lg font-bold leading-relaxed">
                MY FOCUS IS ON CREATING AI-POWERED SOLUTIONS, MULTI-AGENT SYSTEMS, 
                AND SECURE BLOCKCHAIN APPLICATIONS. I'M PARTICULARLY INTERESTED IN 
                THE INTERSECTION OF AI AND WEB3 TECHNOLOGIES.
              </p>
            </BrutalCard>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
            <div className="brutal-card bg-brutal-pink text-white text-center transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-black mb-2">
                {counts.repos}
              </div>
              <div className="text-lg font-bold uppercase">REPOSITORIES</div>
            </div>

            <div className="brutal-card bg-brutal-blue text-white text-center transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-black mb-2">
                {counts.experience}+
              </div>
              <div className="text-lg font-bold uppercase">YEARS EXPERIENCE</div>
            </div>

            <div className="brutal-card bg-brutal-orange text-white text-center transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-black mb-2">
                {counts.followers}
              </div>
              <div className="text-lg font-bold uppercase">FOLLOWERS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About