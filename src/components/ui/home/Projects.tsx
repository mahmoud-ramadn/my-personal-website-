import alsmasy from "@/assets/images/project/almasy.webp"
import damain from "@/assets/images/project/daman.webp"
import Dashbord from "@/assets/images/project/dashbord.webp"
import Diatatan from "@/assets/images/project/diataftan.webp"
import furion from "@/assets/images/project/furion.webp"
import Offern from "@/assets/images/project/offern&cash.webp"
import petCar from "@/assets/images/project/pet-care.webp"
import Shope from "@/assets/images/project/shope.webp"
import todo from "@/assets/images/project/todo.webp"
import UI from "@/assets/images/project/ui.webp"
import Vue from "@/assets/images/project/vue.webp"
import Welcom from "@/assets/images/project/welcom.webp"
import DomeGallery from "@/components/DomeGallery"

import UITitle from "../ui-title"

const projectImages = [
  {
    src: petCar,
    alt: "Portfolio Website",
    website: "https://pet-care-website-amber.vercel.app/",
    sourceCode: "https://github.com/mahmoud-ramadn/Pet-care-Website",
  },
  {
    src: Shope,
    alt: "Scooby Doo App",
    website: "https://shop-co-ecommerce-beige.vercel.app/",
    sourceCode: "https://github.com/mahmoud-ramadn/Shop_CoEcommerce",
  },
  {
    src: Diatatan,
    alt: "Task Management App",
    website: "https://diyafatina-website.vercel.app/",
    sourceCode: "https://github.com/mahmoud-ramadn/Diyafatina-Website",
  },
  {
    src: UI,
    alt: "E-commerce Platform",
    website: "https://ui-traning.vercel.app/",
    sourceCode: "https://github.com/mahmoud-ramadn/UI_Traning",
  },
  {
    src: alsmasy,
    alt: "Dashboard Analytics",
    website: "https://almaseya.net/",
    sourceCode: "https://github.com/mahmoud-ramadn/Almaseya",
  },
  {
    src: Welcom,
    alt: "Dashboard Analytics",
    website: "https://welcom-ymlp-qi4iy0qvt-mahmoud-ramadans-projects.vercel.app/",
    sourceCode: "https://github.com/mahmoud-ramadn/Welcom",
  },
  {
    src: Vue,
    alt: "Dashboard Analytics",
    website: "https://vue-proj-876nb2ci7-mahmoud-ramadans-projects.vercel.app/",
    sourceCode: "https://github.com/mahmoud-ramadn/Vue-Project",
  },
  {
    src: furion,
    alt: "Dashboard Analytics",
    website: "https://furniro-livid.vercel.app/",
    sourceCode: "https://github.com/mahmoud-ramadn/Furniro",
  },
  {
    src: todo,
    alt: "Dashboard Analytics",
    website: "https://vue-todolist-beryl.vercel.app/",
    sourceCode: "https://github.com/mahmoud-ramadn/vueTodolist",
  },
  {
    src: damain,
    alt: "Dashboard Analytics",
    website: "https://dhameen.sa/",
    sourceCode: "https://github.com/mahmoud-ramadn/",
  },
  {
    src: Dashbord,
    alt: "Dashboard Analytics",
    website: "https://pet-care-website-amber.vercel.app/admin-dashboard",
    sourceCode: "https://github.com/mahmoud-ramadn/Pet-care-Website",
  },
  {
    src: Offern,
    alt: "Dashboard Analytics",
    website: "https://offern.sa/",
    sourceCode: "https://github.com/mahmoud-ramadn",
  },
]

export default function Projects() {
  return (
    <div className=" md:my-20  my-10  md:p-0">
      <UITitle title="My" href="Projects" />
      <div className="  flex  justify-center  lg:h-[90vh] md:h-[700px] h-[70vh]  rounded-full overflow-hidden ">
        <DomeGallery
          images={projectImages}
          segments={22}
           minRadius={400}
          openedImageWidth="max-w-[700px]"
          openedImageHeight="max-h-[700px]"
          openedImageBorderRadius="30px"
          overlayBlurColor="rgba(0,0,0,0.5)"
          grayscale={false}
        />
      </div>
    </div>
  )
}
