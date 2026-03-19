"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiX, FiMail } from "react-icons/fi";
import FollowButton from "../components/FollowButton";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"


/* ================= TYPES ================= */
type Project = {
  _id?: string;
  title: string;
  author?: string;
  image: string;
  year?: string;
  category?: string;
  description?: string;
  gallery?: string[];
};

export default function ProjectsPage() {
  const [fabOpen, setFabOpen] = useState(false);
     const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(132215);
const [contactOpen, setContactOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [phone, setPhone] = useState("");
const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  /* ================= PROJECT DATA ================= */
 const [projects, setProjects] = useState<Project[]>([]);

// ✅ ADD BELOW THIS
useEffect(() => {
  loadProjects();
}, []);

const loadProjects = async () => {
  try {
    const res = await fetch("/api/projects");
    const data = await res.json();

    console.log("PROJECTS:", data);

    if (Array.isArray(data)) {
      setProjects(data);
    } else if (data.projects) {
      setProjects(data.projects);
    } else {
      setProjects([]);
    }
  } catch (err) {
    console.error("Fetch error:", err);
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
        className="text-black/50 hover:text-black pb-2"
      >
        Services
      </Link>

      <Link
        href="/projects"
        className="font-semibold border-b-2 border-black pb-2"
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




            {/* ================= ABOUT PROJECTS ================= */}
<section className="py-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    {/* HEADING */}
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
      Our Projects
    </h2>

    {/* DESCRIPTION */}
    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-6">
      Our projects reflect a deep focus on solving real business challenges
      through thoughtful design, scalable development, and reliable digital
      solutions. Each project is carefully planned, designed, and executed to
      deliver measurable value and long-term performance.
    </p>

    <p className="text-black/100 max-w-5xl leading-relaxed text-base md:text-lg mb-10">
      From enterprise software and POS systems to custom web and mobile
      applications, our work combines technical excellence with user-centric
      design. We prioritize clarity, efficiency, and adaptability — ensuring
      every project aligns with business goals and user expectations.
    </p>

    {/* KEY HIGHLIGHTS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Business-Driven</p>
        <p className="text-black/80">
          Solutions built around real operational needs.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Scalable Architecture</p>
        <p className="text-black/80">
          Designed to grow with your business.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">User-Focused Design</p>
        <p className="text-black/80">
          Interfaces that are intuitive and efficient.
        </p>
      </div>

      <div className="border-l-2 border-blue-600 pl-4">
        <p className="font-semibold mb-1">Proven Results</p>
        <p className="text-black/80">
          Reliable performance across diverse industries.
        </p>
      </div>

    </div>

  </div>
</section>

      
            {/* ================= MAIN ================= */}
            <section className="
        max-w-7xl mx-auto
        px-4 md:px-8
        py-8 md:py-2
        grid grid-cols-1
        gap-8 md:gap-12
      ">
      
             

        {/* ================= PROJECT GRID ================= */}
<main className="col-span-12">
  <h2 className="text-xl font-semibold mb-8">
    Projects
  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
    {projects.map((project, i) => (
      <div
        key={i}
        onClick={() => setActiveProject(project)}
        className="
        group relative overflow-hidden rounded cursor-pointer
        transition-transform duration-300
        hover:scale-[1.03]
      "
      >
        {/* IMAGE */}
            <div className="relative w-full h-[320px] overflow-hidden">
         <img
  src={project.image}
  alt={project.title}
  className="w-full h-full object-cover"
/>
       </div>
       

        {/* TEXT */}
        <div className="mt-4 px-1">
  <p className="font-medium">{project.title}</p>

  <p className="text-xs text-black/60">
    {project.category}
  </p>
</div>
      </div>
    ))}
  </div>
</main>

      </section>

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

      {/* ================= PROJECT POPUP ================= */}
     {activeProject && (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">

    <div
      className="
        relative
        bg-white
        w-full
        max-w-5xl
        h-[95vh]
        rounded-2xl
        overflow-hidden
        flex
        flex-col
        md:flex-row
      "
    >

      {/* ✅ STRONG MOBILE CLOSE BUTTON */}
      <button
        onClick={() => setActiveProject(null)}
        className="
          absolute top-4 right-4
          z-20
          w-10 h-10
          rounded-full
          bg-white shadow-md
          flex items-center justify-center
          text-black
        "
      >
        <FiX size={22} />
      </button>

      {/* ================= IMAGES ================= */}
      <div
        className="
          w-full md:w-2/3
          p-4 md:p-6
          overflow-y-auto
        "
      >
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {activeProject.gallery
  ?.slice(1) // ✅ remove first image (primary)
  .map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div
        className="
          w-full md:w-1/3
          border-t md:border-t-0 md:border-l
          p-4 md:p-6
          overflow-y-auto
        "
      >
        <h3 className="text-xl font-semibold mb-2">
          {activeProject.title}
        </h3>

        <p className="text-sm text-black/60 mb-4">
          {activeProject.category} · {activeProject.year}
        </p>

        <p className="text-sm text-black/70 leading-relaxed">
  {activeProject.description}
</p>

      </div>

    </div>
  </div>
)}


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
