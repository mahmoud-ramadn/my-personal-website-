import MainHero from "@/components/ui/home/Main-Hero"
import Projects from "@/components/ui/home/Projects"
import Skills from "@/components/ui/home/Skills"
import EnhancedContactUI from "@/components/ui/home/contact-me"
import Experience from "@/components/ui/home/experience"

export default function Home() {
  return (
    <>
      <MainHero />
        <Skills />
        <Projects/>
        <Experience />
        <EnhancedContactUI/>
    </>
  )
}
