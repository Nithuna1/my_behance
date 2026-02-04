"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiX } from "react-icons/fi";
import FollowButton from "./components/FollowButton";

/* ✅ ADD TYPE (required for popup) */
type Service = {
  title: string;
  tags: string[];
  images: string[];
  delivery: string;
  revisions: string;
  description: string;
};

type Project = {
  title: string;
  author: string;
  image: string;
  likes: number;
  views: number;
  year: string;
  category: string;
  description: string;
  gallery: string[];
};

export default function Home() {
  const [following, setFollowing] = useState(false);
const [followers, setFollowers] = useState(132215);
const [contactOpen, setContactOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");



  /* ✅ ADD STATE */
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

   /* ================= PROJECT DATA ================= */
  const projects: Project[] = [
    {
      title: "AMBER",
      author: "Matamix",
      image: "/projects/new_amber.jpg",
      likes: 29,
      views: 276,
      year: "2024",
      category: "POS Software Solution",
      description:
        "AMBER POS Software is an advanced point-of-sale solution designed to boost business efficiency and streamline daily operations. It enables seamless sales management and accurate inventory tracking while providing real-time reporting and analytics to help businesses make informed decisions. The system includes robust customer management with integrated loyalty programs, ensuring stronger customer engagement and retention. With secure payment processing, quick billing, and easy invoicing, AMBER simplifies transactions at every touchpoint. Automated daily sales reports further enhance control and visibility, making AMBER a reliable and scalable POS solution for modern businesses looking to optimize performance and growth.",
      gallery: [
        "/projects/machine.jpg",
        "/projects/machine1.jpg",
      ],
    },
    {
      title: "GOOZZBE",
      author: "Matamix",
      image: "/projects/goooz2.jpg",
      likes: 112,
      views: 1340,
      year: "2023",
      category: "Laundry Management Software",
      description:
        "Gozzbe is a smart, end-to-end digital solution designed to modernize and simplify laundry business operations. Built for laundromats, dry cleaners, and laundry service providers, Gozzbe seamlessly connects customers and businesses through an intuitive mobile app and a powerful web-based management dashboard. Customers can easily place orders, track laundry status, and manage pickups or deliveries, while business owners gain full control over orders, inventory, pricing, and workflow in real time. With automated order tracking, customer management, service categorization, and data-driven insights, Gozzbe reduces manual effort, minimizes errors, and improves turnaround time.",
      gallery: [
        "/projects/laundry.jpg",
        "/projects/laundry1.jpg",
      ],
    },
    {
      title: "ZOOMIE",
      author: "Matamix",
      image: "/projects/new_zoome.jpg",
      likes: 87,
      views: 980,
      year: "2024",
      category: "Restaurant POS System",
      description:
        "Zoomie is an intelligent, all-in-one restaurant and hospitality POS solution designed to help businesses turn tables faster and operate smarter. Built specifically for cafés, restaurants, and food service environments, Zoomie streamlines order taking, billing, and kitchen coordination with a fast, intuitive interface that reduces wait times and improves service efficiency. Its visually rich menu system, seamless order management, and real-time synchronization between front-of-house and kitchen ensure accuracy and speed at every stage of service. Combined with powerful reporting, inventory control, and flexible payment handling, Zoomie empowers restaurant owners and staff to deliver a smoother dining experience, maximize productivity, and increase revenue — all while maintaining complete operational control.",
      gallery: [
        "/projects/hotel.jpg",
        "/projects/hotel1.jpg",
      ],
    },
    {
      title: "AMALGAMATE",
      author: "Matamix",
      image: "/projects/new _amalgamate.jpg",
      likes: 64,
      views: 720,
      year: "2023",
      category: "Custom Mobile App Solutions",
      description:
        "Amalgamate Technology’s Mobile Application Development services are designed to help businesses transform their digital presence and succeed in today’s mobile-first world. We build high-performance, user-centric mobile applications that combine intuitive design with robust functionality, ensuring seamless experiences across devices and platforms. From concept and UI/UX design to development, testing, and deployment, our solutions are fully customized to meet specific business goals and user needs. By leveraging modern technologies, data-driven insights, and continuous optimization, we create scalable mobile apps that enhance user engagement, streamline operations, and drive measurable growth.",
      gallery: [
        "/projects/new _amalgamate.jpg",
      ],
    },
    {
      title: "AMBER",
      author: "Matamix",
      image: "/projects/amber_new.jpg",
      likes: 64,
      views: 720,
      year: "2023",
      category: "ERP Inventory Management",
      description:
        "AMBER’s Stock Ageing Reports provide businesses with real-time visibility into inventory movement, helping them manage stock more intelligently and efficiently. By clearly identifying slow-moving and ageing items, the system enables businesses to take timely actions such as replenishment adjustments, promotions, or stock clearance to reduce wastage. With accurate insights into inventory levels, AMBER helps optimize purchasing decisions, prevent overstocking or shortages, and improve overall cash flow. The automated reporting and data-driven analysis empower decision-makers to maintain healthier inventory cycles, minimize losses, and ensure that working capital is used effectively. Designed as part of AMBER’s powerful ERP solution, stock ageing reports transform inventory management from guesswork into a strategic, controlled process.",
      gallery: [
        "/projects/amber_new.jpg",
      ],
    },
    {
      title: "DOSO",
      author: "Matamix",
      image: "/projects/doso.jpg",
      likes: 45,
      views: 560,
      year: "2022",
      category: "Enterprise ERP Software",
      description:
        "DOSO Enterprise ERP Software Solutions are designed to streamline, integrate, and optimize core business operations through a robust and scalable digital platform. Built to support growing and enterprise-level organizations, DOSO centralizes critical functions such as finance, inventory, operations, human resources, and reporting into a single, unified system. With real-time data visibility and intelligent dashboards, businesses gain better control over processes, improve decision-making, and enhance operational efficiency. The flexible, modular architecture allows organizations to customize the ERP according to their unique workflows while ensuring seamless integration across departments. Secure, scalable, and performance-driven, DOSO empowers businesses to reduce complexity, improve productivity, and build a strong foundation for long-term digital transformation.",
      gallery: [
        "/projects/disc2.jpg",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ================= COVER ================= */}
      <section className="relative">
        <div className="relative h-[380px] w-full">
          <Image
            src="/projects/new_profile.jpeg"
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

            <Link
              href="/"
              className="font-semibold border-b-2 border-black pb-2"
            >
              Work
            </Link>

            <Link
              href="/services"
              className="text-black/50 hover:text-black pb-2"
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
    setFollowing((prev) => !prev);
    setFollowers((prev) => (following ? prev - 1 : prev + 1));
  }}
/>


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
  <FiMail className="text-lg" />
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


{/* CONTACT BOX */}
<button
  onClick={() => setContactOpen(true)}
  className="w-full border border-black/50 rounded-xl p-4 hover:border-black/30 transition"
>
  <div className="flex items-center justify-between">
    <div className="text-left">
      <h3 className="font-medium mb-1">Contact Us</h3>
      <p className="text-sm text-black/60">
        Reach out for more details about our services
      </p>
    </div>

    <span className="text-black/40 text-xl">›</span>
  </div>
</button>




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
  Matamix International provides end-to-end solutions across 
  UI/UX design, web development, and digital marketing, helping organizations
  grow, engage audiences, and succeed in an evolving digital landscape.
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

 {/* SERVICES */}
     <h3 className="text-lg font-semibold mb-6">Services</h3>

<div className="grid md:grid-cols-3 gap-6 mb-16">
  {[
    {
      title: "E-Commerce Solutions",
      tags: ["Shopify", "Online Store", "Payments"],
      images: [
        "/services/commerce1.webp",
        "/services/commerce.jpeg",
        "/services/commerce2.jpg",
        "/services/commerce3.webp",
      ],
      delivery: "Within 2 months",
      revisions: "3 concepts, 2 revisions",
      description:
        "We create meaningful and memorable brand identities that communicate your values, vision, and personality. Our process begins with in-depth brand research and positioning to understand your audience, and market landscape. From logo design and typography to color systems and visual language, we build a cohesive identity that works consistently across digital and physical touchpoints.",
    },
    {
      title: "Ui/Ux Design",
      tags: ["Prototyping", "User Flows", "Product UX"],
      images: [
        "/services/web1.avif",
        "/services/web2.avif",
        "/services/web3.jpg",
        "/services/web4.jpg",
      ],
      delivery: "4–6 weeks",
      revisions: "2 design revisions",
      description:
        "We design and develop custom, high-performance websites tailored specifically to your business goals. Our approach combines intuitive UI/UX design with modern development using technologies like Next.js to ensure speed, scalability, and SEO-friendly architecture.",
    },
    {
      title: "Digital Marketing",
      tags: ["SEO Strategy", "Social Ads", "Analytics"],
      images: [
        "/services/digital1.avif",
        "/services/digital2.jpg",
        "/services/marketing.jpg",
        "/services/digital3.avif",
      ],
      delivery: "6–8 weeks",
      revisions: "Flexible revisions",
      description:
        "We provide end-to-end digital product design services that help transform ideas into intuitive, user-centered experiences with a strong focus on usability and scalability.",
    },
  ].map((service, i) => (
    <div
      key={i}
      onClick={() => setActiveService(service)}
      className="cursor-pointer border border-black/50 rounded-xl p-4 hover:border-black transition"
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

      {/* LEFT – BEHANCE STYLE IMAGE GRID */}
      <div className="w-2/3 p-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {activeService.images.slice(0, 4).map((img, i) => (
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
          ))}
        </div>
      </div>

      {/* RIGHT – DETAILS */}
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


  {/* ================= PROJECT SECTION ================= */}
      <h3 className="text-lg font-semibold mb-6">Projects</h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            onClick={() => setActiveProject(project)}
            className="group relative overflow-hidden rounded cursor-pointer"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={600}
              className="w-full h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end">
              <div className="w-full px-4 py-3 flex justify-between text-white text-sm">
                <div>
                  <p className="font-semibold">{project.title}</p>
                  <p className="text-xs text-white/70">{project.author}</p>
                </div>
                <div className="flex gap-3 text-xs">
                  👍 {project.likes}
                  👁 {project.views}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


          {/* OUR WEBSITES */}
          <section className="mt-20">
            <h3 className="text-lg font-semibold mb-6">Websites</h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Matamix", url: "https://matamix.com", image: "/projects/collage.jpg" },
                { name: "Vitara", url: "https://nithuna1.github.io/vitara/index.html", image: "/services/business.jpg" },
                { name: "Google", url: "https://google.com", image: "/projects/website.avif" },
              ].map((site, i) => (
                <a key={i} href={site.url} target="_blank" rel="noopener noreferrer">
                  <div className="overflow-hidden rounded-xl border border-black/10">
                    <Image
                      src={site.image}
                      alt={site.name}
                      width={600}
                      height={400}
                      className="h-[220px] w-full object-cover hover:scale-105 transition"
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span>{site.name}</span>
                    <span className="text-black/40">↗</span>
                  </div>
                </a>
              ))}
            </div><br></br>

            {/* ✅ ONE VIEW MORE BUTTON (FOR WEBSITE PAGE) */}
<div className="flex justify-center">
  <Link
    href="/websites"
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
          disabled={!name || !email || !message}
          onClick={() => {
            if (!name || !email || !message) return;

            const subject = "Contact Inquiry – Matamix International";
            const body = `
Name: ${name}
Email: ${email}

Message:
${message}
            `;

            window.location.href =
              `mailto:info@matamix.com` +
              `?subject=${encodeURIComponent(subject)}` +
              `&body=${encodeURIComponent(body)}`;
          }}
          className={`
            w-full py-3 rounded-full font-medium transition
            ${
              !name || !email || !message
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          Send Message
        </button>

        {/* HELPER TEXT */}
        {(!name || !email || !message) && (
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div
            className="relative bg-white max-w-5xl w-full h-[80vh] rounded-2xl overflow-hidden flex"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-xl text-black/60 hover:text-black"
            >
              <FiX />
            </button>

            {/* LEFT – GALLERY */}
            <div className="w-2/3 p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {activeProject.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT – DETAILS */}
            <div className="w-1/3 border-l p-6 overflow-y-auto">
  <h2 className="text-xl font-semibold mb-2">
    {activeProject.title}
  </h2>

  <p className="text-sm text-black/60 mb-4">
    {activeProject.category} · {activeProject.year}
  </p>

  <p className="text-sm leading-relaxed text-black/70">
    {activeProject.description}
  </p>
</div>

            </div>
          </div>

      )}


      </section>

      {/* ================= FOOTER ================= */}
<footer className="bg-[#022549] border-t border-white/10 mt-20 py-8 text-center text-xs text-white">
  <p className="mb-2">
    © {new Date().getFullYear()} Matamix International
  </p>
</footer>


    </div>
  );
}



