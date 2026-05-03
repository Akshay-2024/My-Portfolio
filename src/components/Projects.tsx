import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    num: '01',
    title: 'Lumina',
    category: 'Interactive Experience',
    description: 'A WebGL-powered immersive web experience featuring real-time particle systems, custom GLSL shaders, and spatial audio storytelling.',
    tags: ['Three.js', 'GLSL', 'React', 'Spatial Audio'],
    year: '2024',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accent: '#C9A84C',
  },
  {
    id: 2,
    num: '02',
    title: 'Vanta Studio',
    category: 'Brand Identity + Web',
    description: 'Full brand identity and web platform for a luxury architecture studio. Editorial layouts, motion-first design, and performant animations.',
    tags: ['Next.js', 'Framer Motion', 'GSAP', 'Tailwind'],
    year: '2024',
    image: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accent: '#C9A84C',
  },
  {
    id: 3,
    num: '03',
    title: 'Axiom Dashboard',
    category: 'Product Design + Dev',
    description: 'High-performance analytics dashboard for a fintech startup. Complex data visualization with D3.js, real-time updates, and micro-interactions.',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    year: '2023',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accent: '#C9A84C',
  },
  {
    id: 4,
    num: '04',
    title: 'Echo Commerce',
    category: 'E-commerce Platform',
    description: 'A premium fashion e-commerce platform with 3D product visualization, AR try-on features, and a fluid editorial shopping experience.',
    tags: ['Next.js', 'Three.js', 'MongoDB', 'Stripe'],
    year: '2023',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accent: '#C9A84C',
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-40 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-20">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-24"
        >
          <span className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase">04 — Work</span>
          <span className="flex-1 h-px bg-white/8" />
        </motion.div>

        {/* Headline */}
        <div className="mb-20 overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-thin leading-tight tracking-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Selected<br />
            <span className="text-white/20">Projects</span>
          </motion.h2>
        </div>

        {/* Project list */}
        <div className="space-y-2">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen detail overlay */}
      <AnimatePresence>
        {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectRow({ project, index, onClick }: {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: '-60px' });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className="relative group flex items-center gap-8 py-8 border-b border-white/6 cursor-pointer overflow-hidden"
      data-cursor="hover"
    >
      {/* Hover background sweep */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.04), transparent)' }}
      />

      {/* Floating image */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute pointer-events-none z-10 w-48 h-32 overflow-hidden"
            style={{ left: pos.x + 20, top: pos.y - 60 }}
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      <span className="text-xs tracking-[0.3em] text-white/25 font-thin w-8">{project.num}</span>

      <div className="flex-1 min-w-0">
        <h3
          className="text-[clamp(1.5rem,3.5vw,3rem)] font-thin text-white tracking-tight leading-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {project.title}
        </h3>
      </div>

      <div className="hidden md:block">
        <span className="text-xs tracking-[0.3em] text-white/30 uppercase">{project.category}</span>
      </div>

      <div className="hidden lg:flex gap-2">
        {project.tags.slice(0, 2).map(t => (
          <span key={t} className="text-[10px] tracking-[0.2em] text-white/20 border border-white/8 px-3 py-1 uppercase">
            {t}
          </span>
        ))}
      </div>

      <span className="text-xs text-white/25">{project.year}</span>

      <motion.div
        animate={{ rotate: hovered ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight className="w-4 h-4 text-[#C9A84C]" />
      </motion.div>
    </motion.div>
  );
}

function ProjectDetail({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[8000] flex items-center justify-center"
      style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center border border-white/15 hover:border-[#C9A84C]/40 transition-colors duration-300"
        data-cursor="hover"
      >
        <X className="w-4 h-4 text-white/60" />
      </button>

      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="aspect-video overflow-hidden"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase">{project.num} — {project.category}</span>
          <h2
            className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-thin text-white leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {project.title}
          </h2>
          <p className="mt-6 text-white/45 font-light leading-loose tracking-wide">{project.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span key={t} className="text-[10px] tracking-[0.2em] text-[#C9A84C]/70 border border-[#C9A84C]/20 px-3 py-1.5 uppercase">
                {t}
              </span>
            ))}
          </div>

          <button
            className="mt-10 flex items-center gap-3 text-xs tracking-[0.3em] text-white/60 uppercase hover:text-white transition-colors duration-300"
            data-cursor="hover"
          >
            View Case Study <ArrowUpRight className="w-3 h-3" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
