"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FiMail, FiX } from "react-icons/fi";

export default function ClientsPage() {
   const [fabOpen, setFabOpen] = useState(false);
   const [contactOpen, setContactOpen] = useState(false);
  return (
   <div
  className="
    min-h-screen
    w-full
    overflow-x-hidden
    text-black
    bg-white
  "
>
 
 
 
     {/* ================= COVER ================= */}
     <section className="relative">
       <div
       className="
         relative
         sm:h-[280px]
         md:h-[340px]
         lg:h-[380px]
         w-full
         mx-8 md:mx-0
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
<section className="py-5 md:py-10">
  <div className="max-w-6xl mx-auto px-6 text-center">

   <h1 className="
  text-3xl md:text-5xl
  font-semibold
  mb-6
  text-black
  animate-fadeUp
">
  Our Clients
</h1>

    <p className="
      text-black/70 
      max-w-2xl 
      mx-auto 
      leading-relaxed 
      text-base md:text-lg
      animate-fadeUp delay-150
    ">
      We are proud to collaborate with ambitious brands and forward-thinking
      organizations. Our partnerships are built on trust, innovation, and
      measurable business impact.
    </p>

  </div>
</section>

{/* ================= CLIENT STATS ================= */}
<section className="pb-10">
  <div className="max-w-5xl mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

      <div>
        <h3 className="text-3xl font-bold text-blue-600">50+</h3>
        <p className="text-sm text-black/60">Projects Delivered</p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-blue-600">30+</h3>
        <p className="text-sm text-black/60">Happy Clients</p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-blue-600">5+</h3>
        <p className="text-sm text-black/60">Industries Served</p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-blue-600">100%</h3>
        <p className="text-sm text-black/60">Client Satisfaction</p>
      </div>

    </div>
  </div>
</section>


{/* ================= CLIENT GRID ================= */}
<section className="pb-5 md:pb-10">
  <div className="max-w-6xl mx-auto px-6">

    {(() => {
      const clients = [
        { image: "/clients/client1.avif" },
        { image: "/clients/client2.png" },
        { image: "/clients/client10.webp" },
        { image: "/clients/client9.jpg" },
        { image: "/clients/client5.jpg" },
        { image: "/clients/client6.jpg" },
        { image: "/clients/client13.jpg" },
        { image: "/clients/client12.webp" },
      ];

      return (
       <div
  className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    gap-6            /* 👈 reduced gap */
    animate-fadeUp
  "
>
  {clients.slice(0, 3).map((client, i) => (
    <div
      key={i}
      className="
        group
        flex
        justify-center
        items-center
        transition-all duration-500
      "
    >
      <div
        className="
          relative
          w-60 h-60        /* 👈 increased circle size */
          rounded-full
          overflow-hidden
          shadow-xl
          hover:shadow-2xl
          transition-all duration-500
        "
      >
        <Image
          src={client.image}
          alt="Client Logo"
          fill
          className="
            object-cover
            transition duration-500
            group-hover:scale-110
          "
        />
      </div>
    </div>
  ))}
</div>

      );
    })()}

    {/* VIEW MORE BUTTON */}
    <div className="flex justify-center mt-14">
      <Link
        href="/clients/details"
        className="
          px-10 py-3
          rounded-full
          bg-gradient-to-r
          from-blue-600 to-indigo-600
          text-white
          text-sm font-medium
          hover:scale-105
          transition duration-300
          shadow-lg
        "
      >
        View More
      </Link>
    </div>

    {/* BACK BUTTON */}
    <div className="flex justify-center mt-6">
      <Link
        href="/"
        className="
          px-8 py-3
          rounded-full
          border border-black/30
          text-sm font-medium
          text-black
          hover:bg-black
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
<footer className="bg-[#022549] text-white mt-5 md:mt-2">
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

{/* ================= FLOATING ACTION BUTTON ================= */}
<div className="fixed bottom-8 right-8 z-50">

  <div className="relative w-16 h-16">

    {/* EXPANDED BUTTONS */}
    {fabOpen && (
  <>
    {/* WhatsApp - Top */}
    <button
      onClick={() => {
        const msg =
          "Hello Matamix International,%0A%0AI would like to know more about your services.";
        window.open(
          `https://wa.me/919605000694?text=${msg}`,
          "_blank"
        );
      }}
      className="
        absolute bottom-24 right-2
        w-12 h-12 rounded-full
        bg-green-500 text-white
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        hover:scale-110
      "
    >
      <FaWhatsapp size={20} />
    </button>

    {/* Email - Middle */}
    <button
      onClick={() => {
        window.open(
          "https://mail.google.com/mail/?view=cm&fs=1&to=sales@matamix.com",
          "_blank"
        );
      }}
      className="
        absolute bottom-18 right-20
        w-12 h-12 rounded-full
        bg-white text-black
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        hover:scale-110
      "
    >
      <FiMail size={20} />
    </button>

    {/* Contact - Lower */}
    <button
      onClick={() => setContactOpen(true)}
      className="
        absolute bottom-4 right-28
        w-12 h-12 rounded-full
        bg-white text-black
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        hover:scale-110
      "
    >
      <FiMessageCircle size={20} />
    </button>
  </>
)}

    {/* MAIN PLUS BUTTON */}
    <button
      onClick={() => setFabOpen(!fabOpen)}
      className="
        w-14 h-14
        rounded-full
        bg-blue-600
        text-white
        flex items-center justify-center
        shadow-xl
        transition-transform duration-300
        hover:scale-110
      "
    >
      <FiPlus
        size={26}
        className={`transition-transform duration-300 ${
          fabOpen ? "rotate-45" : ""
        }`}
      />
    </button>

  </div>
</div>

    </div>
  );
  
}
