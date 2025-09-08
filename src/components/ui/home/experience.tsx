import BounceCards from "@/components/BounceCards"
import type { ExperienceData } from "@/components/BounceCards"

import UITitle from "../ui-title"

const experienceData: ExperienceData[] = [
  {
    id: "freelance-dev",
    title: "Freelance Developer",
    company: "Self-Employed",
    period: "2022 - Present",
    description:
      "Built websites and web applications for various clients, specializing in React and modern web technologies.",
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    backgroundColor: "#172554",
  },
  {
    id: "web-intern",
    title: "Web Development Intern",
    company: "Digital Solutions Co",
    period: "2022 - 6 months",
    description:
      "Learned full-stack development, contributed to team projects, and gained experience in agile development methodologies.",
    skills: ["HTML", "CSS", "JavaScript", "Git", "Team Collaboration"],
    backgroundColor: "#0f172a",
  },
  {
    id: "FrontEnd-Developer",
    title: "Frontend Developer - Nuxt.js Specialist",
    company: "Baianat",
    period: "2024 - 6 months",
    description:
      "Developed high-performance web applications using Nuxt.js and Vue.js ecosystem. Built responsive, SEO-optimized user interfaces, implemented server-side rendering solutions, and collaborated with design teams to deliver pixel-perfect implementations. Enhanced website performance by 40% through code optimization and modern development practices.",
    skills: [
      "Nuxt.js",
      "Vue.js",
      "TypeScript",
      "SCSS",
      "Pinia",
      "Tailwind CSS",
      "SSR/SSG",
      "API Integration",
      "Performance Optimization",
    ],
    backgroundColor: "#065f46",
  },
  {
    id: "cnc-designer",
    title: "CNC Designer & Programmer",
    company: "Precision Manufacturing Co.",
    period: "2020 - 2021",
    description:
      "Designed and programmed CNC machining operations for precision parts manufacturing. Created detailed technical drawings, optimized machining processes, and collaborated with production teams to ensure quality and efficiency.",
    skills: [
      "AutoCAD",
      "SolidWorks",
      "ArtCam",
      "CNC Programming",
      "G-Code",
      "CAM Software",
      "Technical Drawing",
      "Quality Control",
    ],
    backgroundColor: "#374151",
  },
  {
    id: "open-source",
    title: "Open Source Contributor",
    company: "Various Projects",
    period: "2021 - Present",
    description:
      "Actively contribute to open source projects, maintain libraries, and collaborate with the global developer community.",
    skills: ["Open Source", "Git", "Community", "Documentation", "Code Review"],
    backgroundColor: "#134e4a",
  },
]

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)",
]

export default function Experience() {
  return (
    <section className="container flex items-center justify-center flex-col py-16">
      <UITitle title="My" href="Experience" />
      <div className="flex items-center justify-center mt-8">
        <BounceCards
          className="custom-bounceCards"
          experiences={experienceData}
          containerWidth={800}
          containerHeight={300}
          animationDelay={1}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          enableHover={true}
        />
      </div>

      {/* Experience Legend */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <p className="text-gray-400 text-sm mb-4">
          Hover over the cards to explore my professional journey and technical expertise
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
          {experienceData.map((exp) => (
            <div key={exp.id} className="text-center">
              <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: exp.backgroundColor }} />
              <span className="text-gray-300">{exp.company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
