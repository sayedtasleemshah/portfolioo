import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const imageCard = imageCardRef.current;

    if (!section || !label || !headline || !body || !imageCard) return;

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
        .fromTo(label,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(headline,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(body,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(imageCard,
          { x: '60vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        );

      // Exit animations
      scrollTl
        .to(label,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(headline,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .to(body,
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.74
        )
        .to(imageCard,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="process"
      className="section-pinned bg-[#05060B] z-[60]"
    >
      <div className="relative h-full flex items-center">
        {/* Text Block (Left) */}
        <div className="absolute left-[7vw] top-[18vh] w-[40vw]">
          {/* Label */}
          <div ref={labelRef} style={{ opacity: 0 }}>
            <span className="font-mono-label text-[#A7B0C8]">Process</span>
            <div className="mt-3 w-12 h-px bg-[rgba(167,176,200,0.25)]" />
          </div>

          {/* Headline */}
          <h2 
            ref={headlineRef}
            className="mt-8 text-[clamp(34px,3.6vw,56px)] font-bold text-[#F4F6FF] leading-tight"
            style={{ opacity: 0 }}
          >
            Assess.<br />Harden.<br />Document.
          </h2>

          {/* Body */}
          <p 
            ref={bodyRef}
            className="mt-10 text-[#A7B0C8] text-[clamp(15px,1.1vw,18px)] leading-relaxed max-w-[36vw]"
            style={{ opacity: 0 }}
          >
            I start with visibility—understanding what's in place and where the risk lives. 
            Then I implement controls, automate what repeats, and leave behind clear documentation your team can use.
          </p>
        </div>

        {/* Image Card (Right) - Presenting */}
        <div 
          ref={imageCardRef}
          className="absolute left-[54vw] top-[14vh] w-[39vw] h-[72vh] card-rounded shadow-2xl"
          style={{ opacity: 0 }}
        >
          <img 
            src="/images/photo1.jpg" 
            alt="Presenting EEG"
            className="w-full h-full object-cover"
          />
          <div className="vignette" />
        </div>
      </div>
    </section>
  );
}
