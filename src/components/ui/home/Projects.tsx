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
    <div className=" md:my-20  my-10  md:p-0">
      <UITitle title="My" href="Projects" />
      <div className="  flex  justify-center  lg:h-[90vh] md:h-[700px] h-[700px]  rounded-full overflow-hidden ">
        <DomeGallery images={projectImages} segments={22} minRadius={400} openedImageWidth="300px" openedImageHeight="300px" openedImageBorderRadius="30px" overlayBlurColor="rgba(0,0,0,0.5)" grayscale={false}  />
      </div>
    </div>
  )
}