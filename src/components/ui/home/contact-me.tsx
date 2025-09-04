import { zodResolver } from "@hookform/resolvers/zod"
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  Download,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react"
import * as z from "zod"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { SiGithub, SiLinkedin, SiX } from "react-icons/si"

import { cn } from "@/lib/utils"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import UITitle from "../ui-title"

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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(100, { message: "Email must be less than 100 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(1000, { message: "Message must be less than 1000 characters" })
    .trim(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // React Hook Form setup with Zod validation
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        form.reset()
      } else {
        console.log("Web3Forms error:", result)
        throw new Error("Form service error")
      }
    } catch (error) {
      setSubmitStatus("error")
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

                    {/* CV Download Button */}
                    <div className="pt-2 sm:pt-4 md:pt-6">
                      <a
                        href="/Mahmoud Ramadan -dev-cv.pdf"
                        download="Mahmoud_Ramadan_CV.pdf"
                        className="group/cv flex items-center justify-center w-full p-3 sm:p-4 md:p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 hover:border-emerald-400/50 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg sm:rounded-xl blur-md group-hover/cv:blur-lg transition-all duration-300"></div>
                            <div className="relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 group-hover/cv:border-emerald-400/50 group-hover/cv:bg-emerald-500/30 transition-all duration-300 group-hover/cv:scale-110">
                              <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-400 group-hover/cv:text-emerald-300 transition-colors duration-300" />
                            </div>
                          </div>
                          <div className="text-center sm:text-left">
                            <h4 className="font-bold text-sm sm:text-base md:text-lg text-white group-hover/cv:text-emerald-300 transition-colors duration-300">
                              Download CV
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 group-hover/cv:text-gray-300 transition-colors duration-300">
                              Get my resume in PDF format
                            </p>
                          </div>
                          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-400 opacity-0 group-hover/cv:opacity-100 transition-all duration-300 transform group-hover/cv:translate-x-1 group-hover/cv:-translate-y-1 ml-auto" />
                        </div>
                      </a>
                    </div>
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

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 md:space-y-6">
                      {/* Name Input */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm font-semibold text-gray-300">Your Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 z-10" />
                                <Input
                                  placeholder="Enter your full name"
                                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 bg-gray-800/50 border border-gray-600/50 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-400/60 focus:bg-gray-800/70 transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs sm:text-sm" />
                          </FormItem>
                        )}
                      />

                      {/* Email Input */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm font-semibold text-gray-300">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 z-10" />
                                <Input
                                  type="email"
                                  placeholder="your.email@example.com"
                                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 bg-gray-800/50 border border-gray-600/50 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-400/60 focus:bg-gray-800/70 transition-all duration-300 text-white placeholder-gray-400 text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs sm:text-sm" />
                          </FormItem>
                        )}
                      />

                      {/* Message Textarea */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm font-semibold text-gray-300">
                              Your Message
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MessageSquare className="absolute left-3 sm:left-4 top-4 sm:top-6 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 z-10" />
                                <Textarea
                                  placeholder="Tell me about your project, ideas, or just say hello..."
                                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 bg-gray-800/50 border border-gray-600/50 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-400/60 focus:bg-gray-800/70 transition-all duration-300 text-white placeholder-gray-400 resize-none text-sm sm:text-base min-h-[120px] sm:min-h-[140px] focus-visible:ring-0 focus-visible:ring-offset-0"
                                  rows={5}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs sm:text-sm" />
                          </FormItem>
                        )}
                      />

                      {/* Submit Button */}
                      <div className="pt-2 sm:pt-4">
                        <button
                          type="submit"
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
                            ✅ Message sent successfully! I'll get back to you soon.
                          </p>
                        </div>
                      )}
                      {submitStatus === "error" && (
                        <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl">
                          <p className="text-red-400 text-xs sm:text-sm">
                            ⚠️ Unable to send message. Please try again or contact me directly at
                            mahmoudramdan2000135@gmail.com
                          </p>
                        </div>
                      )}
                    </form>
                  </Form>
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
                          href="/Mahmoud Ramadan -dev-cv.pdf"
                          download="Mahmoud_Ramadan_CV.pdf"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 group/download"
                        >
                          <Download className="w-5 h-5 mr-2 group-hover/download:animate-bounce" />
                          Download CV
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
