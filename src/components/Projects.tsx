"use client"

import { BrutalCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

const Projects = () => {
  const projects = [
    {
      title: "Multi-Agent Smart Contract Auditor",
      description: "AI-powered multi-agent system that automatically audits smart contracts and generates Proof-of-Concept exploits to demonstrate vulnerabilities. Uses LLM agents for comprehensive security analysis.",
      tech: ["Python", "LLM", "Solidity", "Security"],
      github: "https://github.com/videv93/fyp-fr",
      bgColor: "bg-brutal-pink",
      rotation: "rotate-1"
    },
    {
      title: "Course Buddy",
      description: "AI-powered learning platform that helps students find study partners, manage courses, and track progress. Features real-time messaging, study groups, and smart recommendations.",
      tech: ["Next.js", "TypeScript", "Supabase", "AI"],
      github: "https://github.com/videv93/course-buddy",
      bgColor: "bg-brutal-blue",
      rotation: "-rotate-2"
    },
    {
      title: "FreqTrade Strategies",
      description: "Collection of algorithmic trading strategies converted from FreqTrade to PineScript. Includes advanced technical indicators and backtesting capabilities.",
      tech: ["PineScript", "Trading", "TA", "Algorithms"],
      github: "https://github.com/videv93/freqtrade-strategies",
      bgColor: "bg-brutal-yellow",
      rotation: "rotate-2"
    },
    {
      title: "Location Management API",
      description: "RESTful API for managing geographic locations with CRUD operations, built with NestJS and PostgreSQL. Features comprehensive testing and Docker deployment.",
      tech: ["NestJS", "PostgreSQL", "Docker", "API"],
      github: "https://github.com/videv93/location-management-api",
      bgColor: "bg-brutal-green",
      rotation: "-rotate-1"
    },
    {
      title: "YouTube Sharing App",
      description: "Full-stack application for sharing and discovering YouTube videos. Features user authentication, video management, and social interactions.",
      tech: ["React", "Node.js", "MongoDB", "YouTube API"],
      github: "https://github.com/videv93/youtube-sharing-app",
      bgColor: "bg-brutal-orange",
      rotation: "rotate-1"
    },
    {
      title: "Smart Contract Projects",
      description: "Collection of Solidity smart contracts including crowdfunding, storage, and DeFi protocols. Built with Foundry framework and comprehensive testing.",
      tech: ["Solidity", "Foundry", "DeFi", "Testing"],
      github: "https://github.com/videv93/foundary-fund-me-f23",
      bgColor: "bg-brutal-purple",
      rotation: "-rotate-2"
    }
  ]

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 brutal-heading">
            <span className="block transform -rotate-1 text-brutal-pink">FEATURED</span>
            <span className="block transform rotate-2 text-brutal-blue">PROJECTS</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={`transform ${project.rotation} hover:rotate-0 hover:scale-105 transition-all duration-300`}
            >
              <BrutalCard className={`${project.bgColor} text-white h-full flex flex-col`}>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black uppercase leading-tight">
                      {project.title}
                    </h3>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-card bg-white text-black p-2 hover:bg-brutal-yellow transition-colors duration-200"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  
                  <p className="text-sm font-bold mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white text-black px-3 py-1 text-xs font-black uppercase border-2 border-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </BrutalCard>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Button
            variant="brutal"
            size="brutal"
            className="bg-brutal-pink text-white transform -rotate-1 hover:rotate-0 hover:scale-110"
            onClick={() => window.open("https://github.com/videv93", "_blank")}
          >
            <Github className="mr-2" size={24} />
            VIEW ALL PROJECTS ON GITHUB
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Projects