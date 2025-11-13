/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGesture } from "@use-gesture/react";



import { useCallback, useEffect, useMemo, useRef } from "react";





type ImageItem = string | { src: string; alt?: string; website: string; sourceCode: string }

type DomeGalleryProps = {
  images?: ImageItem[]
  fit?: number
  fitBasis?: "auto" | "min" | "max" | "width" | "height"
  minRadius?: number
  maxRadius?: number
  padFactor?: number
  overlayBlurColor?: string
  maxVerticalRotationDeg?: number
  dragSensitivity?: number
  enlargeTransitionMs?: number
  segments?: number
  dragDampening?: number
  openedImageWidth?: string
  openedImageHeight?: string
  imageBorderRadius?: string
  openedImageBorderRadius?: string
  grayscale?: boolean
}

type ItemDef = {
  src: string
  alt: string
  website?: string
  sourceCode?: string
  x: number
  y: number
  sizeX: number
  sizeY: number
}

// Default project images - replace with your actual projects
const DEFAULT_IMAGES: ImageItem[] = []

// Constants and utility functions
const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360
  return a - 180
}

const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`)
  const n = attr == null ? NaN : parseFloat(attr)
  return Number.isFinite(n) ? n : fallback
}

// Build items for the 3D gallery
function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2)
  const evenYs = [-4, -2, 0, 2, 4]
  const oddYs = [-3, -1, 1, 3, 5]

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }))
  })

  const totalSlots = coords.length
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "" }))
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`
    )
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") {
      return { src: image, alt: "", website: "", sourceCode: "" }
    }
    return {
      src: image.src || "",
      alt: image.alt || "",
      website: image.website || "",
      sourceCode: image.sourceCode || "",
    }
  })

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length])

  // Shuffle to avoid duplicate adjacent images
  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i]
          usedImages[i] = usedImages[j]
          usedImages[j] = tmp
          break
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
    website: usedImages[i].website,
    sourceCode: usedImages[i].sourceCode,
  }))
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
  const unit = 360 / segments / 2
  const rotateY = unit * (offsetX + (sizeX - 1) / 2)
  const rotateX = unit * (offsetY - (sizeY - 1) / 2)
  return { rotateX, rotateY }
}

function createProjectButtons(website: string, sourceCode: string): HTMLElement {
  const buttonsContainer = document.createElement("div")
  buttonsContainer.className = "gallery-buttons"
  buttonsContainer.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    z-index: 1000;
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s ease;
    pointer-events: auto;
  `

  // Adjust button position for mobile
  const adjustButtonPosition = () => {
    if (window.innerWidth <= 768) {
      buttonsContainer.style.top = "195px"
      buttonsContainer.style.right = "25px"
      buttonsContainer.style.gap = "6px"
    } else {
      buttonsContainer.style.top = "10px"
      buttonsContainer.style.right = "10px"
      buttonsContainer.style.gap = "8px"
    }
  }

  // Call on initial load
  adjustButtonPosition()

  // Add responsive styles for the buttons
  const addResponsiveButtonStyles = () => {
    const style = document.createElement("style")
    style.textContent = `
      @media (max-width: 768px) {
        .gallery-buttons button {
          padding: 6px 12px !important;
          font-size: 12px !important;
          border-radius: 6px !important;
        }
        
        .gallery-buttons button svg {
          width: 14px !important;
          height: 14px !important;
        }
      }
      
      @media (max-width: 480px) {
        .gallery-buttons button {
          padding: 4px 8px !important;
          font-size: 11px !important;
          border-radius: 4px !important;
        }
        
        .gallery-buttons button svg {
          width: 12px !important;
          height: 12px !important;
        }
      }
    `
    document.head.appendChild(style)
  }

  // Apply responsive styles
  addResponsiveButtonStyles()

  if (website) {
    const liveButton = document.createElement("button")
    liveButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15,3 21,3 21,9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      <span>preview</span>
    `
    liveButton.style.cssText = `
      display: flex; align-items: center; gap: 8px; padding: 8px 16px;
      background: rgba(59, 130, 246, 0.9); color: white; border: none;
      border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;
      transition: all 0.2s ease; backdrop-filter: blur(8px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `

    liveButton.addEventListener("mouseenter", () => {
      liveButton.style.background = "rgba(59, 130, 246, 1)"
      liveButton.style.transform = "translateY(-2px)"
      liveButton.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.25)"
    })
    liveButton.addEventListener("mouseleave", () => {
      liveButton.style.background = "rgba(59, 130, 246, 0.9)"
      liveButton.style.transform = "translateY(0)"
      liveButton.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
    })
    liveButton.addEventListener("click", (e) => {
      e.stopPropagation()
      window.open(website, "_blank", "noopener,noreferrer")
    })
    buttonsContainer.appendChild(liveButton)
  }

  if (sourceCode) {
    const sourceButton = document.createElement("button")
    sourceButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      <span>code</span>
    `
    sourceButton.style.cssText = `
      display: flex; align-items: center; gap: 8px; padding: 8px 16px;
      background: rgba(139, 92, 246, 0.9); color: white; border: none;
      border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;
      transition: all 0.2s ease; backdrop-filter: blur(8px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `

    sourceButton.addEventListener("mouseenter", () => {
      sourceButton.style.background = "rgba(139, 92, 246, 1)"
      sourceButton.style.transform = "translateY(-2px)"
      sourceButton.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.25)"
    })
    sourceButton.addEventListener("mouseleave", () => {
      sourceButton.style.background = "rgba(139, 92, 246, 0.9)"
      sourceButton.style.transform = "translateY(0)"
      sourceButton.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
    })
    sourceButton.addEventListener("click", (e) => {
      e.stopPropagation()
      window.open(sourceCode, "_blank", "noopener,noreferrer")
    })
    buttonsContainer.appendChild(sourceButton)
  }

  let resizeTimeout: NodeJS.Timeout
  const handleResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      // Adjust button container position
      if (window.innerWidth <= 768) {
        buttonsContainer.style.top = "195px"
        buttonsContainer.style.right = "25px"
        buttonsContainer.style.gap = "6px"
      } else {
        buttonsContainer.style.top = "195px"
        buttonsContainer.style.right = "25px"
        buttonsContainer.style.gap = "8px"
      }

      // Adjust button styles
      const buttons = buttonsContainer.querySelectorAll("button")
      buttons.forEach((button) => {
        if (window.innerWidth <= 480) {
          // Small mobile screens
          button.style.padding = "4px 8px"
          button.style.fontSize = "11px"
          button.style.borderRadius = "4px"
          const svg = button.querySelector("svg")
          if (svg) {
            svg.setAttribute("width", "12")
            svg.setAttribute("height", "12")
          }
        } else if (window.innerWidth <= 768) {
          // Larger mobile screens
          button.style.padding = "6px 12px"
          button.style.fontSize = "12px"
          button.style.borderRadius = "6px"
          const svg = button.querySelector("svg")
          if (svg) {
            svg.setAttribute("width", "14")
            svg.setAttribute("height", "14")
          }
        } else {
          // Desktop
          button.style.padding = "8px 16px"
          button.style.fontSize = "14px"
          button.style.borderRadius = "8px"
          const svg = button.querySelector("svg")
          if (svg) {
            svg.setAttribute("width", "16")
            svg.setAttribute("height", "16")
          }
        }
      })
    }, 100)
  }

  window.addEventListener("resize", handleResize)

  return buttonsContainer
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "400px",
  openedImageHeight = "700px",
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = true,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const focusedElRef = useRef<HTMLElement | null>(null)
  const originalTilePositionRef = useRef<{
    left: number
    top: number
    width: number
    height: number
  } | null>(null)

  const rotationRef = useRef({ x: 0, y: 0 })
  const startRotRef = useRef({ x: 0, y: 0 })
  const startPosRef = useRef<{ x: number; y: number } | null>(null)
  const draggingRef = useRef(false)
  const cancelTapRef = useRef(false)
  const movedRef = useRef(false)
  const inertiaRAF = useRef<number | null>(null)
  const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse")
  const tapTargetRef = useRef<HTMLElement | null>(null)
  const openingRef = useRef(false)
  const openStartedAtRef = useRef(0)
  const lastDragEndAt = useRef(0)

  const scrollLockedRef = useRef(false)
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return
    scrollLockedRef.current = true
    document.body.classList.add("dg-scroll-lock")
  }, [])
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return
    if (rootRef.current?.getAttribute("data-enlarging") === "true") return
    scrollLockedRef.current = false
    document.body.classList.remove("dg-scroll-lock")
  }, [])

  const items = useMemo(() => buildItems(images, segments), [images, segments])

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`
    }
  }

  const lockedRadiusRef = useRef<number | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height)
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h
      let basis: number
      switch (fitBasis) {
        case "min":
          basis = minDim
          break
        case "max":
          basis = maxDim
          break
        case "width":
          basis = w
          break
        case "height":
          basis = h
          break
        default:
          basis = aspect >= 1.3 ? w : minDim
      }
      let radius = basis * fit
      const heightGuard = h * 1.35
      radius = Math.min(radius, heightGuard)
      radius = clamp(radius, minRadius, maxRadius)
      lockedRadiusRef.current = Math.round(radius)

      const viewerPad = Math.max(8, Math.round(minDim * padFactor))
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`)
      root.style.setProperty("--viewer-pad", `${viewerPad}px`)
      root.style.setProperty("--overlay-blur-color", overlayBlurColor)
      root.style.setProperty("--tile-radius", imageBorderRadius)
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius)
      root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none")
      applyTransform(rotationRef.current.x, rotationRef.current.y)

      const enlargedOverlay = viewerRef.current?.querySelector(".enlarge") as HTMLElement
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect()
        const mainR = mainRef.current.getBoundingClientRect()

        // Check if we're on mobile to set the appropriate size
        const isMobile = window.innerWidth <= 768
        if (isMobile) {
          // On mobile, set the overlay to 75% of viewport size
          enlargedOverlay.style.width = "75vw"
          enlargedOverlay.style.height = "75vh"
          enlargedOverlay.style.left = "12.5vw"
          enlargedOverlay.style.top = "12.5vh"
          // Remove backdrop on mobile
          enlargedOverlay.style.background = "transparent"
          enlargedOverlay.style.backdropFilter = "none"
          enlargedOverlay.style.boxShadow = "none"
        } else {
          // Restore desktop styles
          enlargedOverlay.style.background =
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
          enlargedOverlay.style.backdropFilter = "blur(20px)"
          enlargedOverlay.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)"

          const hasCustomSize = openedImageWidth && openedImageHeight
          if (hasCustomSize) {
            const tempDiv = document.createElement("div")
            tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`
            document.body.appendChild(tempDiv)
            const tempRect = tempDiv.getBoundingClientRect()
            document.body.removeChild(tempDiv)

            const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2
            const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2

            enlargedOverlay.style.left = `${centeredLeft}px`
            enlargedOverlay.style.top = `${centeredTop}px`
          } else {
            enlargedOverlay.style.left = `${frameR.left - mainR.left}px`
            enlargedOverlay.style.top = `${frameR.top - mainR.top}px`
            enlargedOverlay.style.width = `${frameR.width}px`
            enlargedOverlay.style.height = `${frameR.height}px`
          }
        }
      }
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
  ])

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y)
  }, [])

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current)
      inertiaRAF.current = null
    }
  }, [])

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4
      let vX = clamp(vx, -MAX_V, MAX_V) * 80
      let vY = clamp(vy, -MAX_V, MAX_V) * 80
      let frames = 0
      const d = clamp(dragDampening ?? 0.6, 0, 1)
      const frictionMul = 0.94 + 0.055 * d
      const stopThreshold = 0.015 - 0.01 * d
      const maxFrames = Math.round(90 + 270 * d)
      const step = () => {
        vX *= frictionMul
        vY *= frictionMul
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null
          return
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null
          return
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg)
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200)
        rotationRef.current = { x: nextX, y: nextY }
        applyTransform(nextX, nextY)
        inertiaRAF.current = requestAnimationFrame(step)
      }
      stopInertia()
      inertiaRAF.current = requestAnimationFrame(step)
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  )

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return
        stopInertia()

        const evt = event as PointerEvent
        pointerTypeRef.current = (evt.pointerType as any) || "mouse"
        if (pointerTypeRef.current === "touch") evt.preventDefault()
        if (pointerTypeRef.current === "touch") lockScroll()
        draggingRef.current = true
        cancelTapRef.current = false
        movedRef.current = false
        startRotRef.current = { ...rotationRef.current }
        startPosRef.current = { x: evt.clientX, y: evt.clientY }
        const potential = (evt.target as Element).closest?.(".item__image") as HTMLElement | null
        tapTargetRef.current = potential || null
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return

        const evt = event as PointerEvent
        if (pointerTypeRef.current === "touch") evt.preventDefault()

        const dxTotal = evt.clientX - startPosRef.current.x
        const dyTotal = evt.clientY - startPosRef.current.y

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal
          if (dist2 > 16) movedRef.current = true
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        )
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity

        const cur = rotationRef.current
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY }
          applyTransform(nextX, nextY)
        }

        if (last) {
          draggingRef.current = false
          let isTap = false

          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x
            const dy = evt.clientY - startPosRef.current.y
            const dist2 = dx * dx + dy * dy
            const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true
            }
          }

          const [vMagX, vMagY] = velArr
          const [dirX, dirY] = dirArr
          let vx = vMagX * dirX
          let vy = vMagY * dirY

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement
            vx = (mx / dragSensitivity) * 0.02
            vy = (my / dragSensitivity) * 0.02
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy)
          }
          startPosRef.current = null
          cancelTapRef.current = !isTap

          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            openItemFromElement(tapTargetRef.current)
          }
          tapTargetRef.current = null

          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120)
          if (pointerTypeRef.current === "touch") unlockScroll()
          if (movedRef.current) lastDragEndAt.current = performance.now()
          movedRef.current = false
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } }
  )

  useEffect(() => {
    const scrim = scrimRef.current
    if (!scrim) return

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return
      const el = focusedElRef.current
      if (!el) return
      const parent = el.parentElement as HTMLElement
      const overlay = viewerRef.current?.querySelector(".enlarge") as HTMLElement | null
      if (!overlay) return

      const refDiv = parent.querySelector(".item__image--reference") as HTMLElement | null

      const originalPos = originalTilePositionRef.current
      if (!originalPos) {
        overlay.remove()
        if (refDiv) refDiv.remove()
        parent.style.setProperty("--rot-y-delta", `0deg`)
        parent.style.setProperty("--rot-x-delta", `0deg`)
        el.style.visibility = ""
        ;(el.style as any).zIndex = 0
        focusedElRef.current = null
        rootRef.current?.removeAttribute("data-enlarging")
        openingRef.current = false
        return
      }

      const currentRect = overlay.getBoundingClientRect()
      const rootRect = rootRef.current!.getBoundingClientRect()

      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height,
      }

      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height,
      }

      const animatingOverlay = document.createElement("div")
      animatingOverlay.className = "enlarge-closing"
      // Check if we're on mobile for proper styling
      const isMobile = window.innerWidth <= 768
      const mobileStyles = isMobile
        ? `position: absolute; left: ${overlayRelativeToRoot.left}px; top: ${overlayRelativeToRoot.top}px; width: ${overlayRelativeToRoot.width}px; height: ${overlayRelativeToRoot.height}px; z-index: 9999; border-radius: ${openedImageBorderRadius}; overflow: hidden; transition: all ${enlargeTransitionMs}ms ease-out; pointer-events: none; margin: 0; transform: none;`
        : `position: absolute; left: ${overlayRelativeToRoot.left}px; top: ${overlayRelativeToRoot.top}px; width: ${overlayRelativeToRoot.width}px; height: ${overlayRelativeToRoot.height}px; z-index: 9999; border-radius: ${openedImageBorderRadius}; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,.35); transition: all ${enlargeTransitionMs}ms ease-out; pointer-events: none; margin: 0; transform: none; filter: ${grayscale ? "grayscale(1)" : "none"};`

      animatingOverlay.style.cssText = mobileStyles

      const originalImg = overlay.querySelector("img")
      if (originalImg) {
        const img = originalImg.cloneNode() as HTMLImageElement
        img.style.cssText = "width: 100%; height: 100%; object-fit: cover;"
        animatingOverlay.appendChild(img)
      }

      overlay.remove()
      rootRef.current!.appendChild(animatingOverlay)

      void animatingOverlay.getBoundingClientRect()

      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + "px"
        animatingOverlay.style.top = originalPosRelativeToRoot.top + "px"
        animatingOverlay.style.width = originalPosRelativeToRoot.width + "px"
        animatingOverlay.style.height = originalPosRelativeToRoot.height + "px"
        animatingOverlay.style.opacity = "0"
      })

      const cleanup = () => {
        animatingOverlay.remove()
        originalTilePositionRef.current = null

        if (refDiv) refDiv.remove()
        parent.style.transition = "none"
        el.style.transition = "none"

        parent.style.setProperty("--rot-y-delta", `0deg`)
        parent.style.setProperty("--rot-x-delta", `0deg`)

        requestAnimationFrame(() => {
          el.style.visibility = ""
          el.style.opacity = "0"
          ;(el.style as any).zIndex = 0
          focusedElRef.current = null
          rootRef.current?.removeAttribute("data-enlarging")

          requestAnimationFrame(() => {
            parent.style.transition = ""
            el.style.transition = "none"

            requestAnimationFrame(() => {
              el.style.opacity = "1"
              setTimeout(() => {
                el.style.transition = ""
                el.style.opacity = ""
                openingRef.current = false
                if (!draggingRef.current && rootRef.current?.getAttribute("data-enlarging") !== "true") {
                  document.body.classList.remove("dg-scroll-lock")
                }
              }, 300)
            })
          })
        })
      }

      animatingOverlay.addEventListener("transitionend", cleanup, {
        once: true,
      })
    }

    scrim.addEventListener("click", close)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)

    return () => {
      scrim.removeEventListener("click", close)
      window.removeEventListener("keydown", onKey)
    }
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale])

  const openItemFromElement = (el: HTMLElement) => {
    if (cancelTapRef.current) return
    if (openingRef.current) return
    openingRef.current = true
    openStartedAtRef.current = performance.now()
    lockScroll()
    const parent = el.parentElement as HTMLElement
    focusedElRef.current = el
    el.setAttribute("data-focused", "true")
    const offsetX = getDataNumber(parent, "offsetX", 0)
    const offsetY = getDataNumber(parent, "offsetY", 0)
    const sizeX = getDataNumber(parent, "sizeX", 2)
    const sizeY = getDataNumber(parent, "sizeY", 2)
    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments)
    const parentY = normalizeAngle(parentRot.rotateY)
    const globalY = normalizeAngle(rotationRef.current.y)
    let rotY = -(parentY + globalY) % 360
    if (rotY < -180) rotY += 360
    const rotX = -parentRot.rotateX - rotationRef.current.x
    parent.style.setProperty("--rot-y-delta", `${rotY}deg`)
    parent.style.setProperty("--rot-x-delta", `${rotX}deg`)
    const refDiv = document.createElement("div")
    refDiv.className = "item__image item__image--reference opacity-0"
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`
    parent.appendChild(refDiv)
    const tileR = refDiv.getBoundingClientRect()
    const mainR = mainRef.current!.getBoundingClientRect()
    const frameR = frameRef.current!.getBoundingClientRect()
    originalTilePositionRef.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height,
    }
    el.style.visibility = "hidden"
    ;(el.style as any).zIndex = 0
    const overlay = document.createElement("div")
    overlay.className = "enlarge"

    // Check if we're on mobile to set the appropriate size
    const isMobile = window.innerWidth <= 768
    const overlayWidth = isMobile ? "75vw" : `${frameR.width}px`
    const overlayHeight = isMobile ? "75vh" : `${frameR.height}px`

    // Calculate position to center the overlay
    let overlayLeft, overlayTop
    if (isMobile) {
      overlayLeft = `${(window.innerWidth - window.innerWidth * 0.75) / 2}px`
      overlayTop = `${(window.innerHeight - window.innerHeight * 0.75) / 2}px`
    } else {
      overlayLeft = `${frameR.left - mainR.left}px`
      overlayTop = `${frameR.top - mainR.top}px`
    }

    // Update overlay styling - remove backdrop on mobile
    const overlayStyles = isMobile
      ? `position:absolute; left:${overlayLeft}; top:${overlayTop}; width:${overlayWidth}; height:${overlayHeight}; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:visible; display:flex; align-items:center; justify-content:center;`
      : `position:absolute; left:${overlayLeft}; top:${overlayTop}; width:${overlayWidth}; height:${overlayHeight}; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:visible; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; backdrop-filter:blur(20px); background:linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);`

    overlay.style.cssText = overlayStyles
    const rawSrc = parent.dataset.src || (el.querySelector("img") as HTMLImageElement)?.src || ""
    const rawAlt = parent.dataset.alt || (el.querySelector("img") as HTMLImageElement)?.alt || ""
    const rawWebsite = parent.dataset.website || ""
    const rawSourceCode = parent.dataset.sourceCode || ""

    const img = document.createElement("img")
    img.src = rawSrc
    img.alt = rawAlt

    // Apply image styling based on device
    const imgStyles = isMobile
      ? `width:100%; height:300px; object-fit:cover; filter:${grayscale ? "grayscale(1)" : "none"}; border-radius:${openedImageBorderRadius}; transition:transform 0.3s ease; will-change:transform;`
      : `width:100%; height:100%; object-fit:cover; filter:${grayscale ? "grayscale(1)" : "none"}; border-radius:${openedImageBorderRadius}; transition:transform 0.3s ease; will-change:transform;`

    img.style.cssText = imgStyles

    // Add hover effect for desktop
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1)"
    })
    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)"
    })

    overlay.appendChild(img)

    viewerRef.current!.appendChild(overlay)

    // Calculate initial transform based on device type
    // isMobile is already declared above
    let tx0, ty0, sx0, sy0

    if (isMobile) {
      // On mobile, calculate transform from tile to 75% viewport size
      const targetWidth = window.innerWidth * 0.75
      const targetHeight = window.innerHeight * 0.75
      const targetLeft = window.innerWidth * 0.125
      const targetTop = window.innerHeight * 0.125

      tx0 = tileR.left - targetLeft
      ty0 = tileR.top - targetTop
      sx0 = tileR.width / targetWidth
      sy0 = tileR.height / targetHeight
    } else {
      // On desktop, use original frame dimensions
      tx0 = tileR.left - frameR.left
      ty0 = tileR.top - frameR.top
      sx0 = tileR.width / frameR.width
      sy0 = tileR.height / frameR.height
    }

    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`
    requestAnimationFrame(() => {
      overlay.style.opacity = "1"
      overlay.style.transform = "translate(0px, 0px) scale(1, 1)"
      rootRef.current?.setAttribute("data-enlarging", "true")
    })
    const wantsResize = openedImageWidth || openedImageHeight
    if (wantsResize) {
      const onFirstEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return
        overlay.removeEventListener("transitionend", onFirstEnd)
        const prevTransition = overlay.style.transition
        overlay.style.transition = "none"

        // Handle mobile sizing
        const isMobile = window.innerWidth <= 768
        const tempWidth = isMobile ? "75vw" : openedImageWidth || `${frameR.width}px`
        const tempHeight = isMobile ? "75vh" : openedImageHeight || `${frameR.height}px`

        overlay.style.width = tempWidth
        overlay.style.height = tempHeight
        const newRect = overlay.getBoundingClientRect()

        // Reset to frame dimensions for transition
        overlay.style.width = isMobile ? "75vw" : `${frameR.width}px`
        overlay.style.height = isMobile ? "75vh" : `${frameR.height}px`
        void overlay.offsetWidth

        overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`

        let centeredLeft, centeredTop
        if (isMobile) {
          // Center the 75% viewport sized overlay
          centeredLeft = `${(window.innerWidth - window.innerWidth * 0.75) / 2}px`
          centeredTop = `${(window.innerHeight - window.innerHeight * 0.75) / 2}px`
        } else {
          centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2 + "px"
          centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2 + "px"
        }

        requestAnimationFrame(() => {
          overlay.style.left = centeredLeft
          overlay.style.top = centeredTop
          overlay.style.width = tempWidth
          overlay.style.height = tempHeight

          // Maintain mobile styling
          if (isMobile) {
            overlay.style.background = "transparent"
            overlay.style.backdropFilter = "none"
            overlay.style.boxShadow = "none"
          }
        })
        const cleanupSecond = () => {
          overlay.removeEventListener("transitionend", cleanupSecond)
          overlay.style.transition = prevTransition
        }
        overlay.addEventListener("transitionend", cleanupSecond, {
          once: true,
        })
      }
      overlay.addEventListener("transitionend", onFirstEnd)
    }

    // Add project buttons if links are available
    if (rawWebsite) {
      const buttons = createProjectButtons(rawWebsite, rawSourceCode)
      overlay.appendChild(buttons)
    }
  }

  useEffect(() => {
    return () => {
      document.body.classList.remove("dg-scroll-lock")
    }
  }, [])

  const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    
    .stage {
      width: 100%; height: 100%; display: grid; place-items: center;
      position: absolute; inset: 0; margin: auto;
      perspective: calc(var(--radius) * 2); perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform; position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute; top: -999px; bottom: -999px; left: -999px; right: -999px;
      margin: auto; transform-origin: 50% 50%; backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                 translateZ(var(--radius));
    }
    
    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important; pointer-events: all !important;
    }
    
    .item__image {
      position: absolute; inset: 10px;
      border-radius: var(--tile-radius, 12px); overflow: hidden; cursor: pointer;
      backface-visibility: hidden; transition: transform 300ms; pointer-events: auto;
      transform: translateZ(0);
    }
    
    .item__image--reference {
      position: absolute; inset: 10px; pointer-events: none;
    }
    
    @media (max-aspect-ratio: 1/1) {
      .viewer-frame { height: auto !important; width: 100% !important; }
    }
    
    @media (max-width: 768px) {
    .enlarge {
        width: 75vw !important;
        height: 75vh !important;
        left: 8.5vw !important;
        top: -1.5vh !important;
      }
    }

.enlarge img {
      object-fit: contain !important;
    }


  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative w-full h-full rounded-full"
        style={
          {
            ["--segments-x" as any]: segments,
            ["--segments-y" as any]: segments,
            ["--overlay-blur-color" as any]: overlayBlurColor,
            ["--tile-radius" as any]: imageBorderRadius,
            ["--enlarge-radius" as any]: openedImageBorderRadius,
            ["--image-filter" as any]: grayscale ? "grayscale(1)" : "none",
          } as React.CSSProperties
        }
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center  overflow-hidden rounded-full select-none bg-transparent"
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
          }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-website={it.website}
                  data-source-code={it.sourceCode}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={
                    {
                      ["--offset-x" as any]: it.x,
                      ["--offset-y" as any]: it.y,
                      ["--item-size-x" as any]: it.sizeX,
                      ["--item-size-y" as any]: it.sizeY,
                      top: "-999px",
                      bottom: "-999px",
                      left: "-999px",
                      right: "-999px",
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="item__image absolute block overflow-hidden cursor-pointer bg-gray-200 transition-transform duration-300"
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || "Open image"}
                    onClick={(e) => {
                      if (performance.now() - lastDragEndAt.current < 80) return
                      openItemFromElement(e.currentTarget as HTMLElement)
                    }}
                    onTouchEnd={(e) => {
                      if (performance.now() - lastDragEndAt.current < 80) return
                      openItemFromElement(e.currentTarget)
                    }}
                    style={{
                      inset: "10px",
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      className={`w-full h-full pointer-events-none ${it.alt === "Scooby Doo App" ? "" : "object-cover"}`}
                      style={{
                        backfaceVisibility: "hidden",
                        filter: `var(--image-filter, ${grayscale ? "grayscale(1)" : "none"})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={viewerRef}
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            style={{ padding: "var(--viewer-pad)" }}
          >
            <div
              ref={scrimRef}
              className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500"
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(3px)",
              }}
            />
            <div
              ref={frameRef}
              className="viewer-frame    h-full aspect-square flex"
              style={{
                borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`,
              }}
            />
          </div>
        </main>
      </div>
    </>
  )
}