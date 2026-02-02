"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail, FiX } from "react-icons/fi";

/* ✅ ADD TYPE (required for popup) */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  delivery: string;
  revisions: string;
  description: string;
};

export default function ServicePage() {
  /* ✅ ADD STATE */
    const [activeService, setActiveService] = useState<Service | null>(null);

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

          <ul className="space-y-3 text-sm text-black/100">
            <li>Available for Freelance</li>
            <li>Founder & Digital Agency</li>
            <li>Branding · UI/UX · Web</li>
            <li>Kozhikode, India</li>
            <li className="underline">www.matamix.com</li>
          </ul>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">
            <FollowButton />

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info@matamix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full flex items-center justify-center gap-2
                py-2.5 rounded-full
                bg-blue-50 text-blue-600
                font-semibold
                hover:bg-blue-100
                transition
              "
            >
              <FiMail />
              Message
            </a>

            <a
              href="https://www.matamix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-blue-600 border border-blue-600 py-2 rounded-full hover:bg-blue-50 transition"
            >
              Visit our website
            </a>
          </div>

          {/* HIRE BOX */}
          <Link
            href="/hire"
            className="block border border-black/50 rounded-xl p-4 hover:border-black/40 transition"
          >
            <h4 className="font-medium mb-3">Hire Matamix</h4>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">Digital Marketer</p>
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
              Matamix International focuses on branding, UI/UX design,
              web development, and digital marketing for global clients.
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
        
                  <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {[
                      {
          title: "E-Commerce App",
          tags: ["Logo", "Brand System", "Guidelines"],
          images: [
            "/services/app.jpg",
            "/services/commerce.jpeg",
            "/services/market.avif",
          ],
          delivery: "Within 2 months",
          revisions: "3 concepts, 2 revisions",
          description:
            "We create meaningful and memorable brand identities that communicate your values, vision, and personality. Our process begins with in-depth brand research and positioning to understand your audience, competitors, and market landscape. From logo design and typography to color systems and visual language, we build a cohesive identity that works consistently across digital and physical touchpoints. You’ll receive a complete brand system including logo variations, color palettes, typography rules, and usage guidelines—ensuring your brand stays recognizable, scalable, and impactful as your business grows.",
        }
        ,
                      {
          title: "Ui/Ux Design",
          tags: ["UI/UX", "Next.js", "Performance"],
          images: [
            "/services/marketing.jpg",
            "/services/web.avif",
            "/services/app.jpg",
          ],
          delivery: "4–6 weeks",
          revisions: "2 design revisions",
          description:
            "We design and develop custom, high-performance websites tailored specifically to your business goals. Our approach combines intuitive UI/UX design with modern development using technologies like Next.js to ensure speed, scalability, and SEO-friendly architecture. From wireframes and visual design to responsive development and performance optimization, every website is built to deliver a seamless user experience across all devices. The result is a fast, secure, and visually compelling website that not only looks great but also converts visitors into customers.",
        }
        ,
                     {
          title: "Digital Marketing",
          tags: ["Product Strategy", "UX Research", "Prototyping"],
          images: [
            "/services/commerce.jpeg",
            "/services/market.avif",
            "/services/marketing.jpg",
          ],
          delivery: "6–8 weeks",
          revisions: "Flexible revisions",
          description:
            "We provide end-to-end digital product design services that help transform ideas into intuitive, user-centered experiences. Our process starts with product strategy and UX research to understand user needs, business goals, and technical constraints. We design user flows, wireframes, and high-fidelity interfaces, followed by interactive prototypes that allow for early testing and validation. Whether for web or mobile platforms, our designs focus on usability, scalability, and long-term product growth—ensuring your digital product is both functional and delightful to use.",
        }
        ,
                    ].map((service, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveService(service)}
                        className="cursor-pointer border border-black/50 rounded-xl p-4 hover:border-black transition"
                      >
                        <div className="grid grid-cols-3 gap-1 mb-4">
                          {service.images.map((img, idx) => (
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
        
                        <div className="w-2/3 p-6 grid grid-cols-2 gap-4 overflow-y-auto">
                          {activeService.images.map((img, i) => (
                            <Image
                              key={i}
                              src={img}
                              alt=""
                              width={600}
                              height={600}
                              className="rounded-xl object-cover"
                            />
                          ))}
                        </div>
        
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
        
                          <textarea
                            rows={4}
                            placeholder="Write a message about your project…"
                            className="w-full border rounded-lg p-3 text-sm mb-4"
                          />
        
                         <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@matamix.com"
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
