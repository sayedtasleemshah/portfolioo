import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Download, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Cybersecurity Enthusiast",
  "Ethical Hacker in Training", 
  "IT Support Specialist"
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  
  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentText = roles[roleIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentRole(currentText.substring(0, currentRole.length + 1));
        if (currentRole === currentText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentRole(currentText.substring(0, currentRole.length - 1));
        if (currentRole === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentRole, isDeleting, roleIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const profile = profileRef.current;
    const name = nameRef.current;
    const role = roleRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !bg || !profile || !name || !role || !body || !cta || !scrollHint) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on page load
      const loadTl = gsap.timeline();
      
      loadTl
        .fromTo(bg, 
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }
        )
        .fromTo(profile,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo(name,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(role,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(body,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(cta,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(scrollHint,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.1'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([profile, name, role, body, cta], { x: 0, opacity: 1 });
            gsap.set(bg, { scale: 1, y: 0 });
          }
        }
      });

      scrollTl
        .fromTo(profile,
          { x: 0, opacity: 1 },
          { x: '-30vw', opacity: 0, ease: 'power2.in' },
          0.68
        )
        .fromTo(name,
          { x: 0, opacity: 1 },
          { x: '-40vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(role,
          { x: 0, opacity: 1 },
          { x: '-28vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(body,
          { x: 0, opacity: 1 },
          { x: '-28vw', opacity: 0, ease: 'power2.in' },
          0.74
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(bg,
          { scale: 1, y: 0 },
          { scale: 1.08, y: '-6vh', ease: 'none' },
          0.7
        )
        .fromTo(scrollHint,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.6
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img 
          src="/images/hero_city.jpg" 
          alt="City skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(5,6,11,0.55)]" />
        <div className="vignette" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-[7vw]">
        {/* Profile Image */}
        <div 
          ref={profileRef}
          className="mb-6"
          style={{ opacity: 0 }}
        >
          <img 
            src="/images/profile.jpg" 
            alt="Sayed Tasleem Shah"
            className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full object-cover border-[3px] border-[#2D62FF] p-1"
            style={{ boxShadow: '0 0 30px rgba(45, 98, 255, 0.3)' }}
          />
        </div>
        
        <h1 
          ref={nameRef}
          className="text-[clamp(44px,5vw,76px)] font-bold text-[#F4F6FF] max-w-[62vw]"
          style={{ opacity: 0 }}
        >
          Sayed Tasleem Shah
        </h1>
        
        <p 
          ref={roleRef}
          className="mt-4 text-[clamp(20px,2vw,28px)] font-medium text-[#2D62FF] font-mono"
          style={{ opacity: 0 }}
        >
          <span ref={typingRef}>{currentRole}</span>
          <span className="animate-pulse">|</span>
        </p>
        
        <p 
          ref={bodyRef}
          className="mt-6 text-[clamp(16px,1.2vw,20px)] text-[#A7B0C8] max-w-[44vw] leading-relaxed"
          style={{ opacity: 0 }}
        >
          As a Cybersecurity enthusiast, I specialize in identifying digital vulnerabilities and building robust network defenses. 
          Currently focused on Ethical Hacking, Linux administration, and securing IT infrastructures.
        </p>
        
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4" style={{ opacity: 0 }}>
          <button 
            onClick={scrollToWork}
            className="btn-primary flex items-center gap-2"
          >
            Explore My Work
          </button>
          
          <a 
            href="/resume.pdf"
            download
            className="px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border-2 border-[#2D62FF] text-[#2D62FF] hover:bg-[#2D62FF] hover:text-[#F4F6FF]"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
          
          <a 
            href="mailto:taslymkazmi@gmail.com"
            className="px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border border-[rgba(167,176,200,0.3)] text-[#A7B0C8] hover:text-[#F4F6FF] hover:border-[#F4F6FF]"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
        </div>
      </div>

      {/* Scroll Hint */}
      <div 
        ref={scrollHintRef}
        className="absolute bottom-[6vh] left-[7vw] flex items-center gap-2 text-[#A7B0C8]"
        style={{ opacity: 0 }}
      >
        <span className="font-mono-label">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
