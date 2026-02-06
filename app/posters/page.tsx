"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import { FiMail } from "react-icons/fi";

export default function PostersPage() {
   const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(132215);
const [contactOpen, setContactOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [phone, setPhone] = useState("");

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
      
                  <Link href="/services" className="text-black/50 hover:text-black pb-2">
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
                    className="font-semibold border-b-2 border-black pb-2"
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
      
            {/* ================= MAIN GRID ================= */}
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
                    Email
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
          ["Services", "6"],
          ["Projects", "6"],
          ["Posters", "11"],
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

  {/* POSTERS */}
  <h3 className="text-lg font-semibold mb-6">Posters</h3>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

    {/* POSTER 1 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster1.jpeg" alt="Poster 1" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 2 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster2.jpeg" alt="Poster 2" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 3 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster3.jpeg" alt="Poster 3" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 4 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster4.png" alt="Poster 4" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 5 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster5.jpeg" alt="Poster 5" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 6 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster6.jpeg" alt="Poster 6" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 7 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster7.jpeg" alt="Poster 7" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 8 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster8.jpeg" alt="Poster 8" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 9 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster9.jpeg" alt="Poster 9" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 10 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster10.jpeg" alt="Poster 10" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

    {/* POSTER 11 */}
    <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <Image src="/posters/poster11.jpeg" alt="Poster 11" width={600} height={900} className="w-full h-[380px] object-contain transition-transform duration-700 group-hover:scale-105" />
    </div>

  </div>
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
