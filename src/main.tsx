import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"

import "@/assets/css/index.css"
import { router } from "@/router/index"
// good
createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />)
