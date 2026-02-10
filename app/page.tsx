"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiX } from "react-icons/fi";
import FollowButton from "./components/FollowButton";
import { FiPlus, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";


/* ✅ ADD TYPE (required for popup) */
type Service = {
  title: string;
  tags: string[];
  images: string[];
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

type MobileApp = {
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  bestFor: string;
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




  /* ✅ ADD STATE */
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeMobileApp, setActiveMobileApp] = useState<MobileApp | null>(null);


   /* ================= PROJECT DATA ================= */
  const projects: Project[] = [
    {
      title: "AMBER",
      author: "Matamix",
      image: "/projects/amb2.jpg",
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
      title: "GOZZBE",
      author: "Matamix",
      image: "/projects/gooz.jpg",
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
      image: "/projects/zoom.jpg",
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
        "/projects/user.png",
      ],
    },
    {
      title: "AMBER",
      author: "Matamix",
      image: "/projects/amb1.jpg",
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
        "/projects/solutions.jpg",
      ],
    },
  ];

  const mobileApps: MobileApp[] = [
  {
    title: "Business ERP App",
    image: "/mobile/home.png",
    shortDescription:
      "A complete ERP mobile solution to manage sales, purchases, expenses, and real-time business analytics.",
    fullDescription:
      "The Business ERP App is an all-in-one mobile platform designed to give business owners complete control over operations from anywhere. It centralizes sales, purchases, expenses, banking, and performance analytics into a single, intuitive dashboard. With real-time updates and clear financial insights, businesses can make faster, data-driven decisions and maintain full operational visibility.",
    features: [
      "Real-time sales, purchase, and expense tracking",
      "Cash and bank balance monitoring",
      "Profit calculation and revenue growth indicators",
      "Date-based reports (Today, Yesterday, Custom)",
      "Multi-shop and branch support",
    ],
    bestFor:
      "Retail stores, distributors, wholesalers, and businesses that need a complete ERP system on mobile.",
  },

  {
    title: "Shop Management App",
    image: "/mobile/shop.png",
    shortDescription:
      "Mobile-first shop management app to track daily revenue, branch performance, and inventory.",
    fullDescription:
      "The Shop Management App simplifies daily shop operations by providing a clear overview of sales, expenses, and purchases. Designed for speed and clarity, it allows shop owners and managers to quickly assess performance, monitor cash flow, and manage multiple branches without complexity.",
    features: [
      "Daily sales and purchase summaries",
      "Expense tracking with profit calculation",
      "Branch-wise and head-office views",
      "Quick shop selection and filtering",
      "Clean UI optimized for fast decisions",
    ],
    bestFor:
      "Single-store and multi-branch shop owners who want fast insights into daily operations.",
  },

  {
    title: "Accounting & Finance App",
    image: "/mobile/analytics.png",
    shortDescription:
      "Smart accounting application with cash book, day book, profit analysis, and balance insights.",
    fullDescription:
      "The Accounting & Finance App is built for accurate financial control and transparency. It provides structured views of cash sales, bank transactions, credit activity, and account balances. With integrated cash book and day book features, users can maintain clean financial records and reduce manual accounting effort.",
    features: [
      "Cash sales, bank sales, and credit sales tracking",
      "Cash book and day book access",
      "Credit purchase and account summaries",
      "Bank account balance monitoring",
      "Clear financial breakdowns in real time",
    ],
    bestFor:
      "Accountants, finance teams, and business owners who need precise financial tracking.",
  },

  {
    title: "Analytics Dashboard App",
    image: "/mobile/trade1.png",
    shortDescription:
      "Advanced analytics dashboard offering business insights, growth tracking, and performance reports.",
    fullDescription:
      "The Analytics Dashboard App transforms raw business data into actionable insights. It provides visual reports on performance, profitability, and growth trends, helping decision-makers understand what’s working and where improvements are needed. The app integrates seamlessly with ERP systems for automated insights.",
    features: [
      "Business and branch performance analysis",
      "Profit and loss insights",
      "Balance sheet and financial reports",
      "Growth comparison with previous periods",
      "ERP automation and reporting highlights",
    ],
    bestFor:
      "Business owners, managers, and decision-makers who rely on data-driven insights.",
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
      h-[165px]          /* mobile */
      sm:h-[280px]       /* small tablets */
      md:h-[340px]       /* tablets */
      lg:h-[380px]       /* desktop */
      w-full
    "
  >
    <Image
      src="/projects/the_profile.jpeg"
      alt="Cover"
      fill
      priority
      className="object-cover"
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
        w-14 h-14 md:w-24 md:h-24
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

      <Link
        href="/applications"
        className="text-black/50 hover:text-black pb-2"
      >
        Applications
      </Link>

    </div>
  </div>
</section>


      {/* ================= ABOUT ================= */}
+ <section className="relative py-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">

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

      <Link
        href="/"
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
  py-6
  grid grid-cols-1
  gap-10
">


        {/* ================= RIGHT CONTENT ================= */}
        <main className="col-span-12">

           {/* OUR WEBSITES */}
          <section className="mt-1">
            <h3 className="text-lg font-semibold mb-6">Websites</h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
  {
    name: "www.matamix.com",
    url: "https://matamix.com",
    image: "/projects/collage.jpg",
    video: "/video/matamix_video.mp4",
  },
  {
    name: "www.vitara.com",
    url: "https://nithuna1.github.io/vitara/index.html",
    image: "/services/business.jpg",
    video: "/video/vitara_video.mp4",
  },
  {
    name: "www.domain.com",
    url: "https://www.domainnow.com/domain-registration/?gad_source=1&gad_campaignid=2701056&gbraid=0AAAAAD_fDRToMhRNnIt7KFUKtuKgCSl_k&gclid=CjwKCAiAj8LLBhAkEiwAJjbY7xOLG6KWLXXIg4cnjCICMHdMhRqf47DijEAVrXnkoDMyWlz8Ck1JtxoC15QQAvD_BwE",
    image: "/services/digital2.jpg",
    video: "/video/domain_video.mp4",
  },
]
.map((site, i) => (

                <a
  key={i}
  href={site.url}
  target="_blank"
  rel="noopener noreferrer"
  className="group block"
>
  <div className="relative h-[220px] overflow-hidden rounded-xl border border-black/10 bg-black">

    {/* STATIC IMAGE */}
    <Image
      src={site.image}
      alt={site.name}
      fill
      className="
        object-cover
        transition-opacity duration-500
        group-hover:opacity-0
      "
    />

    {/* VIDEO PREVIEW (ONLY IF EXISTS) */}
    {site.video && (
      <video
        src={site.video}
        muted
        loop
        playsInline
        autoPlay
        className="
          absolute inset-0
          w-full h-full
          object-cover
          scale-[1.05]
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          pointer-events-none
        "
      />
    )}

    {/* FALLBACK: LIVE WEBSITE PREVIEW */}
    {!site.video && (
      <iframe
        src={site.url}
        className="
          absolute inset-0
          w-full h-full
          scale-[1.15]
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          pointer-events-none
        "
      />
    )}

  </div>

  <div className="mt-3 flex justify-between text-sm">
    <span className="font-medium">{site.name}</span>
    <span className="text-black/40 group-hover:text-black transition">
      ↗
    </span>
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



 {/* SERVICES */}
     <h3 className="text-lg font-semibold mb-6">Services</h3>

<div className="grid md:grid-cols-3 gap-6 mb-8">
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
      description:
  "Our E-Commerce Solutions are designed to help businesses launch, scale, and optimize high-performing online stores that convert visitors into loyal customers. We specialize in building secure, fast, and user-friendly e-commerce platforms tailored to your business model, whether you are a startup, a growing brand, or an enterprise. From intuitive product catalogs and seamless checkout experiences to secure payment gateway integration and inventory management, we ensure every touchpoint is optimized for performance and usability. Our process includes in-depth market research, user behavior analysis, and conversion-focused UI/UX design to create stores that not only look great but drive measurable results. With scalable architecture, mobile-first design, SEO optimization, and ongoing performance enhancements, we help businesses grow revenue, improve customer retention, and compete confidently in the digital marketplace."
,
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
      description:
  "Our UI/UX Design services focus on creating intuitive, engaging, and user-centered digital experiences that align with both business objectives and user needs. We begin with deep research into user behavior, pain points, and market trends to define clear user flows and information architecture. Through wireframing, interactive prototyping, and usability testing, we design interfaces that are simple, efficient, and visually compelling. Every design decision is driven by clarity, accessibility, and conversion, ensuring users can navigate products or platforms effortlessly. By combining modern design systems, responsive layouts, and performance-focused implementation, we deliver scalable UI/UX solutions that enhance usability, strengthen brand perception, and drive long-term user engagement across web and mobile platforms."
,
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
     description:
  "Our Digital Marketing services are built to help businesses increase visibility, attract the right audience, and convert traffic into measurable growth. We develop data-driven marketing strategies that combine search engine optimization (SEO), paid advertising, and social media marketing to maximize reach and ROI. From keyword research and on-page optimization to high-performing ad campaigns across Google, Meta, and social platforms, every initiative is designed to deliver real business impact. Using advanced analytics and performance tracking, we continuously monitor, test, and optimize campaigns to improve engagement, reduce acquisition costs, and scale results over time. By aligning creative content with audience behavior and business goals, we help brands build strong digital presence, generate quality leads, and achieve sustainable growth in competitive markets."
,
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

        <p className="text-sm text-black/70 mb-6">
          {activeService.description}
        </p>

      </div>
    </div>
  </div>
)}


  {/* ================= PROJECT SECTION ================= */}
<h3 className="text-lg font-semibold mb-2">Projects</h3>

<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
  {projects.slice(0, 3).map((project, i) => (
   <div
  key={i}
  onClick={() => setActiveProject(project)}
  className="
    group relative cursor-pointer
    transition-transform duration-300
    hover:scale-[1.02]
  "
>
  {/* IMAGE */}
  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
    <Image
      src={project.image}
      alt={project.title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>

  {/* TEXT OVERLAY */}
  <div
    className="
      absolute inset-x-0 bottom-0
      px-4 py-3
      text-sm
      opacity-0 group-hover:opacity-100
      transition
    "
  >
    <p className="font-semibold text-black drop-shadow-md">
      {project.title}
    </p>
    <p className="text-xs text-black/70 drop-shadow-md">
      {project.author}
    </p>
  </div>
</div>

  ))}
</div>

<br />

{/* ✅ VIEW MORE BUTTON */}
<div className="flex justify-center">
  <Link
    href="/projects"
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


{/* ================= POSTERS ================= */}
<section className="mt-4">
  <h3 className="text-lg font-semibold mb-6">Creative Design</h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* ================= CARD 1 ================= */}
    <Link
      href="/posters/view?set=card1"
      className="rounded-3xl bg-white/40 backdrop-blur-md border border-black/20 p-3 hover:border-black transition"
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-[3/4]">

        {/* 1 */}
        <div className="col-span-1 row-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster1.jpeg" alt="" fill className="object-cover" />
        </div>

        {/* 2 */}
        <div className="col-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster2.jpeg" alt="" fill className="object-cover" />
        </div>

        {/* 3 */}
        <div className="col-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster3.jpeg" alt="" fill className="object-cover" />
        </div>

        {/* 4 */}
        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster4.png" alt="" fill className="object-cover" />
        </div>

        {/* 5 */}
        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster5.jpeg" alt="" fill className="object-cover" />
        </div>

        {/* 6 */}
        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster6.jpeg" alt="" fill className="object-cover" />
        </div>

      </div>
    </Link>

    {/* ================= CARD 2 ================= */}
    <Link
      href="/posters/view?set=card2"
      className="rounded-3xl bg-white/40 backdrop-blur-md border border-black/20 p-3 hover:border-black transition"
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-[3/4]">

        <div className="col-span-1 row-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster7.jpeg" alt="" fill className="object-cover" />
        </div>

        <div className="col-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster8.jpeg" alt="" fill className="object-cover" />
        </div>

        <div className="col-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster9.jpeg" alt="" fill className="object-cover" />
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster10.jpeg" alt="" fill className="object-cover" />
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster11.jpeg" alt="" fill className="object-cover" />
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster12.jpeg" alt="" fill className="object-cover" />
        </div>

      </div>
    </Link>

    {/* ================= CARD 3 ================= */}
    <Link
      href="/posters/view?set=card3"
      className="rounded-3xl bg-white/40 backdrop-blur-md border border-black/20 p-3 hover:border-black transition"
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-[3/4]">

        <div className="col-span-1 row-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster13.png" alt="" fill className="object-cover" />
        </div>

        <div className="col-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster14.jpeg" alt="" fill className="object-cover" />
        </div>

        <div className="col-span-2 relative rounded-xl overflow-hidden">
          <Image src="/posters/poster15.png" alt="" fill className="object-cover" />
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster1.jpeg" alt="" fill className="object-cover" />
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster2.jpeg" alt="" fill className="object-cover" />
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <Image src="/posters/poster3.jpeg" alt="" fill className="object-cover" />
        </div>

      </div>
    </Link>

  </div><br></br>

  {/* ✅ VIEW MORE BUTTON */}
<div className="flex justify-center">
  <Link
    href="/posters"
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



{/* ================= MOBILE APPLICATIONS ================= */}
<section className="mt-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold">Mobile Applications</h3>
  </div>

  <div
  className="
    grid
    justify-center
    grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
    gap-x-2 gap-y-8
  "
>

    {mobileApps.map((app, i) => (
      <div
        key={i}
        onClick={() => setActiveMobileApp(app)}
        className="
          cursor-pointer
          group
          flex justify-center   /* 👈 center phones */
          transition-all duration-500
          hover:-translate-y-3
        "
      >
        <Image
          src={app.image}
          alt={app.title}
          width={900}           /* 👈 slightly bigger */
          height={1600}
          className="
            w-full
            max-w-[260px] md:max-w-[280px] lg:max-w-[300px] /* 👈 bigger phones */
            h-auto
            object-contain
            transition-transform duration-500
            group-hover:scale-[1.06]
          "
        />
      </div>
    ))}
  </div>

  {/* VIEW MORE */}
  <div className="flex justify-center mt-8">
    <Link
      href="/applications"
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
        max-w-6xl w-full h-[85vh]
        rounded-2xl overflow-hidden
        flex
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE */}
      <button
        onClick={() => setActiveMobileApp(null)}
        className="absolute top-5 right-5 z-10
        text-xl text-black/60 hover:text-black"
      >
        <FiX />
      </button>

      {/* LEFT – APP PREVIEW */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <Image
          src={activeMobileApp.image}
          alt={activeMobileApp.title}
          width={420}
          height={840}
          className="object-contain drop-shadow-xl"
        />
      </div>

      {/* RIGHT – DETAILS */}
      <div className="w-1/2 p-10 overflow-y-auto">
        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-3">
          {activeMobileApp.title}
        </h2>

        {/* SHORT DESCRIPTION */}
        <p className="text-sm text-black/60 mb-4">
          {activeMobileApp.shortDescription}
        </p>

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



