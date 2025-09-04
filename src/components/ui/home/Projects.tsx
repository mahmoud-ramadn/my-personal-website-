import alsmasy from "@/assets/images/project/almasy.png";
import Diatatan from "@/assets/images/project/diataftan.png";
import petCar from "@/assets/images/project/pet-care.png";
import Shope from "@/assets/images/project/shope.png";
import UI from "@/assets/images/project/ui.png";
import DomeGallery from "@/components/DomeGallery";



import UITitle from "../ui-title";





// Define your projects with images and links
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

]

export default function Projects() {
  return (
    <div className=" my-20">
      <UITitle title="My" href="Projects" />
      <div className="  flex  justify-center  h-[700px] rounded-full overflow-hidden ">
        <DomeGallery images={projectImages} overlayBlurColor="rgba(0,0,0,0.5)" grayscale={false} fit={0.5} />
      </div>
    </div>
  )
}