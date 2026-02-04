"use client";

import React, { useState, useEffect } from "react";
// Added 'UserRound' to the imports for the placeholder icon
import { Mail, ArrowUpRight, Github, Code2, UserRound } from "lucide-react";

// =========================================================================
// 1. CONFIGURATION SECTION
// =========================================================================

const DATA = {
  name: "Your Name",
  role: "Creative Developer & Designer",
  description:
    "I build accessible, pixel-perfect, and performant web experiences. Currently focused on minimalist design and React ecosystems.",
  socials: {
    email: "mailto:hello@example.com",
    github: "https://github.com",
    discord: "https://discord.com/users/your-id", 
  },
  projects: [
    {
      title: "Project Alpha",
      desc: "A responsive dashboard built with Next.js and Tailwind.",
      tags: ["Next.js", "React", "Tailwind"],
      link: "#",
    },
    {
      title: "Neon Ecommerce",
      desc: "Full-stack shopify alternative with Stripe integration.",
      tags: ["TypeScript", "Node.js", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Minimal Notes",
      desc: "A local-first markdown note-taking app.",
      tags: ["Rust", "Tauri", "React"],
      link: "#",
    },
  ],
};

// =========================================================================
// 2. COMPONENTS
// =========================================================================

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveTab(section);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    // Added 'bg-white text-zinc-900' here to force the correct colors
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-12 selection:bg-zinc-200 bg-white text-zinc-900">
      
      {/* --- DASHBOARD / NAV --- */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-zinc-200 px-2 py-1.5 rounded-full shadow-sm">
          {["about", "projects", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-zinc-900 text-white shadow-md"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      {/* --- ABOUT SECTION (Updated Layout) --- */}
      <section id="about" className="pt-32 pb-20 flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-8">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
              {DATA.name}
            </h1>
            <p className="text-lg text-zinc-500 font-medium">{DATA.role}</p>
          </div>
          
          <p className="text-zinc-600 leading-relaxed max-w-lg">
            {DATA.description}
          </p>

          {/* Social Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <SocialLink href={DATA.socials.github} icon={<Github size={18} />} label="GitHub" />
            <SocialLink href={DATA.socials.email} icon={<Mail size={18} />} label="Email" />
            <SocialLink href={DATA.socials.discord} icon={<DiscordIcon />} label="Discord" />
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-100 rounded-full flex items-center justify-center border border-zinc-200 overflow-hidden">
            {/* TO REPLACE WITH REAL IMAGE:
               1. Delete the <UserRound ... /> line below.
               2. Uncomment the line below it and add your image file to 'public/my-photo.jpg'
            */}
            <UserRound size={48} className="text-zinc-300" />
            
            {/* <img src="/my-photo.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
          </div>
        </div>

      </section>

      <hr className="border-zinc-200 my-8" />

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-20">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <Code2 size={20} /> Project Log
        </h2>
        
        <div className="grid gap-6">
          {DATA.projects.map((project, index) => (
            <div 
              key={index} 
              className="group flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 -mx-4 rounded-xl hover:bg-zinc-50 border border-transparent transition-all duration-300"
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-md border border-zinc-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <a 
                href={project.link}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-zinc-400 hover:text-zinc-900"
              >
                <ArrowUpRight size={20} />
              </a>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-zinc-200 my-8" />

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 pb-32">
        <h2 className="text-xl font-bold mb-6">Get in touch</h2>
        <p className="text-zinc-600 mb-8 max-w-md">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <a 
          href={DATA.socials.email}
          className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
        >
          <Mail size={18} /> Say Hello
        </a>
      </section>

    </main>
  );
}

// Helper Components
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 transition-all"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M7.5 7.5c3.5-1 5.5-1 9 0 1.5.5 2.5 2 2.5 3.5l-1 9c-1 1-3 2-6 2-3 0-5-1-6-2l-1-9c0-1.5 1-3 2.5-3.5z" />
    </svg>
  );
}