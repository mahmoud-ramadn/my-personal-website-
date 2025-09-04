import MainHero from "@/components/ui/home/Main-Hero"
import Skills from "@/components/ui/home/Skills"
import EnhancedContactUI from "@/components/ui/home/contact-me"
import Experience from "@/components/ui/home/experience"

export default function Home() {
  return (
    <>
      <MainHero />
        <Skills />
        <Experience />
        <EnhancedContactUI/>
    </>
  )
}
