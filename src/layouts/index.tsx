import { Outlet } from "react-router"

import SplashCursor from "@/components/SplashCursor"

export default function DefaultLayout() {
  return (
    <main className=" overflow-hidden bg-slate-950 ">
      <SplashCursor />
      <main className=" container mx-auto px-4  ">
        <Outlet />
      </main>
    </main>
  )
}
