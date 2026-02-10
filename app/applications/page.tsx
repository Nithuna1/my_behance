"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail } from "react-icons/fi";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

/* ================= APPLICATION DATA ================= */
const applications = [
  {
    name: "Business ERP App",
    image: "/mobile/home.png",
    description:
      "A complete ERP mobile solution to manage sales, purchases, expenses, and real-time business analytics."
  },
  {
    name: "Shop Management App",
    image: "/mobile/shop.png",
    description:
      "Mobile-first shop management app to track daily revenue, branch performance, and inventory."
  },
  {
    name: "Accounting & Finance App",
    image: "/mobile/analytics.png",
    description:
      "Smart accounting application with cash book, day book, profit analysis, and balance insights."
  },
  {
    name: "Analytics Dashboard App",
    image: "/mobile/trade.png",
    description:
      "Advanced analytics dashboard offering business insights, growth tracking, and performance reports."
  }
];

export default function ApplicationsPage() {
    const [selectedApp, setSelectedApp] = useState(null);
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
        h-[175px]          /* mobile */
        sm:h-[280px]       /* small tablets */
        md:h-[340px]       /* tablets */
        lg:h-[380px]       /* desktop */
        w-full
      "
    >
      <Image
        src="/projects/the_profile.jpeg"
        alt="Cover"
        fill
        priority
        className="object-cover"
      />
    </div>
  </section>
      
            {/* ================= PROFILE STRIP ================= */}
            <section className="relative pt-16 bg-transparent">
              <div className="max-w-7xl mx-auto px-8">
      
                <div className="relative -mt-35 w-28 h-28 rounded-full overflow-hidden border-[5px] border-white">
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
        className="font-semibold border-b-2 border-black pb-2"
      >
        Applications
      </Link>

    </div>
  </div>
</section>

  
            {/* ================= ABOUT APPLICATIONS ================= */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    {/* HEADING */}
   <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
  Mobile App Solutions
</h2>


    {/* DESCRIPTION */}
    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-6">
      Our mobile applications are designed to help businesses operate smarter,
      faster, and more efficiently in a mobile-first world. We build powerful,
      user-friendly applications that simplify complex workflows, provide
      real-time insights, and improve everyday decision-making.
    </p>

    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-10">
      From ERP and accounting solutions to analytics dashboards and management
      tools, our applications combine intuitive user experiences with secure,
      scalable architecture. Every app is crafted to deliver performance,
      reliability, and long-term value across Android and iOS platforms.
    </p>

    {/* KEY HIGHLIGHTS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Business-Focused</p>
        <p className="text-black/80">
          Built to solve real operational challenges.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Real-Time Insights</p>
        <p className="text-black/80">
          Live data, reports, and performance tracking.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Scalable & Secure</p>
        <p className="text-black/80">
          Designed for growth, stability, and data safety.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">User-Centric Design</p>
        <p className="text-black/80">
          Clean interfaces for seamless usability.
        </p>
      </div>

    </div>

  </div>
</section>

      
            {/* ================= MAIN GRID ================= */}
            <section className="
        max-w-7xl mx-auto
        px-4 md:px-8
        py-8 md:py-2
        grid grid-cols-1 md:grid-cols-12
        gap-8 md:gap-12">
      
              
        {/* ================= RIGHT CONTENT ================= */}
        <main className="col-span-12">


          <h3 className="text-lg font-semibold mb-8">
            Mobile Applications
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {applications.map((app, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl border border-black transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
              >
                <div className="group cursor-pointer">
  {/* IMAGE ONLY */}
  <div className="relative w-full h-[360px]">
    <Image
      src={app.image}
      alt={app.name}
      fill
      className="
        object-contain
        transition-transform duration-500
        group-hover:scale-105
      "
    />
  </div>
</div>


                <div className="px-5 pb-6">
                  <h4 className="font-semibold mb-2">{app.name}</h4>
                  <p className="text-sm text-black/70">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
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
