type Props = {
  title: string
  href?:string
}

export default function UITitle({ title, href }: Props) {
  return (
    <h2 className="text-5xl md:text-7xl font-bold my-20">
      <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
        {title} &
      </span>
      <br />
      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        {href}
      </span>
    </h2>
  )
}
