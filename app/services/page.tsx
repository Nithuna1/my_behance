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
  delivery: string;
  revisions: string;
  description: string;
};

export default function ServicePage() {
  const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(132215);

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
      delivery: "Within 2 months",
      revisions: "3 concepts, 2 revisions",
      description:
        "We design and develop scalable, secure, and conversion-focused e-commerce solutions tailored to your business goals. From product catalog setup and intuitive user journeys to secure payment gateways and performance optimization, our approach ensures seamless shopping experiences across all devices. We integrate analytics, inventory management, and growth tools to help you launch faster, sell smarter, and scale confidently in a competitive digital marketplace.",
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
      delivery: "4–6 weeks",
      revisions: "2 design revisions",
      description:
        "We create user-centered UI/UX designs that balance aesthetics with usability. Our process is driven by research, user behavior analysis, and usability testing to ensure every interaction feels intuitive and purposeful. From user journeys and wireframes to high-fidelity interfaces and interactive prototypes, we design digital experiences that are engaging, accessible, and optimized for real-world users across web and mobile platforms.",
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
      delivery: "6–8 weeks",
      revisions: "Flexible revisions",
      description:
        "We drive measurable business growth through data-driven digital marketing strategies. Our approach combines SEO, performance advertising, content marketing, and social media campaigns to increase visibility, attract qualified leads, and improve conversions. With continuous optimization and detailed performance tracking, we ensure every campaign delivers sustainable growth and long-term value for your brand.",
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
      delivery: "Within 2 months",
      revisions: "3 concepts, 2 revisions",
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
      delivery: "4–6 weeks",
      revisions: "2 design revisions",
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
      delivery: "6–8 weeks",
      revisions: "Flexible revisions",
      description:
        "We craft distinctive and cohesive brand identities that clearly communicate your vision, values, and personality in a competitive marketplace. Our approach begins with in-depth brand discovery and strategic positioning to understand your business goals, target audience, and market landscape. This foundation allows us to create a brand identity that is not only visually compelling but also strategically aligned with your long-term objectives.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ================= COVER ================= */}
      <section className="relative">
        <div className="relative h-[300px] w-full">
          <Image
            src="/projects/dark.avif"
            alt="Cover"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* ================= PROFILE STRIP ================= */}
      <section className="relative bg-white pt-16">
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
      <section className="border-b border-black/10">
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
              href="/websites"
              className="text-black/50 hover:text-black pb-2"
            >
              Websites
            </Link>
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <section className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-12 gap-12">

        {/* ================= LEFT PROFILE ================= */}
        <aside className="col-span-12 md:col-span-3 space-y-10">

          <ul className="space-y-3 text-sm">
            <li>Available for Freelance</li>
            <li>Founder & Digital Agency</li>
            <li>Branding · UI/UX · Web</li>
            <li>Kozhikode, India</li>
            <li className="underline">www.matamix.com</li>
          </ul>

          {/* ACTION BUTTONS */}
                    <div className="space-y-3">
                      <FollowButton
            following={following}
            onToggle={() => {
              setFollowing((prev) => !prev);
              setFollowers((prev) => (following ? prev - 1 : prev + 1));
            }}
          />

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info@matamix.com"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition"
            >
              <FiMail /> Message
            </a>

            <a
              href="https://www.matamix.com"
              target="_blank"
              className="block w-full text-center text-blue-600 border border-blue-600 py-2 rounded-full hover:bg-blue-50 transition"
            >
              Visit our website
            </a>
            </div>

          {/* HIRE BOX */}
<Link
  href="/hire"
  scroll={false}
  className="block border border-black/50 rounded-xl p-4 hover:border-black/30 transition"
>
  <h3 className="font-medium mb-3">Hire Matamix</h3>

  <div className="flex items-center justify-between text-sm">
    <div>
      <p className="font-medium">Digital Marketing</p>
      <p className="text-black/50 text-xs">Availability: Now</p>
    </div>
    <span className="text-black/40 text-xl">›</span>
  </div>
</Link>



          {/* STATS */}
<div className="space-y-4 text-sm">
  {[
    ["Project Views", "803,905"],
    ["Appreciations", "52,097"],
    ["Followers", followers.toLocaleString()],
    ["Following", "495"],
  ].map(([label, value]) => (
    <div key={label} className="flex justify-between">
      <span className="text-black/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  ))}
</div>

          {/* ON THE WEB */}
          <div>
            <p className="text-xs text-black/40 mb-3 uppercase tracking-wider">
              On the Web
            </p>

            <div className="border border-black/50 rounded-xl divide-y divide-black/50">
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
                  className="flex items-center justify-between px-4 py-3 text-sm hover:bg-black/5 transition"
                >
                  <span>{name}</span>
                  <span className="text-black/40">↗</span>
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
              Matamix International specializes in branding, UI/UX design,
              web development, and digital marketing solutions.
            </p>

            <p className="text-xs text-black/60 pt-2">
              Member since: January 1, 2026
            </p>

            <button className="text-xs text-black/60 hover:text-black transition">
              Report
            </button>
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

                <div className="space-y-1 text-xs text-black/60 mb-4">
                  <div>⏱ {service.delivery}</div>
                  <div>🔁 {service.revisions}</div>
                </div>

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

                  <ul className="space-y-2 text-sm mb-6">
                    <li>⏱ Delivery: {activeService.delivery}</li>
                    <li>🔁 Revisions: {activeService.revisions}</li>
                  </ul>

                  <p className="text-sm text-black/70 mb-6">
                    {activeService.description}
                  </p>

                  <a
                    href={`https://outlook.office.com/mail/deeplink/compose?to=info@matamix.com&subject=${encodeURIComponent(
                      `Inquiry – ${activeService.title}`
                    )}`}
                    target="_blank"
                    className="w-full block text-center bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
                  >
                    Send Inquiry
                  </a>
                </div>
              </div>
            </div>
          )}
</main>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#022549] border-t border-white/10 mt-20 py-10 text-center text-xs text-white">
        © {new Date().getFullYear()} Matamix International
      </footer>
    </div>
  );
}
