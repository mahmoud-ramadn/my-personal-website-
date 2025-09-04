import MainHero from "@/components/ui/home/Main-Hero"
import Skills from "@/components/ui/home/Skills"
import EnhancedContactUI from "@/components/ui/home/contact-me"
import Experience from "@/components/ui/home/experience"
import Projects from "@/components/ui/home/projects"

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
