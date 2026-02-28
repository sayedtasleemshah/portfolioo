import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Terminal, Camera, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Profile() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageCard = imageCardRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;

    if (!section || !imageCard || !label || !headline || !body) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Image card animation
      scrollTl
        .fromTo(imageCard,
          { x: '-60vw', opacity: 0, scale: 0.96, rotate: -1 },
          { x: 0, opacity: 1, scale: 1, rotate: 0, ease: 'none' },
          0
        )
        .fromTo(label,
          { x: '20vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(headline,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(body,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        );

      // Exit animations
      scrollTl
        .to(imageCard,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(label,
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(headline,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .to(body,
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.74
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const skills = [
    { icon: Shield, text: 'Cybersecurity Basics & Ethical Hacking' },
    { icon: Terminal, text: 'Linux Administration & IT Support' },
    { icon: Camera, text: 'Photography' },
    { icon: Film, text: 'Video Editing' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="profile"
      className="section-pinned bg-[#05060B] z-20"
    >
      <div className="relative h-full flex items-center">
        {/* Image Card (Left) - Holding Book */}
        <div 
          ref={imageCardRef}
          className="absolute left-[7vw] top-[14vh] w-[34vw] h-[72vh] card-rounded shadow-2xl"
          style={{ opacity: 0 }}
        >
          <img 
            src="/images/photo5.jpg" 
            alt="Reading book"
            className="w-full h-full object-cover"
          />
          <div className="vignette" />
        </div>

        {/* Text Block (Right) */}
        <div className="absolute left-[52vw] top-[18vh] w-[41vw]">
          {/* Label */}
          <div ref={labelRef} style={{ opacity: 0 }}>
            <span className="font-mono-label text-[#A7B0C8]">About Me</span>
            <div className="mt-3 w-12 h-px bg-[rgba(167,176,200,0.25)]" />
          </div>

          {/* Headline */}
          <h2 
            ref={headlineRef}
            className="mt-8 text-[clamp(34px,3.6vw,56px)] font-bold text-[#F4F6FF] leading-tight"
            style={{ opacity: 0 }}
          >
            Cybersecurity<br />Enthusiast
          </h2>

          {/* Body */}
          <div ref={bodyRef} style={{ opacity: 0 }}>
            <p className="mt-8 text-[#A7B0C8] text-[clamp(15px,1.1vw,18px)] leading-relaxed max-w-[38vw]">
              As a Cybersecurity enthusiast, I specialize in identifying digital vulnerabilities and building robust network defenses. 
              Currently focused on Ethical Hacking, Linux administration, and securing IT infrastructures.
            </p>

            <p className="mt-6 text-[#A7B0C8] text-[clamp(15px,1.1vw,18px)] leading-relaxed max-w-[38vw]">
              Based in Hayatabad, Pakistan, I'm constantly learning and improving my skills to stay ahead in the ever-evolving cybersecurity landscape.
            </p>

            {/* Skills List */}
            <div className="mt-10 space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(45,98,255,0.1)] flex items-center justify-center">
                    <skill.icon className="w-5 h-5 text-[#2D62FF]" />
                  </div>
                  <span className="text-[#F4F6FF] text-[clamp(14px,1vw,16px)]">{skill.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
