import { createBrowserRouter } from "react-router"

import DefaultLayout from "../layouts"
import Home from "@/pages"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "",
        Component: Home,
      },
    ],
  },
])
