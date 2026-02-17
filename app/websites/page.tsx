"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail } from "react-icons/fi";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"

export default function WebsitePage() {
  const [fabOpen, setFabOpen] = useState(false);
  const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(132215);
const [contactOpen, setContactOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [phone, setPhone] = useState("");


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
        className="font-semibold border-b-2 border-black pb-2"
      >
        Websites
      </Link>

      <Link
        href="/services"
        className="text-black/50 hover:text-black pb-2"
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

      <Link
        href="/applications"
        className="text-black/50 hover:text-black pb-2"
      >
        Applications
      </Link>

    </div>
  </div>
</section>

      {/* ================= ABOUT WEBSITES ================= */}
<section className="py-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    {/* HEADING */}
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
      Websites That Drive Results
    </h2>

    {/* DESCRIPTION */}
    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-6">
      We design and develop high-performing websites that combine strong visual
      identity, intuitive user experience, and modern technology. Every website
      we build is tailored to reflect your brand, engage your audience, and
      deliver measurable business outcomes.
    </p>

    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-10">
      From corporate websites and product showcases to conversion-focused
      landing pages and scalable web platforms, our websites are fast, secure,
      and fully responsive. We focus on clean design, optimized performance, and
      seamless interactions to ensure your digital presence stands out and
      performs across all devices.
    </p>

    {/* HIGHLIGHTS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Modern UI / UX</p>
        <p className="text-black/80">
          Clean, intuitive, and user-focused interfaces.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Performance Optimized</p>
        <p className="text-black/80">
          Fast loading, SEO-ready, and scalable builds.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Responsive Design</p>
        <p className="text-black/80">
          Seamless experience across mobile, tablet, and desktop.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Business-Focused</p>
        <p className="text-black/80">
          Designed to convert visitors into customers.
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

          <section id="websites">
            <h3 className="text-lg font-semibold mb-4">Websites</h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
  {
    name: "www.matamix.com",
    url: "https://matamix.com",
    image: "/projects/collage.jpg",
    video: "/video/matamix_video.mp4",
  },
  {
    name: "www.vitara.com",
    url: "https://nithuna1.github.io/vitara/index.html",
    image: "/services/business.jpg",
    video: "/video/vitara_video.mp4",
  },
  {
    name: "www.domain.com",
    url: "https://www.domainnow.com/domain-registration/?gad_source=1&gad_campaignid=2701056&gbraid=0AAAAAD_fDRToMhRNnIt7KFUKtuKgCSl_k&gclid=CjwKCAiAj8LLBhAkEiwAJjbY7xOLG6KWLXXIg4cnjCICMHdMhRqf47DijEAVrXnkoDMyWlz8Ck1JtxoC15QQAvD_BwE",
    image: "/services/digital2.jpg",
    video: "/video/domain_video.mp4",
  },
].map((site, i) => (
                <a
                 key={i}
                 href={site.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group block"
               >
                 <div className="relative h-[220px] overflow-hidden rounded-xl border border-black/10 bg-black">
               
                   {/* STATIC IMAGE */}
                   <Image
                     src={site.image}
                     alt={site.name}
                     fill
                     className="
                       object-cover
                       transition-opacity duration-500
                       group-hover:opacity-0
                     "
                   />
               
                   {/* VIDEO PREVIEW (ONLY IF EXISTS) */}
                   {site.video && (
                     <video
                       src={site.video}
                       muted
                       loop
                       playsInline
                       autoPlay
                       className="
                         absolute inset-0
                         w-full h-full
                         object-cover
                         scale-[1.05]
                         opacity-0
                         transition-opacity duration-500
                         group-hover:opacity-100
                         pointer-events-none
                       "
                     />
                   )}
               
                   {/* FALLBACK: LIVE WEBSITE PREVIEW */}
                   {!site.video && (
                     <iframe
                       src={site.url}
                       className="
                         absolute inset-0
                         w-full h-full
                         scale-[1.15]
                         opacity-0
                         transition-opacity duration-500
                         group-hover:opacity-100
                         pointer-events-none
                       "
                     />
                   )}
               
                 </div>
               
                 <div className="mt-3 flex justify-between text-sm">
                   <span className="font-medium">{site.name}</span>
                   <span className="text-black/40 group-hover:text-black transition">
                     ↗
                   </span>
                 </div>
               </a>
               
              ))}
            </div>
          </section>

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
<footer className="bg-[#022549] text-white mt-8">
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
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

  {/* EXPANDED BUTTONS */}
  {fabOpen && (
    <>
      {/* WhatsApp */}
      <button
        onClick={() => {
          const msg =
            "Hello Matamix International,%0A%0AI would like to know more about your services.";
          window.open(
            `https://wa.me/919605000694?text=${msg}`,
            "_blank"
          );
        }}
        className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <FaWhatsapp size={20} />
      </button>

     {/* Email */}
<button
  onClick={() => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=sales@matamix.com",
      "_blank"
    );
  }}
  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition"
>
  <FiMail size={20} />
</button>


      {/* Contact Modal */}
      <button
        onClick={() => setContactOpen(true)}
        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition"
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
  );
}
