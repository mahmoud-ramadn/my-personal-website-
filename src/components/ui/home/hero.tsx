
import ProfileCard from "@/components/ProfileCard"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}
export default function Hero({ className }: Props) {
  return (
    <div className={cn('text',className)}>

      <ProfileCard
        name=""
        title=""
        handle="Mahmoud Ramadan"
        status="Online"
        contactText="Contact Me"
        avatarUrl="https://res.cloudinary.com/dtny7jzz1/image/upload/v1755187017/Scooby/Users/161537824_1463349770663400_7357648346111417589_n.jpg.jpg"
        showUserInfo={true}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log("Contact clicked")}
      />

    </div>
  )
}
