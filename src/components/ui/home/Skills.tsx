// Import additional icons for TanStack representation
import { BiTable } from "react-icons/bi"
import {
  SiApollographql,
  SiBootstrap,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGraphql,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  // Additional skill icons
  SiNodedotjs,
  SiNuxtdotjs,
  SiReact,
  SiRedux,
  SiSass,
  SiSocketdotio,
  SiStripe,
  SiStyledcomponents,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
} from "react-icons/si"
import { TbDatabaseSearch } from "react-icons/tb"

import LogoLoop from "@/components/LogoLoop"

import UITitle from "../ui-title"

// Custom TanStack icons components
const TanStackTableIcon = () => (
  <div className="relative">
    <BiTable className="text-[#FF6B35]" />
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
  </div>
)

const TanStackQueryIcon = () => (
  <div className="relative">
    <TbDatabaseSearch className="text-[#FF6B35]" />
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
  </div>
)

const techLogos = [
  // Frontend Frameworks & Libraries
  { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiVuedotjs className="text-[#4FC08D]" />, title: "Vue.js", href: "https://vuejs.org" },
  { node: <SiNuxtdotjs className="text-[#00DC82]" />, title: "Nuxt.js", href: "https://nuxt.com" },

  // Languages
  { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },

  // Styling
  { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiBootstrap className="text-[#7952B3]" />, title: "Bootstrap", href: "https://getbootstrap.com" },
  { node: <SiSass className="text-[#CC6699]" />, title: "Sass", href: "https://sass-lang.com" },
  {
    node: <SiStyledcomponents className="text-[#DB7093]" />,
    title: "Styled Components",
    href: "https://styled-components.com",
  },
  { node: <SiFramer className="text-[#0055FF]" />, title: "Framer Motion", href: "https://www.framer.com/motion" },

  // Backend & Server
  { node: <SiNodedotjs className="text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },

  // Databases
  { node: <SiMongodb className="text-[#47A248]" />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiSupabase className="text-[#3FCF8E]" />, title: "Supabase", href: "https://supabase.com" },

  // Cloud & Deployment
  { node: <SiFirebase className="text-[#FFCA28]" />, title: "Firebase", href: "https://firebase.google.com" },
  { node: <SiVercel className="text-white" />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiNetlify className="text-[#00C7B7]" />, title: "Netlify", href: "https://www.netlify.com" },

  // DevOps & Tools
  { node: <SiGit className="text-[#F05032]" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub className="text-white" />, title: "GitHub", href: "https://github.com" },

  // GraphQL & APIs
  { node: <SiGraphql className="text-[#E10098]" />, title: "GraphQL", href: "https://graphql.org" },
  {
    node: <SiApollographql className="text-[#311C87]" />,
    title: "Apollo GraphQL",
    href: "https://www.apollographql.com",
  },
  { node: <SiSocketdotio className="text-white" />, title: "Socket.IO", href: "https://socket.io" },

  // TanStack Libraries
  {
    node: <TanStackTableIcon />,
    title: "TanStack Table",
    href: "https://tanstack.com/table",
  },
  {
    node: <TanStackQueryIcon />,
    title: "TanStack Query",
    href: "https://tanstack.com/query",
  },

  // State Management
  { node: <SiRedux className="text-[#764ABC]" />, title: "Redux", href: "https://redux.js.org" },

  // Testing & Build Tools
  { node: <SiVite className="text-[#646CFF]" />, title: "Vite", href: "https://vitejs.dev" },

  // Design & Development Tools
  { node: <SiFigma className="text-[#F24E1E]" />, title: "Figma", href: "https://www.figma.com" },

  // Additional Services
  { node: <SiStripe className="text-[#635BFF]" />, title: "Stripe", href: "https://stripe.com" },
]

export default function Skills() {
  return (
    <div className=" container my-20">
      <UITitle title="skills" href=" expertise" />

      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={60}
        gap={40}
        pauseOnHover
        className="text-white"
        scaleOnHover
        fadeOut
        fadeOutColor="blue"
        ariaLabel="Technology skills and tools"
      />
    </div>
  )
}
