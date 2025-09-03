import SplashCursor from "@/components/SplashCursor"
import { Outlet } from "react-router"


export default function DefaultLayout() {
  return (
    <main className=" overflow-hidden bg-slate-950 ">
      <SplashCursor/>
      <main className=" container mx-auto px-4 min-h-screen ">
        <Outlet />
      </main>
    </main>
  )
}
