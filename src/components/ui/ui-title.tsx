import { Sparkles } from "lucide-react"

type Props = {
  title: string
  href?: string
  className ?: string
  }


export default function UITitle({ title, href,className }: Props) {
  return (
    <div className={`text-center  py-10 relative px-2 sm:px-4 ${className}`}>
      <div className="relative">
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-8 sm:max-w-10 md:max-w-20"></div>
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-blue-400 animate-pulse" />
          <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-8 sm:max-w-10 md:max-w-20"></div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
          {title} <span className="text-white drop-shadow-2xl">{href}</span>
        </h2>
      </div>
    </div>
  )
}
