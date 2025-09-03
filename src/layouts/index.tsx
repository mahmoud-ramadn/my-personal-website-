import { Outlet } from "react-router"


export default function DefaultLayout() {
  return (
    <main className="min-h-screen  overflow-hidden bg-slate-950 ">
      <main className=" container mx-auto px-4 ">
        <Outlet />
      </main>
    </main>
  )
}
