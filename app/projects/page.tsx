"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiX, FiMail } from "react-icons/fi";
import FollowButton from "../components/FollowButton";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"


/* ================= TYPES ================= */
type Project = {
  title: string;
  author: string;
  image: string;
  likes: number;
  views: number;
  year: string;
  category: string;
  description: string;
  gallery: string[];
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
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  /* ================= PROJECT DATA ================= */
   const projects: Project[] = [
    {
      title: "AMBER",
      author: "Matamix",
      image: "/projects/amb2.jpg",
      likes: 29,
      views: 276,
      year: "2024",
      category: "POS Software Solution",
      description:
        "AMBER POS Software is an advanced point-of-sale solution designed to boost business efficiency and streamline daily operations. It enables seamless sales management and accurate inventory tracking while providing real-time reporting and analytics to help businesses make informed decisions. The system includes robust customer management with integrated loyalty programs, ensuring stronger customer engagement and retention. With secure payment processing, quick billing, and easy invoicing, AMBER simplifies transactions at every touchpoint. Automated daily sales reports further enhance control and visibility, making AMBER a reliable and scalable POS solution for modern businesses looking to optimize performance and growth.",
      gallery: [
        "/projects/machine.jpg",
        "/projects/machine1.jpg",
      ],
    },
    {
      title: "GOZZBE",
      author: "Matamix",
      image: "/projects/gooz.jpg",
      likes: 112,
      views: 1340,
      year: "2023",
      category: "Laundry Management Software",
      description:
        "Gozzbe is a smart, end-to-end digital solution designed to modernize and simplify laundry business operations. Built for laundromats, dry cleaners, and laundry service providers, Gozzbe seamlessly connects customers and businesses through an intuitive mobile app and a powerful web-based management dashboard. Customers can easily place orders, track laundry status, and manage pickups or deliveries, while business owners gain full control over orders, inventory, pricing, and workflow in real time. With automated order tracking, customer management, service categorization, and data-driven insights, Gozzbe reduces manual effort, minimizes errors, and improves turnaround time.",
      gallery: [
        "/projects/laundry.jpg",
        "/projects/laundry1.jpg",
      ],
    },
    {
      title: "ZOOMIE",
      author: "Matamix",
      image: "/projects/zoom.jpg",
      likes: 87,
      views: 980,
      year: "2024",
      category: "Restaurant POS System",
      description:
        "Zoomie is an intelligent, all-in-one restaurant and hospitality POS solution designed to help businesses turn tables faster and operate smarter. Built specifically for cafés, restaurants, and food service environments, Zoomie streamlines order taking, billing, and kitchen coordination with a fast, intuitive interface that reduces wait times and improves service efficiency. Its visually rich menu system, seamless order management, and real-time synchronization between front-of-house and kitchen ensure accuracy and speed at every stage of service. Combined with powerful reporting, inventory control, and flexible payment handling, Zoomie empowers restaurant owners and staff to deliver a smoother dining experience, maximize productivity, and increase revenue — all while maintaining complete operational control.",
      gallery: [
        "/projects/hotel.jpg",
        "/projects/hotel1.jpg",
      ],
    },
    {
      title: "AMALGAMATE",
      author: "Matamix",
      image: "/projects/new _amalgamate.jpg",
      likes: 64,
      views: 720,
      year: "2023",
      category: "Custom Mobile App Solutions",
      description:
        "Amalgamate Technology’s Mobile Application Development services are designed to help businesses transform their digital presence and succeed in today’s mobile-first world. We build high-performance, user-centric mobile applications that combine intuitive design with robust functionality, ensuring seamless experiences across devices and platforms. From concept and UI/UX design to development, testing, and deployment, our solutions are fully customized to meet specific business goals and user needs. By leveraging modern technologies, data-driven insights, and continuous optimization, we create scalable mobile apps that enhance user engagement, streamline operations, and drive measurable growth.",
      gallery: [
        "/projects/new _amalgamate.jpg",
        "/projects/user.png",
      ],
    },
    {
      title: "AMBER",
      author: "Matamix",
      image: "/projects/amb1.jpg",
      likes: 64,
      views: 720,
      year: "2023",
      category: "ERP Inventory Management",
      description:
        "AMBER’s Stock Ageing Reports provide businesses with real-time visibility into inventory movement, helping them manage stock more intelligently and efficiently. By clearly identifying slow-moving and ageing items, the system enables businesses to take timely actions such as replenishment adjustments, promotions, or stock clearance to reduce wastage. With accurate insights into inventory levels, AMBER helps optimize purchasing decisions, prevent overstocking or shortages, and improve overall cash flow. The automated reporting and data-driven analysis empower decision-makers to maintain healthier inventory cycles, minimize losses, and ensure that working capital is used effectively. Designed as part of AMBER’s powerful ERP solution, stock ageing reports transform inventory management from guesswork into a strategic, controlled process.",
      gallery: [
        "/projects/amber_new.jpg",
      ],
    },
    {
      title: "DOSO",
      author: "Matamix",
      image: "/projects/doso.jpg",
      likes: 45,
      views: 560,
      year: "2022",
      category: "Enterprise ERP Software",
      description:
        "DOSO Enterprise ERP Software Solutions are designed to streamline, integrate, and optimize core business operations through a robust and scalable digital platform. Built to support growing and enterprise-level organizations, DOSO centralizes critical functions such as finance, inventory, operations, human resources, and reporting into a single, unified system. With real-time data visibility and intelligent dashboards, businesses gain better control over processes, improve decision-making, and enhance operational efficiency. The flexible, modular architecture allows organizations to customize the ERP according to their unique workflows while ensuring seamless integration across departments. Secure, scalable, and performance-driven, DOSO empowers businesses to reduce complexity, improve productivity, and build a strong foundation for long-term digital transformation.",
      gallery: [
        "/projects/disc2.jpg",
        "/projects/solutions.jpg",
      ],
    },
  ];

  return (
     <div className="
  min-h-screen
  text-black
  bg-gradient-to-br
  from-[#1e293b]
  via-[#e0e7ff]
  to-[#ffffff]
">


         {/* ================= COVER ================= */}
             <section className="relative">
               <div
                 className="
                   relative
                   h-[220px]          /* mobile */
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
      
            {/* ================= NAVBAR ================= */}
            <section className="border-b border-black/10 bg-transparent">
              <div className="max-w-7xl mx-auto px-8">
                <div className="flex gap-8 py-6 text-sm">
                  <Link href="/" className="text-black/50 hover:text-black pb-2">
                    Work
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

                   <Link
                    href="/applications"
                    className="text-black/50 hover:text-black pb-2"
                  >
                    Applications
                  </Link>

                  <Link
                    href="/websites"
                    className="text-black/50 hover:text-black pb-2"
                  >
                    Websites
                  </Link>
                </div>
              </div>
            </section>

            {/* ================= ABOUT PROJECTS ================= */}
<section className="py-16">
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
          group cursor-pointer rounded-xl overflow-hidden
          transition-all duration-500
          hover:-translate-y-2
          hover:shadow-xl
        "
      >
        {/* IMAGE WRAPPER */}
        <div className="relative w-full h-[300px] bg-white flex items-center justify-center p-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="
              object-contain
              transition-transform duration-300
              group-hover:scale-105
            "
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="relative bg-white max-w-5xl w-full h-[80vh] rounded-2xl overflow-hidden flex">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-xl text-black/60 hover:text-black"
            >
              <FiX />
            </button>

            <div className="w-2/3 p-6 overflow-y-auto grid grid-cols-2 gap-4">
              {activeProject.gallery.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="w-1/3 border-l p-6 overflow-y-auto">
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
     <footer className="bg-[#022549] text-white mt-20">

  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* BRAND */}
    <div>
      <h3 className="text-lg font-semibold mb-3">
        Matamix International
      </h3>

      <p className="text-sm text-white/70 leading-relaxed">
        A digital-first creative agency specializing in UI/UX design,
        web development, mobile applications, and digital marketing.
      </p>
    </div>

    {/* CONTACT */}
    <div>
      <h4 className="text-sm font-semibold uppercase mb-3 text-white/80">
        Contact
      </h4>

      <ul className="space-y-2 text-sm text-white/70">
        <li>Kinfra, Ramanattukara</li>
        <li>Feroke, Kozhikode</li>
        <li>+91 9605 000 694</li>
        <li>
          <a href="mailto:info@matamix.com" className="hover:text-white">
            info@matamix.com
          </a>
        </li>
      </ul>
    </div>

    {/* QUICK LINKS */}
    <div>
      <h4 className="text-sm font-semibold uppercase mb-3 text-white/80">
        Quick Links
      </h4>

      <ul className="space-y-2 text-sm text-white/70">
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/applications">Applications</Link></li>
        <li><Link href="/websites">Websites</Link></li>
        <li><Link href="/posters">Posters</Link></li>
      </ul>
    </div>

    {/* SOCIAL */}
    <div>
      <h4 className="text-sm font-semibold uppercase mb-3 text-white/80">
        Social
      </h4>

      <ul className="space-y-2 text-sm text-white/70">
        <li>
          <a
            href="https://www.instagram.com/matamix_international/"
            target="_blank"
          >
            Instagram
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=61585201327065"
            target="_blank"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://share.google/FdV8fbarNVjygU45l"
            target="_blank"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
    © {new Date().getFullYear()} Matamix International. All rights reserved.
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
