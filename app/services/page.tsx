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
  const [activeService, setActiveService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      title: "E-Commerce Solutions",
      tags: ["Branding", "UX", "Conversion"],
      images: [
        "/services/app.jpg",
        "/services/commerce.jpeg",
        "/services/market.avif",
        "/services/business.jpg",
      ],
      delivery: "Within 2 months",
      revisions: "3 concepts, 2 revisions",
      description:
        "We create meaningful and memorable brand identities that communicate your values, vision, and personality. Our process begins with in-depth brand research and positioning to understand your audience, and market landscape. From logo design and typography to color systems and visual language, we build a cohesive identity that works consistently across digital and physical touchpoints.",
    },
    {
      title: "UI / UX Design",
      tags: ["UI/UX", "Research", "Prototyping"],
      images: [
        "/services/marketing.jpg",
        "/services/web.avif",
        "/services/app.jpg",
        "/services/business.jpg",
      ],
      delivery: "4–6 weeks",
      revisions: "2 design revisions",
      description:
        "We design intuitive and visually compelling user experiences backed by UX research and usability testing. Our process includes user flows, wireframes, high-fidelity interfaces, and interactive prototypes that help validate ideas early and ensure products are easy, enjoyable, and efficient to use.",
    },
    {
      title: "Digital Marketing",
      tags: ["SEO", "Ads", "Growth"],
      images: [
        "/services/commerce.jpeg",
        "/services/market.avif",
        "/services/marketing.jpg",
        "/services/business.jpg",
      ],
      delivery: "6–8 weeks",
      revisions: "Flexible revisions",
      description:
        "We help brands grow through strategic digital marketing. Our services include SEO optimization, paid advertising, social media strategy, and performance tracking. Each campaign is tailored to your business goals, ensuring measurable growth, better visibility, and long-term impact.",
    },
    {
      title: "Mobile App Development",
      tags: ["Branding", "UX", "Conversion"],
      images: [
        "/services/app.jpg",
        "/services/commerce.jpeg",
        "/services/market.avif",
        "/services/business.jpg",
      ],
      delivery: "Within 2 months",
      revisions: "3 concepts, 2 revisions",
      description:
        "We create high-performing e-commerce applications focused on usability, scalability, and conversion. From product discovery and checkout flows to responsive UI design and performance optimization, our apps are crafted to deliver seamless shopping experiences across devices while supporting long-term business growth.",
    },
    {
      title: "Web Development",
      tags: ["UI/UX", "Research", "Prototyping"],
      images: [
        "/services/marketing.jpg",
        "/services/web.avif",
        "/services/app.jpg",
        "/services/business.jpg",
      ],
      delivery: "4–6 weeks",
      revisions: "2 design revisions",
      description:
        "We design intuitive and visually compelling user experiences backed by UX research and usability testing. Our process includes user flows, wireframes, high-fidelity interfaces, and interactive prototypes that help validate ideas early and ensure products are easy, enjoyable, and efficient to use.",
    },
    {
      title: "Brand Identity",
      tags: ["SEO", "Ads", "Growth"],
      images: [
        "/services/commerce.jpeg",
        "/services/market.avif",
        "/services/marketing.jpg",
        "/services/business.jpg",
      ],
      delivery: "6–8 weeks",
      revisions: "Flexible revisions",
      description:
        "We help brands grow through strategic digital marketing. Our services include SEO optimization, paid advertising, social media strategy, and performance tracking. Each campaign is tailored to your business goals, ensuring measurable growth, better visibility, and long-term impact.",
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
              src="/projects/user3.webp"
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

          <div className="space-y-3">
            <FollowButton />

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
  <h4 className="font-medium mb-3">Hire Matamix</h4>

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
              ["Followers", "132,215"],
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
                  Inquire
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
