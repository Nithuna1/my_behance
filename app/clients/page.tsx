"use client";

import Image from "next/image";
import Link from "next/link";

export default function ClientsPage() {
  return (
   <div
   className="
     min-h-screen
     w-full
     overflow-x-hidden   /* 👈 MOST IMPORTANT */
     text-black
     bg-gradient-to-br
     from-[#1e293b]
     via-[#e0e7ff]
     to-[#ffffff]
   "
 >
 
 
 
     {/* ================= COVER ================= */}
     <section className="relative">
       <div
       className="
         relative
         h-[240px] 
         sm:h-[280px]
         md:h-[340px]
         lg:h-[380px]
         w-full
       "
     >
     
         <Image
       src="/projects/the_profile.jpeg"
       alt="Cover"
       width={1600}
       height={400}
       priority
       className="
       max-w-full
       h-full
       object-cover
       scale-110
       -translate-x-6
       md:scale-100
       md:translate-x-0
     "
     />
     
       </div>
     </section>
     
     
     
     
        {/* ================= PROFILE STRIP ================= */}
     <section className="relative pt-16 bg-transparent">
       <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-8">
     
         {/* LOGO */}
         <div
           className="
             relative
             -mt-22 md:-mt-30
             w-12 h-12 md:w-24 md:h-24
             rounded-full overflow-hidden
             border-[3px] md:border-[5px]
             border-white
           "
         >
           <Image
             src="/projects/logo.jpg"
             alt="Matamix"
             fill
             className="object-cover"
             priority
           />
         </div>
     
         <h1 className="text-3xl font-semibold mt-4">
           Matamix International
         </h1>
     
       </div>
     </section>
     

      {/* ================= TITLE ================= */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Our Clients
          </h1>

          <p className="text-black/70 max-w-2xl mx-auto leading-relaxed">
            We are proud to collaborate with ambitious brands and forward-thinking
            organizations. Our partnerships are built on trust, innovation, and
            measurable business impact.
          </p>
        </div>
      </section>

    {/* ================= CLIENT GRID ================= */}
<section className="pb-20">
  <div className="max-w-7xl mx-auto px-6">

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

      {[
        "/clients/client1.avif",
        "/clients/client2.png",
        "/clients/client10.webp",
        "/clients/client9.jpg",
        "/clients/client5.jpg",
        "/clients/client6.jpg",
        "/clients/client13.jpg",
        "/clients/client12.webp",
      ].map((logo, i) => (
        <div
          key={i}
          className="
            flex items-center justify-center
            transition-all duration-300
            hover:scale-105
          "
        >
          <Image
            src={logo}
            alt="Client Logo"
            width={300}
            height={180}
            className="
              w-full
              h-[160px]
              object-cover
              rounded-lg
              transition duration-300
            "
          />
        </div>
      ))}

    </div><br></br>

    {/* BACK BUTTON */}
    <div className="flex justify-center mt-12">
      <Link
        href="/"
        className="
          px-8 py-3
          rounded-full
          border border-black/40
          text-sm font-medium
          text-black
          hover:bg-blue-600
          hover:border-blue-600
          hover:text-white
          transition
        "
      >
        ← Back to Home
      </Link>
    </div>

  </div>
</section>


      {/* ================= FOOTER ================= */}
<footer className="bg-[#022549] text-white mt-14">
  <div className="max-w-7xl mx-auto px-6 py-8 flex justify-center">

    <div
      className="
        inline-flex flex-col items-center gap-2
        px-7 py-4 rounded-xl
        bg-white/10 backdrop-blur
        border border-white/20
        shadow-md
      "
    >
     {/* PHONE */}
<p className="text-sm font-medium text-white">
  📞{" "}
  <a
    href="tel:+91 9605 000 694"
    className="hover:underline"
  >
    +91 9605 000 694
  </a>
</p>


      {/* EMAIL */}
      <p className="text-sm font-medium">
        ✉️{" "}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=info@matamix.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          info@matamix.com
        </a>
      </p>
    </div>

  </div>
</footer>


    </div>
  );
  
}
