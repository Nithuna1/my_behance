"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiX, FiMail } from "react-icons/fi";
import FollowButton from "../components/FollowButton";

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
      image: "/projects/new_amber.jpg",
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
      image: "/projects/goooz2.jpg",
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
      image: "/projects/new_zoome.jpg",
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
      image: "/projects/amber_new.jpg",
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
     <div className="min-h-screen bg-white text-black">


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
                   src="/projects/model.jpeg"
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
      
                <span className="inline-flex items-center gap-2 mt-3 px-4 py-1 text-sm rounded-full bg-green-100 text-green-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Available Now
                </span>
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
                    href="/websites"
                    className="text-black/50 hover:text-black pb-2"
                  >
                    Websites
                  </Link>
                </div>
              </div>
            </section>
      
            {/* ================= MAIN ================= */}
            <section className="
        max-w-7xl mx-auto
        px-4 md:px-8
        py-8 md:py-12
        grid grid-cols-1 md:grid-cols-12
        gap-8 md:gap-12
      ">
      
              {/* ================= LEFT PROFILE ================= */}
              <aside className="col-span-12 md:col-span-3 space-y-10">
      
               <ul className="space-y-3 text-sm text-black/100">
                  <li>Founder & Digital Agency</li>
                  <li>Digital Marketing · UI/UX · Web</li>
                  <li>Kinfra, Ramanattukara, Feroke Kozhikode</li>
                  <li>+91 9605 000 345</li>
                  <li className="underline">info@matamix.com</li>
                </ul>
      
               {/* ACTION BUTTONS */}
                                 <div className="space-y-3">
                                   <FollowButton
                         following={following}
                         onToggle={() => {
                           // Redirect to Instagram
                           window.open(
                             "https://www.instagram.com/matamix_international/",
                             "_blank"
                           );
                         }}
                       />
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@matamix.com"
                    target="_blank"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition"
                  >
                    <FiMail /> Email
                  </a>
      
                  <a
                    href="https://www.matamix.com"
                    target="_blank"
                    className="block w-full text-center text-blue-600 border border-blue-600 py-2 rounded-full hover:bg-blue-50 transition"
                  >
                    Visit our website
                  </a>
                  </div>
      
               {/* CONTACT BOX */}
<button
  onClick={() => setContactOpen(true)}
  className="
    group
    w-full
    rounded-xl
    p-4
    border border-blue-600/40
    bg-blue-50/60
    transition-all duration-300
    shadow-sm
    hover:bg-blue-100/80
    hover:border-blue-600
    hover:-translate-y-1
    hover:shadow-md
  "
>

  <div className="flex items-center justify-between">
    <div className="text-left">
      <h3 className="font-semibold text-blue-900 mb-1">
  Connect With Our Team
</h3>
<p className="text-sm text-blue-900/70">
  Reach out to learn more about our solutions and services
</p>

    </div>

    <span className="text-blue-600 text-2xl transition-transform group-hover:translate-x-1">
      ›
    </span>
  </div>
</button>
      
      
      
                {/* STATS */}
<div className="space-y-4 text-sm">
  {[
    ["Projects", "6"],
    ["Services", "6"],
    ["Posters", "495"],
  ].map(([label, value]) => (
    <div key={label} className="flex justify-between">
      <span className="text-black/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  ))}
</div>

               {/* ON THE WEB */}
<div className="relative">

  {/* Accent bar */}
  <div className="absolute -left-3 top-0 h-full w-1 rounded-full bg-blue-600" />

  <p className="text-xs text-blue-700 mb-3 uppercase tracking-wider font-semibold">
  Our Social Presence
</p>


  <div className="border border-blue-600/40 rounded-xl divide-y divide-blue-600/20 bg-blue-50/40 backdrop-blur-sm shadow-sm">
    {[
      ["LinkedIn", "https://share.google/FdV8fbarNVjygU45l"],
      ["Instagram", "https://www.instagram.com/matamix_international/"],
      ["Facebook", "https://www.facebook.com/profile.php?id=61585201327065"],
    ].map(([name, link]) => (
      <a
        key={name}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between px-4 py-3 text-sm font-medium text-black hover:bg-blue-100/60 transition"
      >
        <span>{name}</span>
        <span className="text-blue-600">↗</span>
      </a>
    ))}
  </div>
</div>
      
                  {/* ABOUT */}
          <div className="space-y-4 pt-6 border-t border-black/10">
            <p className="text-xs text-black/40 uppercase tracking-wider">
              About
            </p>

            <p className="text-sm leading-relaxed text-black/80">
              We are a digital-first creative agency specializing in building
              strong brands and high-impact digital experiences.
            </p>

           <p className="text-sm leading-relaxed text-black/70">
  Matamix International provides end-to-end solutions across 
  UI/UX design, web development, and digital marketing, helping organizations
  grow, engage audiences, and succeed in an evolving digital landscape.
</p>
          </div>
        </aside>
      

        {/* ================= PROJECT GRID ================= */}
        <main className="col-span-12 md:col-span-9">
          <h2 className="text-xl font-semibold mb-8">
            Our Projects
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer overflow-hidden rounded"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={600}
                  className="h-[260px] w-full object-cover group-hover:scale-105 transition"
                />

                <div className="mt-3">
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
      <footer className="bg-[#022549] mt-20 py-8 text-center text-xs text-white">
        © {new Date().getFullYear()} Matamix International
      </footer>
    </div>
  );
}
