  "use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMail, FiX } from "react-icons/fi";
import FollowButton from "./components/FollowButton";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import PostersSection from "./components/PostersSection";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";




/* ✅ ADD TYP--*required for popup) */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  websites?: string[];
  videos?: string[];
  page?: string; // ✅ ADD THIS
};


type Project = {
  _id?: string; // ✅ ADD THIS
  title: string;
  author?: string;
  image?: string;
  year?: string;
  category?: string;
  description?: string;
  gallery?: string[];
};

type MobileApp = {
  _id?: string;
  title: string;
  image: string;
  fullDescription: string;
  features: string[];
  bestFor: string;
  gallery?: string[];
};


export default function Home() {
  const [fabOpen, setFabOpen] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(132215);
  const [contactOpen, setContactOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);




  /* ✅ ADD STATE */
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeMobileApp, setActiveMobileApp] = useState<MobileApp | null>(null);
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [apps, setApps] = useState<MobileApp[]>([]);

  const [websites, setWebsites] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);



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
  ].map((group) => {
    const keyMap: any = {
      "E-Commerce Solutions": "ecommerce",
      "Ui/Ux Design": "uiux",
      "Digital Marketing": "digital-marketing",
      "Video Production": "video-production",
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

  useEffect(() => {
    loadWebsites();
    loadServices();
    loadProjects();
  }, []);

  const loadWebsites = async () => {
    try {
      const res = await fetch("/api/websites");
      const data = await res.json();

      if (Array.isArray(data)) {
        setWebsites(data);
      } else if (data.websites) {
        setWebsites(data.websites);
      } else {
        setWebsites([]);
      }
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  const loadServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();

      if (Array.isArray(data)) {
        setServices(data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.log("SERVICE FETCH ERROR:", err);
    }
  };

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
      console.log("PROJECT FETCH ERROR:", err);
    }
  };


  useEffect(() => {
    const loadApps = async () => {
      try {
        const res = await fetch("/api/apps");
        const data = await res.json();

        console.log("DYNAMIC APPS:", data);

        if (Array.isArray(data)) {
          setApps(data);
        }
      } catch (err) {
        console.error("Error loading apps:", err);
      }
    };

    loadApps();
  }, []);




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
              className="font-semibold border-b-2 border-black pb-2"
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

          </div>
        </div>
      </section>



      {/* ================= ABOUT ================= */}
      <section className="relative py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-6 md:gap-12 items-center">

          {/* LEFT – TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
              We build digital products <br />
              that grow businesses
            </h2>

            <p className="text-black/100 leading-relaxed mb-6 max-w-xl">
              Matamix International is a digital-first technology company specializing
              in UI/UX design, web development, mobile applications, ERP solutions,
              and digital marketing. We work with startups, enterprises, and growing
              brands to design and build scalable digital experiences that deliver
              real business impact.
            </p>

            <p className="text-black/100 leading-relaxed mb-8 max-w-xl">
              From strategy and design to development and deployment, our approach is
              focused on clarity, performance, and long-term value. Every solution we
              create is driven by user needs, data insights, and modern technology.
            </p>

            <Link href="/clients"
              className="
          inline-flex items-center gap-2
          px-8 py-3 rounded-full
          bg-blue-600 text-white font-medium
          hover:bg-blue-700
          transition
          shadow-[0_12px_30px_rgba(37,99,235,0.35)]
        "
            >
              Our Happy Customers →
            </Link>
          </div>

          {/* RIGHT – STATS / HIGHLIGHTS */}
          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-2xl bg-white/60 backdrop-blur-md p-6 border border-black/10">
              <h3 className="text-3xl font-semibold mb-1">20+</h3>
              <p className="text-sm text-black/70">Projects Delivered</p>
            </div>

            <div className="rounded-2xl bg-white/60 backdrop-blur-md p-6 border border-black/10">
              <h3 className="text-3xl font-semibold mb-1">5+</h3>
              <p className="text-sm text-black/70">Years Experience</p>
            </div>

            <div className="rounded-2xl bg-white/60 backdrop-blur-md p-6 border border-black/10">
              <h3 className="text-3xl font-semibold mb-1">30+</h3>
              <p className="text-sm text-black/70">Active Clients</p>
            </div>

            <div className="rounded-2xl bg-white/60 backdrop-blur-md p-6 border border-black/10">
              <h3 className="text-3xl font-semibold mb-1">100%</h3>
              <p className="text-sm text-black/70">Client Satisfaction</p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= MAIN ================= */}
      <section className="
  max-w-7xl mx-auto
  px-4 md:px-8
 py-4 md:py-6 grid grid-cols-1 gap-6 md:gap-10
">


        {/* ================= RIGHT CONTENT ================= */}
        <main className="col-span-12">

          {/* ================= OUR WEBSITES ================= */}
          <section className="mt-4">
            <h3 className="text-lg font-semibold mb-5">Websites</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

              {websites.length === 0 && (
                <p className="text-gray-500">No websites found</p>
              )}

              {websites.map((site, i) => (
                <a
                  key={site._id || i}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {/* IMAGE CONTAINER */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-black">

                    {/* IMAGE */}
                    <img
                      src={
                        site.image && site.image.startsWith("http")
                          ? site.image
                          : "/placeholder.jpg"
                      }
                      alt={site.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                    {/* VIDEO */}
                    {site.video && (
                      <video
                        src={site.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                      />
                    )}

                  </div>

                  {/* TEXT */}
                  <div className="mt-3 flex justify-between items-center text-sm px-1">
                    <span className="font-medium truncate">
                      {site.name}
                    </span>
                    <span className="text-black/40 group-hover:text-black transition">
                      ↗
                    </span>
                  </div>
                </a>
              ))}

            </div>

            {/* VIEW MORE BUTTON */}
            <div className="flex justify-center mt-6">
              <Link
                href="/websites"
                className="
        px-8 py-3 rounded-full
        border border-black/40
        text-sm font-medium text-black
        hover:bg-blue-600 hover:border-blue-600 hover:text-white
        transition
      "
              >
                View More
              </Link>
            </div>
          </section>


          {/* SERVICES */}
          <h3 className="text-lg font-semibold mb-6">Services</h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {groupedServices.map((service, i) => (
              <div
                key={i}
                onClick={() => setActiveService(service)}
                className="cursor-pointer border border-black/50 rounded-xl p-4 hover:border-black transition"
              >
                <div className="grid grid-cols-3 gap-1 mb-4">
                  {service.images.slice(0, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={
                        img && img.startsWith("http")
                          ? img
                          : "/no-image.png"
                      }
                      alt="service"
                      className="h-24 w-full object-cover rounded-md"
                    />
                  ))}
                </div>

                <h4 className="font-medium mb-2">{service.title}</h4>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full border border-black/20 text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>


          {/* ✅ ONE VIEW MORE BUTTON (FOR SERVICES PAGE) */}
          <div className="flex justify-center">
            <Link
              href="/services"
              className="
      px-8 py-3
      rounded-full
      border border-black/40
      text-sm font-medium
      text-black
      hover:bg-blue-600
      hover:border-blue-600
      hover:text-white
      transition
    "
            >
              View More
            </Link>
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
                  className="
                    absolute top-4 right-4 md:top-5 md:right-5 
                    w-10 h-10 bg-gray-100 hover:bg-gray-200 
                    border border-gray-300 shadow-md
                    rounded-full flex items-center justify-center 
                    text-black text-xl hover:scale-110 transition z-50
                  "
                >
                  <FiX />
                </button>

                {/* TITLE */}
                <h2 className="text-2xl font-semibold mb-6 pr-12">
                  {activeService.title}
                </h2>

                {/* CONTENT AREA */}
                <div className="flex-1 overflow-y-auto">

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
                              className={`rounded-full transition-all duration-300 ${
                                idx === currentIndex
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

                      {(activeService.title === "Video Production" ? activeService.images.slice(0, 6) : activeService.images).map((img, i) => {

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
        w-14 h-14
        rounded-full
        bg-black/60
        flex items-center justify-center
        backdrop-blur-md
        group-hover:scale-110
        transition
      ">
                                    <span className="text-white text-xl">▶</span>
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
                  <div className="flex justify-center mt-2">
                    <Link
                      href={activeService?.page || "#"}
                      className="
      px-5 py-2
      rounded-full
      border border-gray-400
      text-sm font-medium
      text-black
      hover:bg-blue-600
      hover:text-white
      hover:border-blue-600
      transition
    "
                    >
                      View More
                    </Link>
                  </div>
                )}

              </div>
            </div>
          )}


          {/* ================= PROJECT SECTION ================= */}
          <h3 className="text-lg font-semibold mb-2">Projects</h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

            {projects.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">
                No projects found
              </p>
            )}

            {projects
              .sort((a, b) => Number(b.year || 0) - Number(a.year || 0))
              .slice(0, 3)
              .map((project) => (
                <div
                  key={project.title}
                  onClick={() => setActiveProject(project)}
                  className="group relative cursor-pointer hover:scale-[1.02] transition"
                >
                  {/* IMAGE */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                      <img
                        src={
                          project.image && project.image.startsWith("http")
                            ? project.image   // ✅ Cloudinary URL
                            : "/no-image.png" // ✅ your fallback
                        }
                        alt={project.title || "Project"}
                        className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* OVERLAY */}
                  <div className="absolute inset-x-0 bottom-0 px-4 py-3 text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                    <p className="font-semibold text-black">
                      {project.title || "Untitled"}
                    </p>
                    <p className="text-xs text-black/70">
                      {project.category || "—"}
                    </p>
                  </div>
                </div>
              ))}

          </div>

          <br />

          <div className="flex justify-center">
            <Link
              href="/projects"
              className="px-8 py-3 rounded-full border border-black/40 text-sm font-medium text-black hover:bg-blue-600 hover:text-white transition"
            >
              View More
            </Link>
          </div>


          <section className="mt-6">


            {/* ✅ POSTERS GRID */}
            <PostersSection />

            {/* VIEW MORE */}
            <div className="flex justify-center mt-5">
              <Link
                href="/posters"
                className="
          px-8 py-3 rounded-full
          border border-black/40
          text-sm font-medium text-black
          transition-all duration-500
          hover:bg-blue-600 hover:border-blue-600 hover:text-white
          hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)]
        "
              >
                View More
              </Link>
            </div>
          </section>


          {/* ================= MOBILE APPLICATIONS ================= */}
          <section className="mt-10">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6">

              {/* HEADING */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Mobile Applications</h3>
              </div>


              {/* ================= MOBILE SLIDER ================= */}
              <div className="relative md:hidden">

                {/* LEFT ARROW */}
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? apps.length - 1 : prev - 1
                    )
                  }
                  className="
      absolute left-3 top-1/2 -translate-y-1/2 z-20
      bg-white shadow-md w-9 h-9 rounded-full
      flex items-center justify-center
      text-blue-600
    "
                >
                  ←
                </button>

                {/* SLIDER VIEW */}
                <div className="overflow-hidden flex items-center">

                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {apps.map((app, i) => (
                      <div
                        key={i}
                        className="min-w-full flex justify-center"
                        onClick={() => setActiveMobileApp(app)}
                      >
                        <div className="w-[70%] max-w-[260px]">
                          <img
                            src={
                              app.image && app.image.startsWith("http")
                                ? app.image
                                : "/no-image.png"
                            }
                            alt={app.title}
                            className="w-full h-auto object-contain rounded-2xl"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* RIGHT ARROW */}
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === apps.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="
      absolute right-3 top-1/2 -translate-y-1/2 z-20
      bg-white shadow-md w-9 h-9 rounded-full
      flex items-center justify-center
      text-blue-600
    "
                >
                  →
                </button>

              </div>

              {/* ================= DESKTOP SLIDER ================= */}
              <div className="hidden md:block relative px-20">

                {/* LEFT ARROW */}
                <button
                  onClick={() =>
                    document.getElementById("desktopSlider")?.scrollBy({
                      left: -1200,
                      behavior: "smooth",
                    })
                  }
                  className="
    absolute left-4 top-1/2 -translate-y-1/2 z-20
    bg-white shadow-md w-10 h-10 rounded-full
    flex items-center justify-center
    text-gray-700 hover:bg-blue-600 hover:text-white
    transition
  "
                >
                  <FiChevronLeft size={20} />
                </button>

                {/* SLIDER */}
                <div
                  id="desktopSlider"
                  className="
    flex
    gap-2
    overflow-hidden
    scroll-smooth
    px-16
  "
                >

                  {apps.map((app, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveMobileApp(app)}
                      className="
          flex-shrink-0 w-1/4 flex justify-center
          cursor-pointer hover:-translate-y-3 transition
        "
                    >
                      <img
                        src={
                          app.image && app.image.startsWith("http")
                            ? app.image
                            : "/no-image.png"
                        }
                        alt={app.title}
                        className="w-full h-[320px] object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* RIGHT ARROW */}
                <button
                  onClick={() =>
                    document.getElementById("desktopSlider")?.scrollBy({
                      left: 1200,
                      behavior: "smooth",
                    })
                  }
                  className="
    absolute right-0 top-1/2 -translate-y-1/2 z-20
    bg-white shadow-md w-10 h-10 rounded-full
    flex items-center justify-center
    text-gray-700 hover:bg-blue-600 hover:text-white
    transition
  "
                >
                  <FiChevronRight size={20} />
                </button>

              </div>

            </div>
          </section><br></br>


          {/* ================= WHATSAPP INTEREST CTA ================= */}
          <section className="mt-2 mb-6">
            <div className="max-w-3xl mx-auto px-6 text-center">

              <h3 className="text-2xl font-semibold tracking-tight mb-2">
                Ready to explore a collaboration?
              </h3>

              <p className="text-black/70 mb-4 max-w-xl mx-auto">
                Let us know your interest and our team will reach out to discuss the next steps.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                {/* INTERESTED */}
                <button
                  onClick={() => {
                    const message =
                      "Hello Matamix International,%0A%0AI am interested in your services and would like to connect for more details.";
                    window.open(
                      `https://wa.me/919605000694?text=${message}`,
                      "_blank"
                    );
                  }}
                  className="
          px-8 py-3 rounded-full
          bg-blue-600 text-white font-medium
          hover:bg-blue-800
          transition-all duration-300
          shadow-[0_10px_24px_rgba(37,99,235,0.30)]
        "
                >
                  I’m Interested
                </button>

                {/* FOLLOW ON INSTAGRAM */}
                <a
                  href="https://www.instagram.com/matamix_international/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
          inline-flex items-center justify-center
          px-8 py-3 rounded-full
          border border-blue-600
          text-blue-600 font-medium
          hover:bg-blue-600 hover:text-white
          transition-all duration-300
        "
                >
                  Follow Us
                </a>

              </div>
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
                        <img
                          src={
                            img && img.startsWith("http")
                              ? img
                              : "/no-image.png"
                          }
                          alt="project"
                          className="absolute inset-0 w-full h-full object-cover"
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

        {/* ================= MOBILE APPLICATION POPUP ================= */}
        {activeMobileApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setActiveMobileApp(null)}
            />

            {/* MODAL */}
            <div
              className="
    relative bg-white
    w-full
    max-w-6xl
    h-[90vh]
    rounded-2xl
    overflow-hidden
    flex
    flex-col md:flex-row
  "


              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE */}
              <button
                onClick={() => setActiveMobileApp(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 border border-gray-300 shadow-md flex items-center justify-center text-gray-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
              >
                <FiX size={18} />
              </button>

              {/* LEFT – APP PREVIEW */}
              <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">

                <img
                  src={
                    activeMobileApp.image &&
                      activeMobileApp.image.startsWith("http")
                      ? activeMobileApp.image
                      : "/no-image.png"
                  }
                  alt={activeMobileApp.title}
                  className="max-h-full w-auto object-contain drop-shadow-xl"
                />
              </div>

              {/* RIGHT – DETAILS */}
              <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
                {/* TITLE */}
                <h2 className="text-2xl font-semibold mb-3">
                  {activeMobileApp.title}
                </h2>


                {/* FULL DESCRIPTION */}
                <p className="text-black/80 leading-relaxed mb-6">
                  {activeMobileApp.fullDescription}
                </p>

                {/* FEATURES */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2 text-sm text-black/80">
                    {activeMobileApp.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BEST FOR */}
                <div className="border-t pt-4">
                  <p className="text-sm">
                    <span className="font-semibold">Best For:</span>{" "}
                    <span className="text-black/70">
                      {activeMobileApp.bestFor}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* ================= MOBILE MENU OVERLAY ================= */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <span className="font-semibold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <FiX size={26} />
              </button>
            </div>

            {/* LINKS */}
            <nav className="flex flex-col gap-6 px-6 py-10 text-lg font-medium">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Work</Link>
              <Link href="/websites" onClick={() => setMobileMenuOpen(false)}>Websites</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
              <Link href="/posters" onClick={() => setMobileMenuOpen(false)}>Posters</Link>
              <Link href="/applications" onClick={() => setMobileMenuOpen(false)}>Applications</Link>
            </nav>

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



