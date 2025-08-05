"use client"

import { BrutalCard } from "@/components/ui/card"

const Skills = () => {
  const skillCategories = [
    {
      title: "AI & MACHINE LEARNING",
      skills: ["Multi-Agent Systems", "LLM Integration", "Smart Contract Auditing", "Trading Algorithms"],
      bgColor: "bg-brutal-pink",
      rotation: "rotate-2"
    },
    {
      title: "BLOCKCHAIN & WEB3",
      skills: ["Solidity", "Foundry", "Hardhat", "Smart Contracts", "DeFi"],
      bgColor: "bg-brutal-blue",
      rotation: "-rotate-1"
    },
    {
      title: "FULL-STACK DEVELOPMENT",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "FastAPI"],
      bgColor: "bg-brutal-yellow",
      rotation: "rotate-1"
    },
    {
      title: "DEVOPS & INFRASTRUCTURE",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Infrastructure as Code"],
      bgColor: "bg-brutal-green",
      rotation: "-rotate-2"
    }
  ]

  return (
    <section id="skills" className="py-20 bg-brutal-gradient-3">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 brutal-heading text-white">
            <span className="block transform rotate-1">SKILLS &</span>
            <span className="block transform -rotate-2">TECHNOLOGIES</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={category.title} className={`transform ${category.rotation} hover:rotate-0 transition-transform duration-300`}>
              <BrutalCard className={`${category.bgColor} text-white h-full`}>
                <h3 className="text-2xl font-black uppercase mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="bg-white text-black px-4 py-3 font-bold uppercase text-sm border-4 border-black transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 cursor-default"
                      style={{
                        animationDelay: `${skillIndex * 0.1}s`
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </BrutalCard>
            </div>
          ))}
        </div>

        {/* Fun Floating Elements */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["REACT", "SOLIDITY", "AI/ML", "DEVOPS"].map((tech, index) => (
            <div
              key={tech}
              className={`brutal-card bg-white text-center py-4 font-black text-lg transform ${
                index % 2 === 0 ? "rotate-3" : "-rotate-3"
              } hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-default`}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills