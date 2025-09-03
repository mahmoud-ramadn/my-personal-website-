import { ArrowUpRight, Heart, Mail, MapPin, Phone, Sparkles } from "lucide-react"

import { SiFacebook, SiGithub, SiInstagram, SiLinkedin, SiTelegram, SiX } from "react-icons/si"

// Mock utility function (replace with your actual implementation)
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ")

// Mock UITitle component with enhanced styling
const UITitle = ({ title, href }: { title: string; href: string }) => (
  <div className="text-center mb-20 relative">
    {/* Background glow effect */}``
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl transform scale-150"></div>
    <div className="relative">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-20"></div>
        <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
        <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-20"></div>
      </div>

      <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
        {title} <span className="text-white drop-shadow-2xl">{href}</span>
      </h2>

      <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
        Ready to collaborate? Let's connect and turn your ideas into reality
      </p>

      <div className="mt-6 w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full shadow-lg shadow-purple-400/30"></div>
    </div>
  </div>
)

type SocialLink = {
  name: string
  href: string
  icon: React.ReactNode
  color: string
  hoverColor: string
}

type ContactInfo = {
  label: string
  value: string
  icon: React.ReactNode
  href?: string
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: <SiGithub className="w-7 h-7" />,
    color: "hover:text-white",
    hoverColor: "hover:shadow-white/20",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: <SiLinkedin className="w-7 h-7" />,
    color: "hover:text-[#0077B5]",
    hoverColor: "hover:shadow-blue-500/30",
  },
  {
    name: "X",
    href: "https://x.com/yourusername",
    icon: <SiX className="w-7 h-7" />,
    color: "hover:text-white",
    hoverColor: "hover:shadow-gray-400/20",
  },
  {
    name: "Telegram",
    href: "https://t.me/yourusername",
    icon: <SiTelegram className="w-7 h-7" />,
    color: "hover:text-[#0088cc]",
    hoverColor: "hover:shadow-blue-400/30",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourusername",
    icon: <SiInstagram className="w-7 h-7" />,
    color: "hover:text-[#E4405F]",
    hoverColor: "hover:shadow-pink-500/30",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourusername",
    icon: <SiFacebook className="w-7 h-7" />,
    color: "hover:text-[#1877F2]",
    hoverColor: "hover:shadow-blue-600/30",
  },
]

const contactInfo: ContactInfo[] = [
  {
    label: "Email",
    value: "your.email@example.com",
    icon: <Mail className="w-6 h-6" />,
    href: "mailto:your.email@example.com",
  },
  {
    label: "Phone",
    value: "+1 (555) 123-4567",
    icon: <Phone className="w-6 h-6" />,
    href: "tel:+15551234567",
  },
  {
    label: "Location",
    value: "Your City, Country",
    icon: <MapPin className="w-6 h-6" />,
  },
]

export default function EnhancedContactUI() {
  return (
    <div className="  text-white relative overflow-hidden">
      <div className="relative z-10 px-8 py-16">
        <UITitle title="Get In" href="Touch" />

        <div className="grid lg:grid-cols-2 gap-16 mt-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="relative group">
              {/* Glow effect */}

              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-10 hover:border-gray-600/60 transition-all duration-500 hover:transform hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Contact Information
                    </span>
                  </h3>
                </div>

                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-6 group/item">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-md group-hover/item:blur-lg transition-all duration-300"></div>
                        <div className="relative flex-shrink-0 p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 group-hover/item:border-blue-400/40 group-hover/item:bg-blue-500/20 transition-all duration-300 group-hover/item:scale-110">
                          <div className="text-blue-400 group-hover/item:text-blue-300 transition-colors duration-300">
                            {info.icon}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-blue-400 transition-colors font-semibold text-lg flex items-center gap-2 group/link"
                          >
                            {info.value}
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                          </a>
                        ) : (
                          <p className="text-white font-semibold text-lg">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-8">
            <div className="relative group">
              {/* Glow effect */}

              <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-10 hover:border-gray-600/60 transition-all duration-500 hover:transform hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Connect With Me
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group/social relative flex flex-col items-center justify-center p-8 rounded-2xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm transition-all duration-500 hover:border-gray-500/50 hover:bg-gray-700/30 hover:scale-110 hover:shadow-2xl transform-gpu",
                        social.color,
                        social.hoverColor
                      )}
                    >
                      {/* Glow effect for each social icon */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-800/10 rounded-2xl opacity-0 group-hover/social:opacity-100 transition-all duration-500"></div>

                      <div className="relative mb-4 transition-all duration-500 group-hover/social:scale-125 group-hover/social:rotate-12">
                        {social.icon}
                      </div>
                      <span className="relative text-sm font-semibold text-gray-300 group-hover/social:text-white transition-colors duration-300">
                        {social.name}
                      </span>

                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-100 transition-all duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] animate-shimmer"></div>
                    </a>
                  ))}
                </div>

                {/* Enhanced CTA Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-50"></div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Let's Work Together</h4>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      I'm always excited to collaborate on innovative projects and explore new opportunities. Whether
                      you have a specific vision or need guidance, let's connect and create something extraordinary!
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {["Web Development", "Mobile Apps", "UI/UX Design", "Consulting", "E-commerce"].map(
                        (skill, index) => (
                          <span
                            key={skill}
                            className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-500/30 hover:border-blue-400/50 hover:bg-blue-500/30 transition-all duration-300 cursor-default"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href="mailto:your.email@example.com"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group/cta"
                      >
                        <Mail className="w-5 h-5 mr-2 group-hover/cta:animate-bounce" />
                        Start a Project
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center px-6 py-3 border border-gray-600 hover:border-gray-400 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-gray-800/50 hover:scale-105"
                      >
                        View Portfolio
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-600"></div>
            <span>Available for freelance work</span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for shimmer animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `,
        }}
      />
    </div>
  )
}
