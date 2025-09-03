import ProfileCard from "@/components/ProfileCard";





export default function Home() {

  return (
    <div className=" flex  bg-slate-950 items-center justify-center min-h-screen">
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
  onContactClick={() => console.log('Contact clicked')}
/>
    </div>
  )
}