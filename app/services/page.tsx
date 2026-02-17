"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail, FiX } from "react-icons/fi";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"

/* ================= TYPES ================= */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  description: string;
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


  const [activeService, setActiveService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      title: "E-Commerce Solutions",
      tags: ["Branding", "UX", "Conversion"],
       images: [
        "/services/commerce1.webp",
        "/services/commerce.jpeg",
        "/services/commerce2.jpg",
        "/services/commerce3.webp",
      ],
     description:
  "Our E-Commerce Solutions are designed to help businesses launch, scale, and optimize high-performing online stores that convert visitors into loyal customers. We specialize in building secure, fast, and user-friendly e-commerce platforms tailored to your business model, whether you are a startup, a growing brand, or an enterprise. From intuitive product catalogs and seamless checkout experiences to secure payment gateway integration and inventory management, we ensure every touchpoint is optimized for performance and usability. Our process includes in-depth market research, user behavior analysis, and conversion-focused UI/UX design to create stores that not only look great but drive measurable results. With scalable architecture, mobile-first design, SEO optimization, and ongoing performance enhancements, we help businesses grow revenue, improve customer retention, and compete confidently in the digital marketplace.",
    },
    {
      title: "UI / UX Design",
      tags: ["UI/UX", "Research", "Prototyping"],
      images: [
        "/services/web1.avif",
        "/services/web2.avif",
        "/services/web3.jpg",
        "/services/web4.jpg",
      ],
      description:
  "Our UI/UX Design services focus on creating intuitive, engaging, and user-centered digital experiences that align with both business objectives and user needs. We begin with deep research into user behavior, pain points, and market trends to define clear user flows and information architecture. Through wireframing, interactive prototyping, and usability testing, we design interfaces that are simple, efficient, and visually compelling. Every design decision is driven by clarity, accessibility, and conversion, ensuring users can navigate products or platforms effortlessly. By combining modern design systems, responsive layouts, and performance-focused implementation, we deliver scalable UI/UX solutions that enhance usability, strengthen brand perception, and drive long-term user engagement across web and mobile platforms.",
    },
    {
      title: "Digital Marketing",
      tags: ["SEO", "Ads", "Growth"],
       images: [
        "/services/digital1.avif",
        "/services/digital2.jpg",
        "/services/marketing.jpg",
        "/services/digital3.avif",
      ],
       description:
  "Our Digital Marketing services are built to help businesses increase visibility, attract the right audience, and convert traffic into measurable growth. We develop data-driven marketing strategies that combine search engine optimization (SEO), paid advertising, and social media marketing to maximize reach and ROI. From keyword research and on-page optimization to high-performing ad campaigns across Google, Meta, and social platforms, every initiative is designed to deliver real business impact. Using advanced analytics and performance tracking, we continuously monitor, test, and optimize campaigns to improve engagement, reduce acquisition costs, and scale results over time. By aligning creative content with audience behavior and business goals, we help brands build strong digital presence, generate quality leads, and achieve sustainable growth in competitive markets.",
    },
    {
      title: "Mobile App Development",
      tags: ["Branding", "UX", "Conversion"],
      images: [
        "/services/app.jpg",
        "/services/mobile1.jpg",
        "/services/mobile2.jpg",
        "/services/mobile3.jpg",
      ],
      description:
        "We design and develop high-performance mobile applications that deliver seamless, user-centric experiences across iOS and Android platforms. From concept validation and UX design to scalable development and performance optimization, our apps are built for reliability, security, and growth. We focus on intuitive navigation, smooth interactions, and robust architecture to help businesses engage users, drive retention, and scale confidently.",
    },
    {
      title: "Web Development",
      tags: ["UI/UX", "Research", "Prototyping"],
      images: [
        "/services/develop1.jpg",
        "/services/web.avif",
        "/services/develop2.avif",
        "/services/develop3.avif",
      ],
      description:
        "We build fast, secure, and scalable websites tailored to your business objectives. Our web development process combines clean code, responsive design, and modern technologies to deliver high-performance websites that work seamlessly across all devices. From custom development and CMS integration to performance optimization and SEO readiness, we create websites that are reliable, easy to manage, and built for long-term growth.",
    },
    {
      title: "Brand Identity",
      tags: ["SEO", "Ads", "Growth"],
      images: [
        "/services/brand1.jpg",
        "/services/brand2.jpg",
        "/services/brand4.jpg",
        "/services/brand3.avif",
      ],
      description:
        "We craft distinctive and cohesive brand identities that clearly communicate your vision, values, and personality in a competitive marketplace. Our approach begins with in-depth brand discovery and strategic positioning to understand your business goals, target audience, and market landscape. This foundation allows us to create a brand identity that is not only visually compelling but also strategically aligned with your long-term objectives.",
    },

     {
      title: "Video Production",
      tags: ["Corporate Videos", "Product Shoots", "Brand Films"],
      images: [
        "/services/video1.jpg",
        "/services/video2.jpg",
        "/services/video3.avif",
        "/services/video4.avif",
      ],
      description:
        "Our Video Production services bring your brand story to life through high-quality, cinematic visual content. From corporate films and product showcases to promotional campaigns and social media reels, we handle the complete production process — scripting, storyboarding, shooting, editing, and post-production. With professional equipment, creative direction, and strategic storytelling, we create compelling videos that engage audiences, strengthen brand identity, and drive measurable results across digital platforms.",
    },
  ];

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
        h-[240px] 
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
     <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
   
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

      <Link
        href="/applications"
        className="text-black/50 hover:text-black pb-2"
      >
        Applications
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

                <p className="text-sm text-black/80 leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

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
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setActiveService(null)}
              />

              <div className="
  relative bg-white
  w-full
  max-w-6xl
  h-[90vh]
  rounded-2xl
  overflow-hidden
  flex
  flex-col md:flex-row
">

                <button
                  onClick={() => setActiveService(null)}
                  className="absolute top-4 right-4 text-xl text-black/60 hover:text-black z-10"
                >
                  <FiX />
                </button>

                {/* ===== POPUP IMAGES (ALWAYS 4) ===== */}
                <div className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => {
                      const img =
                        activeService.images[i] ??
                        activeService.images[
                          activeService.images.length - 1
                        ];

                      return (
                        <div
                          key={i}
                          className="relative aspect-square rounded-xl overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ===== DETAILS ===== */}
                <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l p-4 md:p-6 overflow-y-auto">
                  <h2 className="text-xl font-semibold mb-2">
                    {activeService.title}
                  </h2>

                  <p className="text-sm text-black/70 mb-6">
                    {activeService.description}
                  </p>
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
