import { Outlet } from "react-router"

import LightRays from "@/components/LightRays"
import SplashCursor from "@/components/SplashCursor"

export default function DefaultLayout() {
  return (
    <main className=" overflow-hidden bg-slate-950 relative  md:pt-[200px]  ">
      <div style={{ width: "100vw" }} className=" md:absolute md:left-1/2 md:h-1/3  md:-translate-x-1/2  top-0">
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
      <main className=" container mx-auto px-4   ">
        <Outlet />
      </main>
    </main>
  )
}
