"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FiMail, FiX } from "react-icons/fi";


export default function ClientsDetailsPage() {
   const [fabOpen, setFabOpen] = useState(false);
   const [contactOpen, setContactOpen] = useState(false);
    const [activeClient, setActiveClient] = useState<null | {
  image: string;
  name: string;
  review: string;
}>(null);

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


      {/* ================= COVER (UNCHANGED) ================= */}
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


      {/* ================= PROFILE STRIP (UNCHANGED) ================= */}
      <section className="relative pt-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-8">

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

{/* ================= CLIENT DETAILS SECTION ================= */}
<section className="py-24 animate-page">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-3xl font-semibold text-center mb-16 text-blue-800 tracking-wide">
      Our Valued Clients & Partnerships
    </h2>

    {(() => {
      const clients = [
        {
          image: "/clients/client1.avif",
          name: "Apex Technologies",
          review:
            "Matamix delivered exceptional branding and web solutions that elevated our business presence.",
        },
        {
          image: "/clients/client2.png",
          name: "Nova Retail Group",
          review:
            "Highly professional team with outstanding attention to detail and execution.",
        },
        {
          image: "/clients/client10.webp",
          name: "Zenith Enterprises",
          review:
            "Strategic, creative, and result-driven approach. Truly impactful collaboration.",
        },
        {
          image: "/clients/client9.jpg",
          name: "UrbanEdge Solutions",
          review:
            "Reliable digital partner with measurable performance outcomes.",
        },
        {
          image: "/clients/client5.jpg",
          name: "BrightWave Media",
          review:
            "Innovative UI/UX and seamless project delivery experience.",
        },
        {
          image: "/clients/client6.jpg",
          name: "Skyline Developers",
          review:
            "Exceptional digital marketing strategies that boosted engagement significantly.",
        },
        {
          image: "/clients/client13.jpg",
          name: "GlobalCore Industries",
          review:
            "Professional execution across branding and enterprise solutions.",
        },
        {
          image: "/clients/client12.webp",
          name: "NextGen Innovations",
          review:
            "Creative excellence combined with strategic thinking.",
        },
      ];

      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {clients.map((client, i) => (
            <div
              key={i}
              onClick={() => setActiveClient(client)}
              className="
                group
                cursor-pointer
                animate-reveal
                transition-all duration-500
                hover:-translate-y-4
              "
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="
                  relative
                  w-full
                  aspect-[4/3]
                  overflow-hidden
                  rounded-2xl
                  shadow-md
                  hover:shadow-2xl
                  transition duration-500
                "
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="
                    object-cover
                    transition duration-700
                    group-hover:scale-110
                  "
                />

                {/* Premium gradient overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-black/40 via-black/10 to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition duration-500
                  "
                />
              </div>
            </div>
          ))}
        </div>
      );
    })()}

    {/* BACK BUTTON */}
    <div className="flex justify-center mt-20">
      <Link
        href="/clients"
        className="
          px-10 py-3
          rounded-full
          bg-blue-600
          text-white
          hover:bg-blue-700
          transition
          shadow-lg
          hover:shadow-xl
        "
      >
        ← Back to Clients
      </Link>
    </div>

  </div>
</section>



     

        {/* ================= FOOTER ================= */}
<footer className="bg-[#022549] text-white mt-5 md:mt-5">
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

{/* ================= CLIENT REVIEW POPUP ================= */}
{activeClient && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-6 animate-fadeIn">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setActiveClient(null)}
    />

    {/* MODAL */}
    <div
      className="
        relative
        bg-white
        max-w-lg
        w-full
        rounded-3xl
        p-10
        shadow-2xl
        text-center
        transform
        transition-all
        duration-300
        scale-95
        opacity-0
        animate-popup
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setActiveClient(null)}
        className="absolute top-5 right-5 text-xl text-gray-500 hover:text-black transition"
      >
        ✕
      </button>

      {/* CLIENT IMAGE */}
      <div className="flex justify-center mb-6">
        <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-white shadow-md transform transition duration-500 hover:scale-110">
          <Image
            src={activeClient.image}
            alt={activeClient.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* CLIENT NAME */}
      <h3 className="text-2xl font-semibold mb-4">
        {activeClient.name}
      </h3>

      {/* REVIEW */}
      <p className="text-gray-600 leading-relaxed text-lg">
        “{activeClient.review}”
      </p>

    </div>
  </div>
)}



    </div>
  );
}
