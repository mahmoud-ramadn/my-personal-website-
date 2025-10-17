import ScrollDownArrow from "@/components/ui/ScrollDownArrow"
import Hero from "@/components/ui/home/hero"

import TextType from "@/components/TextType"

export default function MainHero() {
  return (
    <div className="  relative  md:pt-40">
      <div className=" container mx-auto w-full flex md:flex-row flex-col items-center gap-10  justify-around">
        <Hero className=" md:basis-1/2   basis-1 flex items-center  " />
        <TextType
          text={[
            "Hi, I'm Mahmoud Ramadan",
            "A Front-End Developer",
            "Specialized in React, Vue & Nuxt",
            "Passionate about building modern web apps",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          className="  md:basis-1/2 basis-1 text-center md:text-7xl     text-2xl"
          cursorCharacter="|"
        />
      </div>


      
      <ScrollDownArrow targetSelector="#skills" />
    </div>
  )
}
