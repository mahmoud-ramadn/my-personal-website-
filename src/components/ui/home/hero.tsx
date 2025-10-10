import { cn } from "@/lib/utils"

import ProfileCard from "@/components/ProfileCard"
import myIMag from "@/assets/images/mynewImage (2).webp"

type Props = {
  className?: string
}
export default function Hero({ className }: Props) {
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className={cn("text", className)}>
      <ProfileCard
        name=""
        title=""
        handle="Mahmoud Ramadan"
        status="Online"
        contactText="Contact Me"
        avatarUrl={myIMag}
        showUserInfo={true}
        enableTilt={true}
        showBehindGradient={true}
        enableMobileTilt={false}
        onContactClick={handleContactClick}
      />
    </div>
  )
}
