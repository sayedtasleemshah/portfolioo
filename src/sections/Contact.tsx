import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Instagram, Github, Linkedin, Send } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const formCard = formCardRef.current;

    if (!section || !leftCol || !formCard) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(leftCol,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Form card animation
      gsap.fromTo(formCard,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sayedtasleemshah', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/sayed-tasleem-shah-342940389', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/taslymkazmi', label: 'Instagram' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0B0E16] z-[80] py-[10vh] min-h-screen"
    >
      <div className="px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          {/* Left Column */}
          <div ref={leftColRef} className="lg:w-1/2" style={{ opacity: 0 }}>
            <h2 className="text-[clamp(34px,3.6vw,56px)] font-bold text-[#F4F6FF] leading-tight">
              Get In<br />Touch
            </h2>
            
            <div className="mt-10 space-y-6">
              <a 
                href="mailto:taslymkazmi@gmail.com"
                className="flex items-center gap-4 text-[#A7B0C8] hover:text-[#F4F6FF] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(45,98,255,0.1)] flex items-center justify-center group-hover:bg-[rgba(45,98,255,0.2)] transition-colors">
                  <Mail className="w-5 h-5 text-[#2D62FF]" />
                </div>
                <span className="text-[clamp(15px,1.1vw,18px)]">taslymkazmi@gmail.com</span>
              </a>
              
              <a 
                href="https://wa.me/923059873511"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#A7B0C8] hover:text-[#F4F6FF] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(45,98,255,0.1)] flex items-center justify-center group-hover:bg-[rgba(45,98,255,0.2)] transition-colors">
                  <Phone className="w-5 h-5 text-[#2D62FF]" />
                </div>
                <span className="text-[clamp(15px,1.1vw,18px)]">+92 305 9873511</span>
              </a>
              
              <div className="flex items-center gap-4 text-[#A7B0C8]">
                <div className="w-12 h-12 rounded-xl bg-[rgba(45,98,255,0.1)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#2D62FF]" />
                </div>
                <span className="text-[clamp(15px,1.1vw,18px)]">Hayatabad, Pakistan</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <span className="font-mono-label text-[#A7B0C8]">Connect</span>
              <div className="mt-4 flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl bg-[rgba(45,98,255,0.1)] flex items-center justify-center hover:bg-[rgba(45,98,255,0.2)] transition-colors group"
                  >
                    <social.icon className="w-5 h-5 text-[#2D62FF] group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Instagram CTA */}
            <a 
              href="https://www.instagram.com/taslymkazmi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300"
              style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                color: 'white',
              }}
            >
              <Instagram className="w-5 h-5" />
              <span>Follow on Instagram</span>
            </a>
          </div>

          {/* Right Column - Form */}
          <div ref={formCardRef} className="lg:w-1/2" style={{ opacity: 0 }}>
            <div className="bg-[#05060B] card-rounded p-8 lg:p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-[#F4F6FF] mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-mono-label text-[#A7B0C8] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-[rgba(167,176,200,0.2)] text-[#F4F6FF] placeholder-[#A7B0C8]/50 focus:outline-none focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF] transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-mono-label text-[#A7B0C8] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-[rgba(167,176,200,0.2)] text-[#F4F6FF] placeholder-[#A7B0C8]/50 focus:outline-none focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF] transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-mono-label text-[#A7B0C8] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-[rgba(167,176,200,0.2)] text-[#F4F6FF] placeholder-[#A7B0C8]/50 focus:outline-none focus:border-[#2D62FF] focus:ring-1 focus:ring-[#2D62FF] transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <span>Send message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[rgba(167,176,200,0.1)]">
          <p className="text-center text-[#A7B0C8] text-sm">
            © 2025 Sayed Tasleem Shah
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="https://github.com/sayedtasleemshah" target="_blank" rel="noopener noreferrer" className="text-[#A7B0C8] hover:text-[#F4F6FF] transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/sayed-tasleem-shah-342940389" target="_blank" rel="noopener noreferrer" className="text-[#A7B0C8] hover:text-[#F4F6FF] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
