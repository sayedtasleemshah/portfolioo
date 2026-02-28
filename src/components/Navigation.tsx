import { useEffect, useState } from 'react';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > window.innerHeight * 0.5);

      // Determine active section
      const sections = ['hero', 'profile', 'philosophy', 'capabilities', 'work', 'process', 'collaboration', 'contact'];
      for (const sectionId of sections.reverse()) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'About' },
    { id: 'work', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="bg-[#05060B]/80 backdrop-blur-xl border-b border-[rgba(167,176,200,0.1)]">
        <div className="px-[7vw] py-4 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-mono-label text-[#F4F6FF] hover:text-[#2D62FF] transition-colors"
          >
            TASLEEM KAZMI
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id === 'home' ? 'hero' : link.id)}
                className={`font-mono-label transition-colors ${
                  activeSection === link.id || (link.id === 'home' && activeSection === 'hero')
                    ? 'text-[#2D62FF]' 
                    : 'text-[#A7B0C8] hover:text-[#F4F6FF]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
