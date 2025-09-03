import MainHero from "@/components/ui/home/Main-Hero"
import Skills from "@/components/ui/home/Skills"
import Projects from "@/components/ui/home/projects"

export default function Home() {
  return (
    <div  className=" relative" >
      <MainHero />
        <Skills />
        <Projects />
    </div>
  )
}
