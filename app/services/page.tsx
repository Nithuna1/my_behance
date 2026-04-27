"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail, FiX, FiChevronLeft, FiChevronRight, FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"

/* ================= TYPES ================= */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  websites?: string[];
  videos?: string[];
  page?: string;
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

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();

        if (Array.isArray(data)) {
          setServices(data);
        }
      } catch (err) {
        console.log("SERVICE FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);


  const groupedServices: Service[] = [
    {
      title: "E-Commerce Solutions",
      page: "/ecommerce",
      tags: ["Shopify", "Online Store", "Payments"],
    },
    {
      title: "Ui/Ux Design",
      page: "/uiux",
      tags: ["Prototyping", "User Flows", "Product UX"],
    },
    {
      title: "Digital Marketing",
      tags: ["SEO Strategy", "Social Ads", "Analytics"],
    },
    {
      title: "Video Production",
      page: "/video-production",
      tags: ["Corporate Videos", "Product Shoots", "Brand Films"],
    },
    {
      title: "Profile",
      page: "/profile",
      tags: ["Company Profile", "Business Presentation", "Pitch Decks"],
    },
    {
      title: "Branding",
      page: "/branding",
      tags: ["Visual Identity", "Logo Design", "Brand Guidelines"],
    },
  ].map((group) => {
    const keyMap: any = {
      "E-Commerce Solutions": "ecommerce",
      "Ui/Ux Design": "uiux",
      "Digital Marketing": "digital-marketing",
      "Video Production": "video-production",
      "Profile": "profile",
      "Branding": "branding",
    };

    const items = services.filter((s: any) =>
      s.category?.includes(keyMap[group.title])
    );

    return {
      ...group,
      images: items.flatMap((i: any) => i.images || []),
      videos: items.flatMap((i: any) => i.videos || []),
      websites: items.flatMap((i: any) => i.websites || []),
    };
  });


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

      <section className="py-16 bg-[#FAFAFC] border-y border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              Transforming Ideas into Digital Realities
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl mb-4 font-light">
              We offer comprehensive digital services designed to help businesses grow,
              adapt, and succeed in an ever-evolving digital landscape. Our approach
              combines strategy, creativity, and technology to deliver solutions that
              are visually compelling, highly functional, and scalable.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-light">
              From brand identity and UI/UX design to complete digital marketing
              campaigns, we focus on building experiences that connect with users and 
              drive measurable business results, ensuring long-term value.
            </p>
          </div>

          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base">

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strategy-Driven</p>
              <p className="text-gray-500 leading-relaxed">
                Every project starts with clear goals, research, and planning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
              </div>
              <p className="font-semibold text-gray-900 mb-2 text-lg">User-Centric</p>
              <p className="text-gray-500 leading-relaxed">
                Interfaces crafted for clarity, usability, and delightful engagement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
              </div>
              <p className="font-semibold text-gray-900 mb-2 text-lg">Scalable Code</p>
              <p className="text-gray-500 leading-relaxed">
                Robust development architecture built to grow alongside your business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.36 3 3 0 11-2.67-4.57 6 6 0 118.51-2.8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.36 3 3 0 11-2.67-4.57 6 6 0 118.51-2.8z" /></svg>
              </div>
              <p className="font-semibold text-gray-900 mb-2 text-lg">Performance</p>
              <p className="text-gray-500 leading-relaxed">
                Optimized for rendering speed, reliability, and measurable results.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= MAIN GRID ================= */}
      <section className="
  max-w-7xl mx-auto
  px-4 md:px-8
  py-12
  grid grid-cols-1
  gap-6
">




        {/* ================= PORTFOLIO CATEGORIES ================= */}
        <main className="col-span-12">

          <h3 className="text-2xl font-semibold mb-8 text-gray-900 tracking-tight">Browse Service Categories</h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            {groupedServices.map((service, i) => (
              <div
                key={i}
                onClick={() => setActiveService(service)}
                className="group cursor-pointer bg-white rounded-3xl p-5 border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                <div className="grid grid-cols-3 gap-1.5 mb-5 overflow-hidden rounded-xl">
                  {service.images.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="relative overflow-hidden h-28 md:h-32 w-full">
                      <img
                        src={
                          img && img.startsWith("http")
                            ? img
                            : "/no-image.png"
                        }
                        alt="service"
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>

                <div className="px-2 pb-2">
                  <h4 className="font-semibold text-lg text-gray-900 mb-3">{service.title}</h4>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-gray-50 text-gray-600 font-medium whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>






          {/* ================= SERVICE POPUP ================= */}
          {activeService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-6">

              {/* BACKDROP */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={() => {
                  setActiveService(null);
                  setCurrentIndex(0);
                }}
              />

              {/* MODAL */}
              <div
                className="
      relative
      bg-[#FDFDFD]
      w-full
      max-w-6xl
      rounded-3xl
      p-6 md:p-10
      max-h-[95vh]
      flex
      flex-col
      shadow-2xl shadow-black/20
    "
                onClick={(e) => e.stopPropagation()}
              >

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => {
                    setActiveService(null);
                    setCurrentIndex(0);
                  }}
                  className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-red-500 hover:rotate-90 transition-all duration-300"
                >
                  <FiX size={20} />
                </button>

                {/* HEADER */}
                <div className="mb-6 pb-4 border-b border-gray-100 pr-12">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {activeService.title}
                  </h2>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 overflow-y-auto pr-2">

                  {activeService.title === "Digital Marketing" ? (

                    <div className="relative w-full">

                      {/* ================= MOBILE: ONE IMAGE + ARROWS ================= */}
                      <div className="w-full md:hidden">

                        {/* ARROWS + IMAGE ROW */}
                        <div className="flex items-center gap-2">

                          {/* LEFT ARROW - outside image */}
                          <button
                            onClick={() => setCurrentIndex((prev) => prev === 0 ? activeService.images.length - 1 : prev - 1)}
                            className="flex-shrink-0 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
                          >
                            <FiChevronLeft size={18} />
                          </button>

                          {/* IMAGE */}
                          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white">
                            <img
                              src={activeService.images[currentIndex] || "/no-image.png"}
                              alt="Digital Marketing"
                              className="w-full h-auto object-contain max-h-[60vh]"
                            />
                            {/* BOTTOM LINK */}
                            {activeService.websites?.[currentIndex] && (
                              <div className="flex justify-center py-2 border-t border-gray-100">
                                <a
                                  href={activeService.websites[currentIndex]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow hover:bg-blue-700 transition"
                                >
                                  View Profile →
                                </a>
                              </div>
                            )}
                          </div>

                          {/* RIGHT ARROW - outside image */}
                          <button
                            onClick={() => setCurrentIndex((prev) => prev === activeService.images.length - 1 ? 0 : prev + 1)}
                            className="flex-shrink-0 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
                          >
                            <FiChevronRight size={18} />
                          </button>

                        </div>

                        {/* DOT INDICATORS */}
                        <div className="flex justify-center gap-1.5 mt-3">
                          {activeService.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentIndex(idx)}
                              className={`rounded-full transition-all duration-300 ${idx === currentIndex
                                  ? "w-5 h-2 bg-blue-600"
                                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* ================= DESKTOP: 3 IMAGES + ARROWS ================= */}
                      <div className="hidden md:block relative px-14">

                        {/* LEFT ARROW */}
                        <button
                          onClick={() => setCurrentIndex((prev) => prev === 0 ? activeService.images.length - 1 : prev - 1)}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
                        >
                          <FiChevronLeft size={20} />
                        </button>

                        <div className="grid grid-cols-3 gap-4">
                          {activeService.images
                            .slice(currentIndex, currentIndex + 3)
                            .map((img, index) => {
                              const realIndex = currentIndex + index;
                              const websiteLink = activeService.websites?.[realIndex];
                              return (
                                <div key={realIndex} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
                                  <img
                                    src={img || "/no-image.png"}
                                    alt="Digital Marketing"
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                  />
                                  {websiteLink && (
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                      <a
                                        href={websiteLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-blue-600 hover:text-white transition"
                                      >
                                        View profile →
                                      </a>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>

                        {/* RIGHT ARROW */}
                        <button
                          onClick={() => setCurrentIndex((prev) => prev === activeService.images.length - 1 ? 0 : prev + 1)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
                        >
                          <FiChevronRight size={20} />
                        </button>

                      </div>

                    </div>

                  ) : (

                    /* ================= NORMAL GRID ================= */
                    <div
                      className={`grid gap-5 ${activeService.title === "Ui/Ux Design"
                          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                        }`}
                    >

                      {(activeService.title === "Video Production" || activeService.title === "Profile" ? activeService.images.slice(0, 6) : activeService.images).map((img, i) => {

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
                      border-2 border-gray-200 shadow-md bg-[#f8fafc]
                      ${activeService.title === "Ui/Ux Design"
                                ? "aspect-[4/6]"
                                : activeService.title === "Digital Marketing"
                                  ? "aspect-[3/4]"
                                  : "h-[240px] md:h-[220px]"
                              }
                    `}
                          >

                            <img
                              src={img || "/no-image.png"}
                              alt="Service Preview"
                              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                            />

                            {videoSrc && (
                              <>
                                <video
                                  src={videoSrc}
                                  muted
                                  loop
                                  playsInline
                                  autoPlay
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

                                {/* ▶ PLAY BUTTON */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <div className="
                            relative
                            w-14 h-14
                            rounded-full
                            overflow-hidden
                            border-2 border-white
                            shadow-xl
                            group-hover:scale-110
                            transition-all duration-300
                          ">
                                    <img
                                      src={img || "/no-image.png"}
                                      alt="Play Cover"
                                      className="w-full h-full object-cover"
                                    />
                                    {/* SMALL OVERLAY PLAY ICON */}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                        <span className="text-white text-xs ml-0.5">▶</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
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
                            ${activeService.title === "Video Production"
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

                {/* VIEW MORE BUTTON (Hidden for Digital Marketing) */}
                {activeService.title !== "Digital Marketing" && (
                  <div className="flex justify-center mt-6">
                    <Link
                      href={activeService?.page || "#"}
                      className="
        px-8 py-3
        rounded-full
        border border-gray-200 shadow-sm
        bg-white text-gray-800
        text-[15px] font-semibold
        hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50
        transition-all duration-300
      "
                    >
                      Explore All {activeService.title} Projects
                    </Link>
                  </div>
                )}

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


      </section>

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
