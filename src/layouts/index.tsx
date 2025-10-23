import { Outlet } from "react-router"

// import LightRays from "@/components/LightRays"
import SplashCursor from "@/components/SplashCursor"
// import GradientBlinds from "@/components/GradientBlinds"
import LightRays from "@/components/LightRays"

export default function DefaultLayout() {
  return (
    <main className=" overflow-hidden bg-slate-950 relative       ">
      <div style={{ width: "100vw" }} className=" md:absolute md:left-1/2 md:h-1/3 h-auto  md:-translate-x-1/2  top-0">
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
      </div>
      <SplashCursor />

       {/* <div className=" md:block hidden absolute left-1/2 -translate-x-1/2    w-full h-full pointer-events-none z-0   overflow-hidden ">
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={0}
          noise={0.2}
          blindCount={14}
          blindMinWidth={200}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={1}
          distortAmount={50}
          shineDirection="left"
           mixBlendMode="lighten"
          
        />
      </div> */}
      
      <main className=" container mx-auto px-4   ">
        <Outlet />
      </main>
    </main>
  )
}
