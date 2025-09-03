import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useRef } from "react"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP)

interface BounceCardsProps {
  className?: string
  images?: string[]
  path?: string
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
  path,
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
  // GSAP ScrollTrigger Animation
  useGSAP(
    () => {
      if (!containerRef.current || images.length === 0) return

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
        images.length,
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

    images.forEach((_, i) => {
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

    images.forEach((_, i) => {
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
      {images.map((src, idx) => (
        <a
          href={path}
          key={idx}
          className={`card card-${idx} absolute w-[200px]   aspect-square border-8 border-white rounded-[30px] overflow-hidden`}
          style={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            transform: transformStyles[idx] || "none",
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className="w-full h-full object-cover" src={src} alt={`card-${idx}`} />
        </a>
      ))}
    </div>
  )
}
