import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react"

import React, { useState } from "react"
import { SiGithub, SiLinkedin, SiX } from "react-icons/si"

// Mock utility function
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ")

// Enhanced Title Component
const UITitle = ({ title, href }: { title: string; href: string }) => (
  <div className="text-center mb-8 md:mb-12 lg:mb-20 relative px-2 sm:px-4">
    <div className="relative">
      <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 mb-3 sm:mb-4 md:mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-8 sm:max-w-10 md:max-w-20"></div>
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-blue-400 animate-pulse" />
        <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-8 sm:max-w-10 md:max-w-20"></div>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
        {title} <span className="text-white drop-shadow-2xl">{href}</span>
      </h2>

      <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
        Ready to collaborate? Let's connect and turn your ideas into reality
      </p>

      <div className="mt-3 sm:mt-4 md:mt-6 w-16 sm:w-20 md:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full shadow-lg shadow-purple-400/30"></div>
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
    href: "https://github.com/mahmoud-ramadn",
    icon: <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />,
    color: "hover:text-white",
    hoverColor: "hover:shadow-white/20",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mahmoud-ramadan-aa4b322a5/",
    icon: <SiLinkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />,
    color: "hover:text-[#0077B5]",
    hoverColor: "hover:shadow-blue-500/30",
  },
  {
    name: "X",
    href: "https://x.com/Mahmoud122693",
    icon: <SiX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />,
    color: "hover:text-white",
    hoverColor: "hover:shadow-gray-400/20",
  },
]

const contactInfo: ContactInfo[] = [
  {
    label: "Email",
    value: "mahmoudramdan2000135@gmail.com",
    icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    href: "mailto:mahmoudramdan2000135@gmail.com",
  },
  {
    label: "Phone",
    value: "+201067958518",
    icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    href: "tel:+201067958518",
  },
  {
    label: "Location",
    value: "Damietta, Egypt",
    icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  },
]

export default function EnhancedContactUI() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://formspree.io/f/mnqyabcd", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Form service error")
      }
    } catch (error) {
      console.log("Form service failed, falling back to mailto")

      try {
        const subject = encodeURIComponent(`New Contact from ${formData.name}`)
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )

        const mailtoLink = `mailto:mahmoudramdan2000135@gmail.com?subject=${subject}&body=${body}`

        const link = document.createElement("a")
        link.href = mailtoLink
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => {
          setSubmitStatus("success")
          setFormData({ name: "", email: "", message: "" })
        }, 500)
      } catch (mailtoError) {
        setSubmitStatus("error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen  text-white relative overflow-hidden">
      {/* Background Effects */}
    

      <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        <UITitle title="Get In" href="Touch" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12 lg:mt-20">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6 md:space-y-8">
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 hover:border-gray-600/60 transition-all duration-500 hover:transform hover:scale-[1.02]">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Contact Info
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 group/item">
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg sm:rounded-xl md:rounded-2xl blur-md group-hover/item:blur-lg transition-all duration-300"></div>
                          <div className="relative p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 group-hover/item:border-blue-400/40 group-hover/item:bg-blue-500/20 transition-all duration-300 group-hover/item:scale-110">
                            <div className="text-blue-400 group-hover/item:text-blue-300 transition-colors duration-300">
                              {info.icon}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-white hover:text-blue-400 transition-colors font-semibold text-sm sm:text-base lg:text-lg flex items-center gap-1 sm:gap-2 group/link break-all"
                            >
                              <span className="truncate">{info.value}</span>
                              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 flex-shrink-0" />
                            </a>
                          ) : (
                            <p className="text-white font-semibold text-sm sm:text-base lg:text-lg truncate">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Social Links */}
              <div className="lg:hidden">
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Connect With Me
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group/social relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm transition-all duration-500 hover:border-gray-500/50 hover:bg-gray-700/30 hover:scale-105 transform-gpu",
                          social.color,
                          social.hoverColor
                        )}
                      >
                        <div className="relative mb-1 sm:mb-2 transition-all duration-500 group-hover/social:scale-110">
                          {social.icon}
                        </div>
                        <span className="relative text-xs font-semibold text-gray-300 group-hover/social:text-white transition-colors duration-300 text-center">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 hover:border-gray-600/60 transition-all duration-500">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                      <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                        Send Message
                      </span>
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                    {/* Name Input */}
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 bg-gray-800/50 border border-gray-600/50 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-400/60 focus:bg-gray-800/70 transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 bg-gray-800/50 border border-gray-600/50 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-400/60 focus:bg-gray-800/70 transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2"
                      >
                        Your Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 sm:left-4 top-4 sm:top-6 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 bg-gray-800/50 border border-gray-600/50 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-400/60 focus:bg-gray-800/70 transition-all duration-300 text-white placeholder-gray-400 resize-none text-sm sm:text-base min-h-[120px] sm:min-h-[140px]"
                          placeholder="Tell me about your project, ideas, or just say hello..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 sm:pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                        className={cn(
                          "w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group/submit disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base",
                          submitStatus === "success" ? "from-green-500 to-green-600" : "",
                          submitStatus === "error" ? "from-red-500 to-red-600" : ""
                        )}
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 sm:mr-3" />
                        ) : submitStatus === "success" ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        ) : submitStatus === "error" ? (
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        ) : (
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover/submit:translate-x-1 transition-transform duration-300" />
                        )}
                        {isSubmitting
                          ? "Sending Message..."
                          : submitStatus === "success"
                            ? "Message Sent!"
                            : submitStatus === "error"
                              ? "Try Again"
                              : "Send Message"}
                      </button>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === "success" && (
                      <div className="p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg sm:rounded-xl">
                        <p className="text-green-400 text-xs sm:text-sm">
                          Message sent successfully! I'll get back to you soon.
                        </p>
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl">
                        <p className="text-red-400 text-xs sm:text-sm">
                          Unable to send message. Please try again or contact me directly at
                          mahmoudramdan2000135@gmail.com
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Desktop Social Links & CTA */}
              <div className="hidden lg:block">
                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-10 hover:border-gray-600/60 transition-all duration-500">
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

                  <div className="grid grid-cols-3 gap-6 mb-10">
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
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-800/10 rounded-2xl opacity-0 group-hover/social:opacity-100 transition-all duration-500"></div>

                        <div className="relative mb-4 transition-all duration-500 group-hover/social:scale-125 group-hover/social:rotate-12">
                          {social.icon}
                        </div>
                        <span className="relative text-sm font-semibold text-gray-300 group-hover/social:text-white transition-colors duration-300">
                          {social.name}
                        </span>

                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-100 transition-all duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] animate-shimmer"></div>
                      </a>
                    ))}
                  </div>

                  {/* CTA Section */}
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

                      <div className="flex flex-wrap gap-4">
                        <a
                          href="mailto:mahmoudramdan2000135@gmail.com"
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
        </div>

        {/* Bottom decorative element */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm">
            <div className="w-6 sm:w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-gray-600"></div>
            <span>Available for freelance work</span>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-6 sm:w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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
