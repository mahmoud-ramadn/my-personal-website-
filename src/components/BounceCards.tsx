import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useRef } from "react"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface ExperienceData {
  id: string
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  image?: string
  backgroundColor?: string
}

interface BounceCardsProps {
  className?: string
  images?: string[]
  experiences?: ExperienceData[]
  containerWidth?: number
  containerHeight?: number
  animationDelay?: number
  animationStagger?: number
  easeType?: string
  transformStyles?: string[]
  enableHover?: boolean
  enableScrollTrigger?: boolean
  scrollTriggerStart?: string
  scrollTriggerEnd?: string
  scrollOnce?: boolean
}

export default function BounceCards({
  className = "",
  images = [],
  experiences = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = false,
  enableScrollTrigger = true,
  scrollTriggerStart = "top 80%",
  scrollTriggerEnd = "bottom 20%",
  scrollOnce = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Determine the data source (experiences or images)
  const dataItems = experiences.length > 0 ? experiences : images
  const isExperienceMode = experiences.length > 0
  
  // GSAP ScrollTrigger Animation
  useGSAP(
    () => {
      if (!containerRef.current || dataItems.length === 0) return

      const cards = containerRef.current.querySelectorAll(".card")
      if (cards.length === 0) return

      // Set initial state for cards
      gsap.set(cards, { scale: 0, transformOrigin: "center center" })

      if (enableScrollTrigger) {
        // Create ScrollTrigger animation
        const scrollAnimation = gsap.fromTo(
          cards,
          {
            scale: 0,
            transformOrigin: "center center",
          },
          {
            scale: 1,
            stagger: animationStagger,
            ease: easeType,
            delay: animationDelay,
            duration: 1.2,
            transformOrigin: "center center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: scrollTriggerStart,
              end: scrollTriggerEnd,
              toggleActions: scrollOnce ? "play none none none" : "play none none reverse",
              once: scrollOnce,
              fastScrollEnd: true,
              preventOverlaps: true,
            },
            onComplete: () => {
              // Apply final transforms after animation
              cards.forEach((card, index) => {
                gsap.set(card, {
                  transform: transformStyles[index] || "none",
                })
              })
            },
          }
        )

        return () => {
          scrollAnimation.kill()
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === containerRef.current) {
              st.kill()
            }
          })
        }
      } else {
        // Fallback to immediate animation without scroll trigger
        const immediateAnimation = gsap.fromTo(
          cards,
          { scale: 0 },
          {
            scale: 1,
            stagger: animationStagger,
            ease: easeType,
            delay: animationDelay,
            duration: 1.2,
            onComplete: () => {
              cards.forEach((card, index) => {
                gsap.set(card, {
                  transform: transformStyles[index] || "none",
                })
              })
            },
          }
        )

        return () => {
          immediateAnimation.kill()
        }
      }
    },
    {
      dependencies: [
        dataItems.length,
        animationDelay,
        animationStagger,
        easeType,
        enableScrollTrigger,
        scrollTriggerStart,
        scrollTriggerEnd,
        scrollOnce,
        JSON.stringify(transformStyles),
      ],
      scope: containerRef,
    }
  )

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)")
    } else if (transformStr === "none") {
      return "rotate(0deg)"
    } else {
      return `${transformStr} rotate(0deg)`
    }
  }

  const getPushedTransform = (baseTransform: string, offsetX: number): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/
    const match = baseTransform.match(translateRegex)
    if (match) {
      const currentX = parseFloat(match[1])
      const newX = currentX + offsetX
      return baseTransform.replace(translateRegex, `translate(${newX}px)`)
    } else {
      return baseTransform === "none" ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`
    }
  }

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover) return

    dataItems.forEach((_, i) => {
      const selector = `.card-${i}`
      gsap.killTweensOf(selector)

      const baseTransform = transformStyles[i] || "none"

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform)
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        })
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160
        const pushedTransform = getPushedTransform(baseTransform, offsetX)

        const distance = Math.abs(hoveredIdx - i)
        const delay = distance * 0.05

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto",
        })
      }
    })
  }

  const resetSiblings = () => {
    if (!enableHover) return

    dataItems.forEach((_, i) => {
      const selector = `.card-${i}`
      gsap.killTweensOf(selector)

      const baseTransform = transformStyles[i] || "none"
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      })
    })
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {dataItems.map((item, idx) => {
        const isExperience = isExperienceMode && typeof item === 'object' && 'title' in item
        const experience = isExperience ? item as ExperienceData : null
        const imageSrc = isExperience ? experience?.image : item as string
        
        return (
          <div
            key={isExperience ? experience?.id || idx : idx}
            className={`card card-${idx} absolute w-[200px] aspect-square border-8 border-white rounded-[30px] overflow-hidden group cursor-pointer`}
            style={{
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              transform: transformStyles[idx] || "none",
              backgroundColor: isExperience ? experience?.backgroundColor || '#1f2937' : 'transparent',
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            {isExperience && experience ? (
              <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 p-4 flex flex-col justify-between">
                {/* Background Image Overlay */}
                {imageSrc && (
                  <div className="absolute inset-0 opacity-10">
                    <img className="w-full h-full object-cover" src={imageSrc} alt="background" />
                  </div>
                )}
                
                {/* Content */}
                <div className="relative z-10 text-white">
                  <h3 className="text-sm font-bold mb-1 line-clamp-2">{experience.title}</h3>
                  <p className="text-xs text-blue-300 mb-2">{experience.company}</p>
                  <p className="text-xs text-gray-300 mb-2">{experience.period}</p>
                </div>
                
                <div className="relative z-10">
                  <p className="text-xs text-gray-300 mb-3 line-clamp-3">{experience.description}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {experience.skills.slice(0, 3).map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                    {experience.skills.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full border border-gray-500/30">
                        +{experience.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[22px]"></div>
              </div>
            ) : (
              <img className="w-full h-full object-cover" src={imageSrc as string} alt={`card-${idx}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
