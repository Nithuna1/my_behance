import Image from "next/image";
export default function ProjectCard({
  title,
  category,
  image,
}: {
  title: string;
  category: string;
  image: string;
}) {
  return (
    <div className="group fade-up">
      
     {/* IMAGE WRAPPER */}
<div className="relative mb-6 group">

  
 <div
  className="
    relative z-10
    bg-gradient-to-br from-blue-100 to-indigo-200
    rounded-xl shadow-lg
    transform transition-transform duration-500
    group-hover:translate-x-5
    group-hover:-translate-y-5
    pointer-events-none
  "
>



    {/* IMAGE (OPPOSITE MOVE) */}
    <Image
      src={image}
      alt={title}
      width={500}
      height={400}
      className="
        w-full h-[320px] object-cover rounded-xl
        transform transition-transform duration-500
        group-hover:-translate-x-10
        group-hover:translate-y-10
        pointer-events-auto
      "
    />

    
  </div>
</div>

      {/* TEXT */}
      <h3 className="text-xl font-bold text-black transition-colors duration-300 group-hover:text-blue-600">
        {title}
      </h3>

      <p className="text-gray-500">{category}</p>
    </div>
  );
}
