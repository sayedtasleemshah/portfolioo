import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Capabilities() {
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

      // Entrance animations
      scrollTl
        .fromTo(imageCard,
          { x: '-60vw', opacity: 0, scale: 0.97 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(label,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(headline,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(body,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        );

      // Exit animations
      scrollTl
        .to(imageCard,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(label,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
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

  const scrollToProcess = () => {
    const processSection = document.getElementById('process');
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="capabilities"
      className="section-pinned bg-[#05060B] z-40"
    >
      <div className="relative h-full flex items-center">
        {/* Image Card (Left) - Confident Pose */}
        <div 
          ref={imageCardRef}
          className="absolute left-[7vw] top-[14vh] w-[34vw] h-[72vh] card-rounded shadow-2xl"
          style={{ opacity: 0 }}
        >
          <img 
            src="/images/photo4.jpg" 
            alt="Sayed Tasleem Shah"
            className="w-full h-full object-cover"
          />
          <div className="vignette" />
        </div>

        {/* Text Block (Right) */}
        <div className="absolute left-[52vw] top-[18vh] w-[41vw]">
          {/* Label */}
          <div ref={labelRef} style={{ opacity: 0 }}>
            <span className="font-mono-label text-[#A7B0C8]">Capabilities</span>
            <div className="mt-3 w-12 h-px bg-[rgba(167,176,200,0.25)]" />
          </div>

          {/* Headline */}
          <h2 
            ref={headlineRef}
            className="mt-8 text-[clamp(34px,3.6vw,56px)] font-bold text-[#F4F6FF] leading-tight"
            style={{ opacity: 0 }}
          >
            Security.<br />Automation.<br />Uptime.
          </h2>

          {/* Body */}
          <div ref={bodyRef} style={{ opacity: 0 }}>
            <p className="mt-10 text-[#A7B0C8] text-[clamp(15px,1.1vw,18px)] leading-relaxed max-w-[38vw]">
              From endpoint hardening to scripting repetitive tasks, I help organizations stay safe and efficient. 
              I translate technical complexity into clean processes and clear documentation.
            </p>

            {/* CTA */}
            <button 
              onClick={scrollToProcess}
              className="mt-10 flex items-center gap-2 text-[#2D62FF] hover:text-[#4a7aff] transition-colors group"
            >
              <span className="font-medium">See how I work</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
