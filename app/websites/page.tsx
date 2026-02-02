"use client";

import Image from "next/image";
import Link from "next/link";
import FollowButton from "../components/FollowButton";
import { FiMail } from "react-icons/fi";

export default function WebsitePage() {
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
              src="/projects/user1.jpg"
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

            <Link href="/services" className="text-black/50 hover:text-black pb-2">
              Services
            </Link>

            <Link
              href="/websites"
              className="font-semibold border-b-2 border-black pb-2"
            >
              Websites
            </Link>

            <button className="text-black/50 hover:text-black pb-2">
              Appreciations
            </button>

          </div>
        </div>
      </section>

      {/* ================= MAIN GRID ================= */}
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
            className="block border border-black/30 rounded-xl p-4 hover:border-black/40 transition"
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
              Matamix International focuses on branding, UI/UX, web development,
              and digital marketing for global clients.
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

          <section id="websites">
            <h3 className="text-lg font-semibold mb-6">Our Websites</h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Matamix", url: "https://matamix.com", image: "/projects/collage.jpg" },
                { name: "Vitara", url: "https://nithuna1.github.io/vitara/index.html", image: "/projects/digital.jpg" },
                { name: "Google", url: "https://google.com", image: "/projects/website.avif" },
              ].map((site, i) => (
                <a
                  key={i}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="overflow-hidden rounded-xl border border-black/20 hover:border-black/40 transition">
                    <Image
                      src={site.image}
                      alt={site.name}
                      width={600}
                      height={400}
                      className="h-[240px] w-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-medium">{site.name}</span>
                    <span className="text-black/40">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

        </main>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black border-t border-white/10 mt-20 py-10 text-center text-xs text-white">
        © {new Date().getFullYear()} Matamix International
      </footer>

    </div>
  );
}
