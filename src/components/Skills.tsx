import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'Next.js', level: 92, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Language' },
  { name: 'Three.js', level: 85, category: '3D / WebGL' },
  { name: 'GSAP', level: 88, category: 'Motion' },
  { name: 'Framer Motion', level: 90, category: 'Motion' },
  { name: 'Tailwind CSS', level: 95, category: 'Styling' },
  { name: 'Node.js', level: 82, category: 'Backend' },
  { name: 'MongoDB', level: 78, category: 'Database' },
  { name: 'Blender', level: 70, category: '3D Art' },
];

const bands = ['React', 'Next.js', 'Three.js', 'TypeScript', 'GSAP', 'Framer Motion',
  'Tailwind CSS', 'Node.js', 'MongoDB', 'Blender', 'WebGL', 'GLSL', 'Figma', 'Vite',
  'React', 'Next.js', 'Three.js', 'TypeScript', 'GSAP', 'Framer Motion',
  'Tailwind CSS', 'Node.js', 'MongoDB', 'Blender', 'WebGL', 'GLSL', 'Figma', 'Vite'];

export default function Skills() {
  return (
    <section id="skills" className="relative py-40 overflow-hidden" style={{ background: '#050505' }}>

      <div className="max-w-7xl mx-auto px-8 lg:px-20">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-24"
        >
          <span className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase">03 — Arsenal</span>
          <span className="flex-1 h-px bg-white/8" />
        </motion.div>

        {/* Headline */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-thin leading-tight tracking-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Technology<br />
            <span className="text-white/20">as a</span>{' '}
            <span className="text-[#C9A84C]">craft.</span>
          </motion.h2>
        </div>

        {/* Skills grid — floating labels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {skills.map((skill, i) => (
            <SkillRow key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>

      {/* Horizontal scrolling band */}
      <div className="mt-32 overflow-hidden border-t border-b border-white/5 py-5">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          {bands.map((b, i) => (
            <span
              key={i}
              className="text-sm tracking-[0.3em] uppercase select-none"
              style={{
                color: i % 3 === 0 ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                fontFamily: "'Syne', sans-serif"
              }}
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Floating cluster — desktop only */}
      <FloatingCluster />
    </section>
  );
}

function SkillRow({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group flex items-center gap-6 p-5 border border-white/5 hover:border-[#C9A84C]/20 transition-colors duration-500"
    >
      <div className="w-24 flex-shrink-0">
        <div className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-0.5">{skill.category}</div>
        <div className="text-sm font-light text-white tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>{skill.name}</div>
      </div>
      <div className="flex-1 h-px bg-white/8 relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-[#C9A84C]"
          initial={{ width: 0 }}
          animate={visible ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.05 + 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
      <div className="text-xs text-white/25 font-thin w-10 text-right">{skill.level}</div>
    </motion.div>
  );
}

function FloatingCluster() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / w,
        y: (e.clientY - rect.top) / h,
      };
    };
    canvas.addEventListener('mousemove', onMove);

    const nodes = Array.from({ length: 8 }, (_, i) => ({
      x: w * 0.5 + Math.cos((i / 8) * Math.PI * 2) * 120,
      y: h * 0.5 + Math.sin((i / 8) * Math.PI * 2) * 80,
      ox: w * 0.5 + Math.cos((i / 8) * Math.PI * 2) * 120,
      oy: h * 0.5 + Math.sin((i / 8) * Math.PI * 2) * 80,
      label: skills[i]?.name ?? '',
    }));

    let angle = 0, raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      angle += 0.004;

      nodes.forEach((n, i) => {
        const t = angle + (i / nodes.length) * Math.PI * 2;
        n.x = w * 0.5 + Math.cos(t) * (120 + Math.sin(angle * 0.7 + i) * 20)
          + (mouse.current.x - 0.5) * 40;
        n.y = h * 0.5 + Math.sin(t) * (70 + Math.cos(angle * 0.5 + i) * 15)
          + (mouse.current.y - 0.5) * 30;
      });

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.12 * (1 - d / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,168,76,0.7)';
        ctx.fill();

        ctx.font = '10px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(n.label, n.x + 8, n.y + 4);
      });

      raf = requestAnimationFrame(draw);
    };
    const ctx = canvas.getContext('2d')!;
    draw();

    return () => {
      canvas.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-80 h-80 opacity-60">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
