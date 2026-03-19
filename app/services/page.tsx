"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail, FiX } from "react-icons/fi";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"
import { useEffect } from "react";

/* ================= TYPES ================= */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  websites?: string[];
  videos?: string[]; 
};

export default function ServicePage() {
   const [fabOpen, setFabOpen] = useState(false);
  const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(132215);
const [contactOpen, setContactOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [phone, setPhone] = useState("");
const [menuOpen, setMenuOpen] = useState(false);


  const [activeService, setActiveService] = useState<Service | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

 const [services, setServices] = useState<Service[]>([]);

 useEffect(() => {
  loadServices();
}, []);

const loadServices = async () => {
  try {
    const res = await fetch("/api/services");
    const data = await res.json();

    console.log("SERVICES:", data);

    if (Array.isArray(data)) {
      setServices(data);
    } else {
      setServices([]);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

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
       
   
    

    {/* ================= NAVBAR (DESKTOP ONLY) ================= */}
<section className="hidden md:block border-b border-black/10 bg-transparent">
  <div className="max-w-7xl mx-auto px-8">
    <div className="flex gap-8 py-6 text-sm">

      <Link
        href="/"
         className="text-black/50 hover:text-black pb-2"
      >
        Work
      </Link>

      <Link
        href="/websites"
        className="text-black/50 hover:text-black pb-2"
      >
        Websites
      </Link>

      <Link
        href="/services"
       className="font-semibold border-b-2 border-black pb-2"
      >
        Services
      </Link>

      <Link
        href="/projects"
        className="text-black/50 hover:text-black pb-2"
      >
        Projects
      </Link>

      <Link
        href="/posters"
        className="text-black/50 hover:text-black pb-2"
      >
        Posters
      </Link>
    </div>
  </div>
</section>





      {/* ================= ABOUT SERVICES ================= */}

<section className="py-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    {/* HEADING */}
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
      Our Services
    </h2>

    {/* DESCRIPTION */}
    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-4">
      We offer comprehensive digital services designed to help businesses grow,
      adapt, and succeed in an ever-evolving digital landscape. Our approach
      combines strategy, creativity, and technology to deliver solutions that
      are not only visually compelling but also highly functional and scalable.
    </p>

    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-6">
      From brand identity and UI/UX design to web development, mobile
      applications, and digital marketing, we focus on building experiences that
      connect with users and drive measurable business results. Every service we
      deliver is guided by research, usability, and performance — ensuring long-term
      value rather than short-term impact.
    </p>

    {/* HIGHLIGHTS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Strategy-Driven</p>
        <p className="text-black/80">
          Every project starts with clear goals, research, and planning.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">User-Centric Design</p>
        <p className="text-black/80">
          Interfaces crafted for clarity, usability, and engagement.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Scalable Development</p>
        <p className="text-black/80">
          Robust solutions built to grow with your business.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Performance Focused</p>
        <p className="text-black/80">
          Optimized for speed, reliability, and measurable results.
        </p>
      </div>

    </div>

  </div>
</section>

 {/* ================= MAIN GRID ================= */}
     <section className="
  max-w-7xl mx-auto
  px-4 md:px-8
  py-6
  grid grid-cols-1
  gap-6
">


        

        {/* ================= RIGHT CONTENT ================= */}
<main className="col-span-12">

  <h3 className="text-lg font-semibold mb-4">Services</h3>

          {/* ===== SERVICE CARDS (3 IMAGES ONLY) ===== */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {services.map((service, i) => (
              <div
                key={i}
                className="border border-black/20 rounded p-4 hover:border-black transition bg-white"
              >
                <div className="grid grid-cols-3 gap-1 mb-4">
                  {service.images.slice(0, 3).map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt=""
                      width={200}
                      height={200}
                      className="h-24 w-full object-cover rounded-md"
                    />
                  ))}
                </div>

                <h4 className="font-medium text-base mb-1">
                  {service.title}
                </h4>

                <button
                  onClick={() => setActiveService(service)}
                  className="w-full py-2 rounded-full bg-black/5 hover:bg-black/10 text-sm font-medium transition"
                >
                  See More
                </button>
              </div>
            ))}
          </div>


 {/* ================= SERVICE POPUP ================= */}
{activeService && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => {
        setActiveService(null);
        setCurrentIndex(0);
      }}
    />

    {/* MODAL */}
   <div
  className="
    relative
    bg-white
    w-full
    max-w-6xl
    rounded-2xl
    p-6 md:p-8
    max-h-[95vh]
    flex
    flex-col
  "
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={() => {
          setActiveService(null);
          setCurrentIndex(0);
        }}
        className="absolute top-5 right-5 text-xl hover:scale-110 transition"
      >
        <FiX />
      </button>

      {/* TITLE */}
      <h2 className="text-2xl font-semibold mb-6">
        {activeService.title}
      </h2>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto">

        {activeService.title === "Digital Marketing" ? (

  <div className="relative w-full flex items-center justify-center">

    {/* LEFT ARROW */}
   <button
  onClick={() =>
    setCurrentIndex((prev) =>
      prev === 0
        ? activeService.images.length - 1
        : prev - 1
    )
  }
  className="
    absolute left-0 top-1/2 -translate-y-1/2
    z-20
    text-4xl
    text-gray-700
    hover:text-black
    transition
  "
>
  ❮
</button>

    {/* ================= MOBILE: ONE IMAGE ================= */}
    <div className="w-full md:hidden flex justify-center">

      <div className="relative w-[90%] aspect-[3/4] rounded-xl overflow-hidden group">

        <Image
          src={activeService.images[currentIndex]}
          alt="Digital Marketing"
          fill
          className="object-cover"
        />

        {activeService.videos?.[currentIndex] && (
          <video
            src={activeService.videos[currentIndex]}
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {activeService.websites?.[currentIndex] && (
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href={activeService.websites[currentIndex]}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-sm font-medium bg-white/90 text-black backdrop-blur-md shadow-lg"
            >
              View Profile →
            </a>
          </div>
        )}

      </div>

    </div>

    {/* ================= DESKTOP: 3 IMAGES ================= */}
    <div className="hidden md:grid md:grid-cols-3 gap-5 w-full px-12">

      {activeService.images
        .slice(currentIndex, currentIndex + 3)
        .map((img, index) => {

          const realIndex = currentIndex + index;
          const websiteLink = activeService.websites?.[realIndex];
          const videoSrc = activeService.videos?.[realIndex];

          return (
            <div key={realIndex}>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden group">

                <Image
                  src={img}
                  alt="Digital Marketing"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {videoSrc && (
                  <video
                    src={videoSrc}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
                  />
                )}

               {websiteLink && (
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
    <a
      href={websiteLink}
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-2.5 rounded-full text-sm font-medium bg-white/90 text-black backdrop-blur-md shadow-lg"
    >
      View profile →
    </a>
  </div>
)}

              </div>
            </div>
          );
        })}

    </div>

    {/* RIGHT ARROW */}
    <button
  onClick={() =>
    setCurrentIndex((prev) =>
      prev === activeService.images.length - 1
        ? 0
        : prev + 1
    )
  }
  className="
    absolute right-0 top-1/2 -translate-y-1/2
    z-20
    text-4xl
    text-gray-700
    hover:text-black
    transition
  "
>
  ❯
</button>

  </div>

) : (

          /* ================= NORMAL GRID ================= */
          <div
            className={`grid gap-5 ${
              activeService.title === "Ui/Ux Design"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}
          >

            {activeService.images.map((img, i) => {

              const websiteLink = activeService.websites?.[i];
              const videoSrc = activeService.videos?.[i];

              const Card = (
                <div
                  className={`
                    relative
                    w-full
                    rounded-xl
                    overflow-hidden
                    group
                    cursor-pointer
                    transition
                    ${
                      activeService.title === "Ui/Ux Design"
                        ? "aspect-[4/6]"
                        : activeService.title === "Digital Marketing"
                        ? "aspect-[3/4]"
                        : "h-[220px]"
                    }
                  `}
                >

                  <Image
                    src={img}
                    alt="Service Preview"
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                 {videoSrc && (
  <video
    src={videoSrc}
    muted={true}
    loop
    playsInline={true}
    autoPlay={true}
    preload="auto"
    className="
      absolute inset-0
      w-full h-full
      object-cover
      transition duration-500
      opacity-100
      md:opacity-0
      md:group-hover:opacity-100
    "
  />
)}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500" />

                  {websiteLink && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                      <span
                        className={`
                          px-5 py-2
                          rounded-full
                          text-sm
                          font-medium
                          shadow-lg
                          backdrop-blur-md
                          transition
                          ${
                            activeService.title === "Video Production"
                              ? "bg-white/90 text-black hover:bg-black hover:text-white"
                              : "bg-white text-blue-600 hover:bg-gray-800 hover:text-white"
                          }
                        `}
                      >
                        {activeService.title === "Video Production"
                          ? "View Project"
                          : "Explore Site"}
                      </span>
                    </div>
                  )}

                </div>
              );

              return (
                <div key={i}>
                  {websiteLink ? (
                    <a
                      href={websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Card}
                    </a>
                  ) : (
                    Card
                  )}
                </div>
              );
            })}

          </div>
        )}
      </div>

      

    </div>
  </div>
)}
</main>

{contactOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    {/* MODAL */}
    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl">

      {/* CLOSE */}
      <button
        onClick={() => setContactOpen(false)}
        className="absolute top-4 right-4 text-black/40 hover:text-black text-xl"
      >
        ✕
      </button>

      <div className="p-8 space-y-5">

        <h2 className="text-xl font-semibold">
          Contact Matamix International
        </h2>

        {/* NAME */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />

        {/* PHONE */}
<input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="Your phone number"
  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
/>


        {/* MESSAGE */}
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your requirement..."
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />

        {/* SEND MAIL */}
        <button
  disabled={!name || !email || !phone || !message}
  onClick={() => {
    if (!name || !email || !phone || !message) return;

    const subject = "Contact Inquiry – Matamix International";
    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `;

    window.location.href =
      `mailto:sales@matamix.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }}
  className={`
    w-full py-3 rounded-full font-medium transition
    ${
      !name || !email || !phone || !message
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }
  `}
>
  Send Message
</button>

        {/* HELPER TEXT */}
       {(!name || !email || !phone || !message) && (
  <p className="text-xs text-red-500 text-center">
    Please fill all fields to send the message
  </p>
)}


      </div>
    </div>
  </div>
)}


      </section>

      {/* ================= FOOTER ================= */}
<footer className="bg-[#022549] text-white mt-4">
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
