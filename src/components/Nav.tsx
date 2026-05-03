import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y < 80) { setVisible(true); return; }
      setVisible(y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9000] px-8 py-3 rounded-full flex items-center gap-10"
          style={{
            background: scrolled ? 'rgba(5,5,5,0.75)' : 'rgba(5,5,5,0.3)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-light tracking-[0.25em] text-white/90 hover:text-[#C9A84C] transition-colors duration-300 uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            A
          </button>

          <div className="w-px h-4 bg-white/15" />

          <div className="flex items-center gap-8">
            {links.map(link => (
              <NavLink key={link.label} label={link.label} onClick={() => scrollTo(link.href)} />
            ))}
          </div>

          <div className="w-px h-4 bg-white/15" />

          <button
            onClick={() => scrollTo('#contact')}
            className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase hover:opacity-70 transition-opacity duration-300"
          >
            Hire
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-xs tracking-[0.2em] text-white/60 hover:text-white/90 transition-colors duration-300 uppercase pb-0.5"
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-[#C9A84C]"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
    </button>
  );
}
