import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@akshay.dev' },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-40 overflow-hidden" style={{ background: '#050505' }}>
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-8 lg:px-20">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-24"
        >
          <span className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase">05 — Contact</span>
          <span className="flex-1 h-px bg-white/8" />
        </motion.div>

        {/* Big headline */}
        <div className="mb-20 overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-[clamp(2.5rem,7vw,6.5rem)] font-thin leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's Build<br />
            Something<br />
            <span className="text-[#C9A84C]">Extraordinary.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20"
              >
                <div className="text-4xl font-thin text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Message received.
                </div>
                <p className="text-white/40 font-light tracking-wide">
                  I'll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <FloatInput
                  label="Your Name"
                  value={formState.name}
                  onChange={v => setFormState(s => ({ ...s, name: v }))}
                />
                <FloatInput
                  label="Email Address"
                  type="email"
                  value={formState.email}
                  onChange={v => setFormState(s => ({ ...s, email: v }))}
                />
                <FloatTextarea
                  label="Your Vision"
                  value={formState.message}
                  onChange={v => setFormState(s => ({ ...s, message: v }))}
                />
                <SubmitButton />
              </form>
            )}
          </motion.div>

          {/* Right — info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="text-white/40 font-light leading-loose tracking-wide max-w-sm">
                Open to freelance engagements, collaborations with ambitious studios,
                and full-time opportunities at forward-thinking companies.
              </p>

              <div className="mt-12">
                <div className="text-[10px] tracking-[0.4em] text-white/25 uppercase mb-4">Direct Line</div>
                <a
                  href="mailto:hello@akshay.dev"
                  className="text-xl font-thin text-white hover:text-[#C9A84C] transition-colors duration-300 tracking-wide"
                  data-cursor="hover"
                >
                  hello@akshay.dev
                </a>
              </div>

              <div className="mt-12">
                <div className="text-[10px] tracking-[0.4em] text-white/25 uppercase mb-6">Find Me</div>
                <div className="flex gap-5">
                  {socials.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="w-10 h-10 flex items-center justify-center border border-white/8 hover:border-[#C9A84C]/40 text-white/40 hover:text-[#C9A84C] transition-all duration-300"
                      data-cursor="hover"
                      aria-label={s.label}
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-white/6 flex items-center justify-between">
              <span className="text-xs tracking-[0.3em] text-white/20 uppercase">
                Akshay S &copy; {new Date().getFullYear()}
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-xs tracking-[0.3em] text-white/30 hover:text-white/60 uppercase transition-colors duration-300"
                data-cursor="hover"
              >
                Back to top <ArrowUpRight className="w-3 h-3 -rotate-45" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatInput({ label, value, onChange, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className="absolute left-0 transition-all duration-300 pointer-events-none"
        style={{
          top: active ? '-1.2rem' : '0.75rem',
          fontSize: active ? '0.65rem' : '0.8rem',
          letterSpacing: active ? '0.3em' : '0.1em',
          color: active ? '#C9A84C' : 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        className="w-full bg-transparent border-b py-3 text-white/80 text-sm font-light outline-none transition-colors duration-300 tracking-wide"
        style={{ borderBottomColor: focused ? '#C9A84C' : 'rgba(255,255,255,0.1)' }}
      />
    </div>
  );
}

function FloatTextarea({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative mt-10">
      <label
        className="absolute left-0 transition-all duration-300 pointer-events-none"
        style={{
          top: active ? '-1.2rem' : '0.75rem',
          fontSize: active ? '0.65rem' : '0.8rem',
          letterSpacing: active ? '0.3em' : '0.1em',
          color: active ? '#C9A84C' : 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        rows={4}
        className="w-full bg-transparent border-b py-3 text-white/80 text-sm font-light outline-none transition-colors duration-300 tracking-wide resize-none"
        style={{ borderBottomColor: focused ? '#C9A84C' : 'rgba(255,255,255,0.1)' }}
      />
    </div>
  );
}

function SubmitButton() {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <button
      ref={ref}
      type="submit"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="mt-4 flex items-center gap-3 px-8 py-4 text-xs tracking-[0.3em] uppercase bg-[#C9A84C] text-black hover:bg-white transition-all duration-500"
      style={{ transition: 'transform 0.3s ease, background-color 0.4s ease' }}
      data-cursor="hover"
    >
      Send Message <ArrowUpRight className="w-3 h-3" />
    </button>
  );
}
