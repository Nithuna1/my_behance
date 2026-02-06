"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail, FiX } from "react-icons/fi";

/* ================= TYPES ================= */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  description: string;
};

export default function ServicePage() {
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
    w-full
    rounded-xl
    p-4
    border border-blue-600/40
    bg-blue-50/60
    hover:bg-blue-100/70
    hover:border-blue-600
    transition
    shadow-sm
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

        {/* ================= RIGHT CONTENT ================= */}
<main className="col-span-12 md:col-span-9">

  <h3 className="text-lg font-semibold mb-6">Services</h3>

          {/* ===== SERVICE CARDS (3 IMAGES ONLY) ===== */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
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

              <div className="relative bg-white w-full max-w-6xl h-[80vh] rounded-2xl overflow-hidden flex">
                <button
                  onClick={() => setActiveService(null)}
                  className="absolute top-4 right-4 text-xl text-black/60 hover:text-black z-10"
                >
                  <FiX />
                </button>

                {/* ===== POPUP IMAGES (ALWAYS 4) ===== */}
                <div className="w-2/3 p-6 overflow-y-auto">
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
                <div className="w-1/3 border-l p-6 overflow-y-auto">
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
      <footer className="bg-[#022549] border-t border-white/10 mt-20 py-10 text-center text-xs text-white">
        © {new Date().getFullYear()} Matamix International
      </footer>
    </div>
  );
}
