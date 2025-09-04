import BounceCards from "@/components/BounceCards"
import type { ExperienceData } from "@/components/BounceCards"

import UITitle from "../ui-title"

const experienceData: ExperienceData[] = [
  {
    id: "ai-trainee",
    title: "AI Trainee",
    company: "Tech Innovators Inc",
    period: "2023 - 2024",
    description:
      "Worked on machine learning projects, developed AI models, and learned about neural networks and deep learning frameworks.",
    skills: ["Python", "TensorFlow", "Machine Learning", "Data Analysis", "Neural Networks"],
    backgroundColor: "#1e293b",
  },
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
    id: "startup-founder",
    title: "Startup Co-Founder",
    company: "InnovateTech Solutions",
    period: "2023 - Present",
    description:
      "Co-founded a tech startup focused on innovative web solutions. Led development team and managed client relationships.",
    skills: ["Leadership", "Business Development", "Full-Stack", "Project Management"],
    backgroundColor: "#1e1b4b",
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
