"use client"

import { BrutalCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Globe, MapPin, Mail } from "lucide-react"

const Contact = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/videv93",
      icon: Github,
      bgColor: "bg-brutal-pink"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/videv93",
      icon: Twitter,
      bgColor: "bg-brutal-blue"
    },
    {
      name: "Website",
      url: "https://www.virtualdev.xyz/",
      icon: Globe,
      bgColor: "bg-brutal-yellow"
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "Available on GitHub",
      bgColor: "bg-brutal-green"
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "Ho Chi Minh City, Vietnam",
      bgColor: "bg-brutal-orange"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-brutal-gradient-1">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 brutal-heading text-white">
            <span className="block transform rotate-1">GET IN</span>
            <span className="block transform -rotate-2">TOUCH</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <BrutalCard className="bg-white transform rotate-1">
              <h3 className="text-3xl font-black uppercase mb-4">
                LET&apos;S WORK TOGETHER
              </h3>
              <p className="text-lg font-bold leading-relaxed mb-6">
                I&apos;M ALWAYS INTERESTED IN NEW OPPORTUNITIES AND COLLABORATIONS. 
                WHETHER YOU HAVE A PROJECT IN MIND OR JUST WANT TO CONNECT, 
                FEEL FREE TO REACH OUT!
              </p>
            </BrutalCard>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <BrutalCard 
                  key={info.label}
                  className={`${info.bgColor} text-white transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-300`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="brutal-card bg-white text-black p-3">
                      <info.icon size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-black uppercase opacity-80">
                        {info.label}
                      </div>
                      <div className="text-lg font-bold">
                        {info.value}
                      </div>
                    </div>
                  </div>
                </BrutalCard>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-8">
            <BrutalCard className="bg-white transform -rotate-1">
              <h4 className="text-2xl font-black uppercase mb-6 text-center">
                CONNECT WITH ME
              </h4>
            </BrutalCard>

            <div className="space-y-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 hover:scale-105 transition-all duration-300`}
                >
                  <BrutalCard className={`${social.bgColor} text-white cursor-pointer`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="brutal-card bg-white text-black p-4">
                          <social.icon size={28} />
                        </div>
                        <div>
                          <div className="text-2xl font-black uppercase">
                            {social.name}
                          </div>
                          <div className="text-sm font-bold opacity-80">
                            @videv93
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-black">→</div>
                    </div>
                  </BrutalCard>
                </a>
              ))}
            </div>

            {/* Fun Quote */}
            <BrutalCard className="bg-brutal-purple text-white transform rotate-1">
              <div className="text-center">
                <div className="text-2xl font-black uppercase mb-2">
                  &ldquo;BUILDING THE FUTURE&rdquo;
                </div>
                <div className="text-lg font-bold">
                  ONE LINE OF CODE AT A TIME 🚀
                </div>
              </div>
            </BrutalCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact