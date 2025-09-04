import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"

import { useRef } from "react"

interface ScrollDownArrowProps {
  targetSelector?: string
  className?: string
  responsive?: boolean
}

export default function ScrollDownArrow({ targetSelector = "#skills", className = "" }: ScrollDownArrowProps) {
  const arrowRef = useRef<HTMLButtonElement>(null)

  useGSAP(() => {
    if (arrowRef.current) {
      // Floating animation
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    }
  }, [])

  const handleScrollDown = () => {
    const targetElement = document.querySelector(targetSelector)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <button
      ref={arrowRef}
      onClick={handleScrollDown}
      className={`
         fixed bottom-8  z-50
        bg-white/10 backdrop-blur-md border border-white/20
        rounded-full p-4 
        hover:bg-white/20  hover:scale-110
        transition-all duration-300
        flex items-center justify-center
        ${className}
      `}
      aria-label="Scroll down to next section"
    >
      <ChevronDown className="w-6 h-6 text-white" />
    </button>
  )
}
