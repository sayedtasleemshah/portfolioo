import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Terminal, Laptop, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCard {
  title: string;
  description: string;
  image: string;
  imagePosition: 'left' | 'right';
  icon: React.ElementType;
  githubUrl?: string;
}

const projects: ProjectCard[] = [
  {
    title: 'Network Security Analysis',
    description: 'Performed vulnerability scanning and traffic analysis using Python and Nmap. A comprehensive network scanner for security analysis.',
    image: '/images/work_image_1.jpg',
    imagePosition: 'left',
    icon: Terminal,
    githubUrl: 'https://github.com/sayedtasleemshah/Network-Scanner-Security-Analysis.git',
  },
  {
    title: 'Modern Portfolio',
    description: 'A responsive, high-performance portfolio built with HTML, CSS, and modern animations. Showcases my skills and projects.',
    image: '/images/work_image_2.jpg',
    imagePosition: 'right',
    icon: Laptop,
  },
  {
    title: 'Networking Lab',
    description: 'Designed and simulated complex network topologies using Cisco Packet Tracer. Hands-on experience with enterprise networking.',
    image: '/images/work_image_3.jpg',
    imagePosition: 'left',
    icon: Server,
  },
];

export default function WorkSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !header) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Card animations
      cards.forEach((card) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Parallax for image inside card
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(img,
            { y: -12 },
            {
              y: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.3,
              }
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="work"
      className="relative bg-[#05060B] z-50 py-[10vh]"
    >
      {/* Header */}
      <div ref={headerRef} className="px-[7vw] mb-16" style={{ opacity: 0 }}>
        <span className="font-mono-label text-[#A7B0C8]">Featured Work</span>
        <div className="mt-3 w-12 h-px bg-[rgba(167,176,200,0.25)]" />
        <h2 className="mt-8 text-[clamp(34px,3.6vw,56px)] font-bold text-[#F4F6FF] leading-tight max-w-[46vw]">
          Projects I've Built
        </h2>
        <p className="mt-6 text-[#A7B0C8] text-[clamp(15px,1.1vw,18px)] leading-relaxed max-w-[40vw]">
          A collection of my work in cybersecurity, networking, and web development.
        </p>
      </div>

      {/* Project Cards */}
      <div className="space-y-12 px-[7vw]">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => { cardRefs.current[index] = el; }}
            className="w-full min-h-[min(520px,70vh)] card-rounded bg-[#0B0E16] overflow-hidden shadow-2xl"
            style={{ opacity: 0 }}
          >
            <div className={`flex h-full ${project.imagePosition === 'right' ? 'flex-row-reverse' : ''}`}>
              {/* Image */}
              <div className="w-1/2 relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0E16]/50" />
              </div>
              
              {/* Content */}
              <div className="w-1/2 p-10 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-xl bg-[rgba(45,98,255,0.1)] flex items-center justify-center mb-6">
                  <project.icon className="w-6 h-6 text-[#2D62FF]" />
                </div>
                <h3 className="text-[clamp(24px,2.2vw,36px)] font-bold text-[#F4F6FF] leading-tight">
                  {project.title}
                </h3>
                <p className="mt-6 text-[#A7B0C8] text-[clamp(14px,1vw,17px)] leading-relaxed">
                  {project.description}
                </p>
                
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-[#2D62FF] hover:text-[#4a7aff] transition-colors group"
                  >
                    <Github className="w-5 h-5" />
                    <span className="font-medium">View Repository</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
