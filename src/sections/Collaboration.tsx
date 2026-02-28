import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Collaboration() {
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

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="collaboration"
      className="section-pinned bg-[#05060B] z-[70]"
    >
      <div className="relative h-full flex items-center">
        {/* Image Card (Left) - Stylish Shot */}
        <div 
          ref={imageCardRef}
          className="absolute left-[7vw] top-[14vh] w-[34vw] h-[72vh] card-rounded shadow-2xl"
          style={{ opacity: 0 }}
        >
          <img 
            src="/images/photo2.jpg" 
            alt="Sayed Tasleem Shah"
            className="w-full h-full object-cover"
          />
          <div className="vignette" />
        </div>

        {/* Text Block (Right) */}
        <div className="absolute left-[52vw] top-[18vh] w-[41vw]">
          {/* Label */}
          <div ref={labelRef} style={{ opacity: 0 }}>
            <span className="font-mono-label text-[#A7B0C8]">Collaboration</span>
            <div className="mt-3 w-12 h-px bg-[rgba(167,176,200,0.25)]" />
          </div>

          {/* Headline */}
          <h2 
            ref={headlineRef}
            className="mt-8 text-[clamp(34px,3.6vw,56px)] font-bold text-[#F4F6FF] leading-tight"
            style={{ opacity: 0 }}
          >
            Let's build calm,<br />resilient systems.
          </h2>

          {/* Body */}
          <div ref={bodyRef} style={{ opacity: 0 }}>
            <p className="mt-10 text-[#A7B0C8] text-[clamp(15px,1.1vw,18px)] leading-relaxed max-w-[38vw]">
              I partner with teams that value clarity, documentation, and long-term stability. 
              If you're looking for someone who treats security as a habit—not a ticket—let's talk.
            </p>

            {/* CTA */}
            <button 
              onClick={scrollToContact}
              className="mt-10 btn-primary"
            >
              Start a conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
