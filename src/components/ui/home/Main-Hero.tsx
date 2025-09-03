import LightRays from "@/components/LightRays";
import Hero from "./hero";
import TextType from "@/components/TextType";

export default function MainHero() {
  return  <div className=" relative">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        
          className="custom-rays "
        />
        <div className=" w-full flex md:flex-row flex-col items-center gap-10 md:absolute md:left-1/2 md:-translate-x-1/2  top-[200px]  justify-between">
          <Hero className=" md:basis-1/2   basis-1 flex items-center     justify-center " />
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
            className="  md:basis-1/2 basis-1 text-center md:text-7xl text-2xl"
            cursorCharacter="|"
          />
        </div>
      </div>
}
