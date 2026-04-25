"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiX, FiMail, FiChevronLeft, FiPlus, FiMessageCircle, FiExternalLink, FiLayout, FiLayers, FiShield, FiTrendingUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

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
  const [contactOpen, setContactOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else if (data.projects) {
        setProjects(data.projects);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden text-black bg-white selection:bg-blue-100">
      
      {/* ================= COVER ================= */}
      <section className="relative">
        <div className="relative sm:h-[280px] md:h-[340px] lg:h-[380px] w-full">
          <Image
            src="/projects/the_profile.jpeg"
            alt="Cover"
            width={1600}
            height={400}
            priority
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ================= PROFILE STRIP ================= */}
      <section className="relative pt-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-8">
          <div className="relative -mt-22 md:-mt-30 w-12 h-12 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] md:border-[5px] border-white bg-white">
            <Image
              src="/projects/logo.jpg"
              alt="Matamix"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl font-semibold mt-4">Matamix International</h1>
        </div>
      </section>

      {/* ================= NAVBAR ================= */}
      <section className="hidden md:block border-b border-black/10 bg-transparent mt-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-8 py-6 text-sm">
            <Link href="/" className="text-black/50 hover:text-black pb-2 transition">Work</Link>
            <Link href="/websites" className="text-black/50 hover:text-black pb-2 transition">Websites</Link>
            <Link href="/services" className="text-black/50 hover:text-black pb-2 transition">Services</Link>
            <Link href="/projects" className="font-semibold border-b-2 border-black pb-2">Projects</Link>
            <Link href="/posters" className="text-black/50 hover:text-black pb-2 transition">Posters</Link>
          </div>
        </div>
      </section>

      {/* ================= MOBILE NAVBAR ================= */}
      <section className="md:hidden border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1">
            <span className={`w-6 h-[2px] bg-black transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`w-6 h-[2px] bg-black transition-opacity ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-6 h-[2px] bg-black transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </button>
        </div>
        {menuOpen && (
          <div className="flex flex-col px-4 pb-4 gap-3 text-sm animate-fadeIn">
            <Link href="/" onClick={() => setMenuOpen(false)}>Work</Link>
            <Link href="/websites" onClick={() => setMenuOpen(false)}>Websites</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href="/projects" className="font-semibold" onClick={() => setMenuOpen(false)}>Projects</Link>
            <Link href="/posters" onClick={() => setMenuOpen(false)}>Posters</Link>
          </div>
        )}
      </section>

      {/* ================= ABOUT PROJECTS ================= */}
      <section className="py-16 bg-[#FAFAFC] border-y border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              Our Projects
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl mb-4 font-light">
              We focus on solving real business challenges through thoughtful design and scalable development. Each project is carefully executed to deliver measurable value and long-term performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">
            {[
              { title: "Business-Driven", desc: "Solutions built around real operational needs.", icon: <FiLayout size={20} /> },
              { title: "Scalable Architecture", desc: "Designed to grow with your business.", icon: <FiLayers size={20} /> },
              { title: "User-Focused", desc: "Interfaces that are intuitive and efficient.", icon: <FiShield size={20} /> },
              { title: "Proven Results", desc: "Reliable performance across diverse industries.", icon: <FiTrendingUp size={20} /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>
                <p className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</p>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h3 className="text-2xl font-semibold mb-8 text-gray-900 tracking-tight">Case Studies</h3>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-black/40 font-medium">Curating projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={project._id || i}
                onClick={() => setActiveProject(project)}
                className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={project.image && project.image.startsWith("http") ? project.image : "/no-image.png"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                    <span className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium shadow-lg backdrop-blur-md">
                      View Project
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 tracking-tight mb-1">{project.title}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      

      {/* ================= PROJECT POPUP ================= */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setActiveProject(null)} />
          <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-popup">
            <button onClick={() => setActiveProject(null)} className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-red-500 hover:text-white transition-all">
              <FiX size={20} />
            </button>

            <div className="w-full md:w-2/3 p-6 md:p-10 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {activeProject.gallery?.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-black/5 shadow-sm">
                    <img src={img && img.startsWith("http") ? img : "/no-image.png"} alt="Project Gallery" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-black/5 p-6 md:p-10 overflow-y-auto bg-gray-50/50">
              <h3 className="text-2xl font-bold mb-2">{activeProject.title}</h3>
              <p className="text-sm text-blue-600 font-semibold mb-6 uppercase tracking-wider">{activeProject.category} · {activeProject.year}</p>
              <div className="w-12 h-1 bg-blue-600 mb-6 rounded-full" />
              <p className="text-gray-600 leading-relaxed font-light">{activeProject.description}</p>
            </div>
          </div>
        </div>
      )}

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
    ${!name || !email || !phone || !message
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


      {/* BACK BUTTON (MOBILE ONLY) - BELOW IMAGES */}
      <div className="md:hidden flex justify-center py-10 border-t border-black/5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium hover:bg-gray-200 transition shadow-sm"
        >
          <FiChevronLeft size={18} />
          Back to Home
        </Link>
      </div>

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
              className={`transition-transform duration-300 ${fabOpen ? "rotate-45" : ""
                }`}
            />
          </button>

        </div>
      </div>

    </div>
  );
}
