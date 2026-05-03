import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX / w, y: e.clientY / h };
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);

    // Particles
    const NUM = 120;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    // Orb
    let angle = 0;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // --- orb ---
      angle += 0.005;
      const cx = w / 2 + (mouse.current.x - 0.5) * 60;
      const cy = h / 2 + (mouse.current.y - 0.5) * 40;
      const orbR = Math.min(w, h) * 0.22;

      // outer glow
      const glow = ctx.createRadialGradient(cx, cy, orbR * 0.1, cx, cy, orbR * 1.5);
      glow.addColorStop(0, 'rgba(201,168,76,0.04)');
      glow.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, orbR * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // main orb radial
      const grad = ctx.createRadialGradient(
        cx - orbR * 0.3, cy - orbR * 0.3, orbR * 0.1,
        cx, cy, orbR
      );
      grad.addColorStop(0, 'rgba(220,220,220,0.18)');
      grad.addColorStop(0.4, 'rgba(160,140,100,0.08)');
      grad.addColorStop(1, 'rgba(5,5,5,0.0)');

      ctx.beginPath();
      ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // orbiting ring 1
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(1, 0.35);
      ctx.beginPath();
      ctx.arc(0, 0, orbR * 1.1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201,168,76,0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // orbiting ring 2
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle * 0.7);
      ctx.scale(0.4, 1);
      ctx.beginPath();
      ctx.arc(0, 0, orbR * 1.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200,200,200,0.1)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();

      // inner shimmer arc
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 1.4);
      const shimmer = ctx.createLinearGradient(-orbR, 0, orbR, 0);
      shimmer.addColorStop(0, 'rgba(201,168,76,0)');
      shimmer.addColorStop(0.5, 'rgba(201,168,76,0.3)');
      shimmer.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.beginPath();
      ctx.arc(0, 0, orbR * 0.75, 0, Math.PI);
      ctx.strokeStyle = shimmer;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // --- particles ---
      for (const p of particles) {
        p.x += p.vx + (mouse.current.x - 0.5) * 0.05;
        p.y += p.vy + (mouse.current.y - 0.5) * 0.03;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ background: '#050505' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* gradient vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.7) 100%)'
      }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase mb-8"
        >
          Creative Developer
        </motion.p>

        {/* Main title */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '110%' }}
            animate={loaded ? { y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="text-[clamp(4rem,14vw,13rem)] font-thin leading-none tracking-[0.1em] text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            AKSHAY
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: '110%' }}
            animate={loaded ? { y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="w-16 h-px bg-[#C9A84C]/40" />
            <span className="text-[clamp(0.7rem,1.5vw,1rem)] tracking-[0.4em] text-white/40 uppercase font-light">
              Digital Experience Engineer
            </span>
            <span className="w-16 h-px bg-[#C9A84C]/40" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-white/35 text-sm tracking-wider font-light max-w-md mx-auto leading-relaxed"
        >
          Building immersive digital experiences with motion,<br />storytelling, and modern web technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-14 flex items-center justify-center gap-6"
        >
          <MagneticButton onClick={scrollToProjects} variant="primary">
            Explore Work
          </MagneticButton>
          <MagneticButton onClick={scrollToContact} variant="ghost">
            Let's Talk
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.4em] text-white/25 uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
            animate={{ scaleY: [1, 0.3, 1], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function MagneticButton({ children, onClick, variant }: {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'ghost';
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  if (variant === 'primary') {
    return (
      <button
        ref={ref}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="px-8 py-3.5 text-xs tracking-[0.3em] text-black uppercase bg-white hover:bg-[#C9A84C] transition-colors duration-500 font-medium"
        style={{ transition: 'transform 0.3s ease, background-color 0.4s ease' }}
        data-cursor="hover"
      >
        {children}
      </button>
    );
  }
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="px-8 py-3.5 text-xs tracking-[0.3em] text-white/60 uppercase border border-white/15 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-500"
      style={{ transition: 'transform 0.3s ease, border-color 0.4s ease, color 0.4s ease' }}
      data-cursor="hover"
    >
      {children}
    </button>
  );
}
