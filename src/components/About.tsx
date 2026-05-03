import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { num: '4+', label: 'Years of Craft' },
  { num: '40+', label: 'Projects Shipped' },
  { num: '12+', label: 'Industries Served' },
  { num: '∞', label: 'Lines of Intent' },
];

export default function About() {
  const titleRef = useRef(null);
  const titleVisible = useInView(titleRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-40 overflow-hidden" style={{ background: '#080808' }}>
      {/* decorative line */}
      <div className="absolute left-0 top-0 w-px h-full bg-white/5" />

      <div className="max-w-7xl mx-auto px-8 lg:px-20">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-24"
        >
          <span className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase">02 — About</span>
          <span className="flex-1 h-px bg-white/8" />
        </motion.div>

        {/* Editorial split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — giant heading */}
          <div ref={titleRef}>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: '100%' }}
                animate={titleVisible ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="text-[clamp(3rem,7vw,6rem)] font-thin leading-[1.05] tracking-tight text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Crafting<br />
                <em className="not-italic text-[#C9A84C]">experiences</em><br />
                not just sites.
              </motion.h2>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6 mt-16">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border border-white/6 p-5"
                >
                  <div className="text-4xl font-thin text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{s.num}</div>
                  <div className="text-[10px] tracking-[0.3em] text-white/35 uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — editorial text */}
          <div className="space-y-10 pt-4">
            <RevealBlock delay={0}>
              <p className="text-2xl font-thin text-white/80 leading-relaxed tracking-wide">
                I'm a creative engineer who lives at the intersection of<br />
                <span className="text-white">design, motion, and engineering.</span>
              </p>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <p className="text-base font-light text-white/40 leading-loose tracking-wide">
                Every project begins with a question: what should this feel like?
                I obsess over transitions, micro-interactions, and spatial relationships
                until a digital product becomes an experience that lingers in memory.
              </p>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <p className="text-base font-light text-white/40 leading-loose tracking-wide">
                From interactive WebGL installations to performance-obsessed production apps,
                I bring the same rigour to every pixel and every millisecond.
              </p>
            </RevealBlock>

            {/* Quote block */}
            <RevealBlock delay={0.3}>
              <div className="border-l-2 border-[#C9A84C] pl-6 py-2 mt-8">
                <blockquote className="text-lg font-thin text-white/70 italic leading-relaxed tracking-wide">
                  "The best interface is the one you never consciously notice —
                  only the emotion it leaves behind."
                </blockquote>
              </div>
            </RevealBlock>
          </div>
        </div>

        {/* Bottom — scrolling text band */}
        <div className="mt-32 border-t border-white/6 pt-16 overflow-hidden">
          <ScrollBand />
        </div>
      </div>
    </section>
  );
}

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollBand() {
  const words = ['Motion', 'Precision', 'Depth', 'Story', 'Craft', 'Wonder', 'Clarity', 'Flow'];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="text-[clamp(2rem,5vw,4rem)] font-thin tracking-widest uppercase select-none"
            style={{
              color: i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(201,168,76,0.12)',
              fontFamily: "'Syne', sans-serif"
            }}
          >
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
