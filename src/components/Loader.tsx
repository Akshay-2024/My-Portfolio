import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const called = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!called.current) {
        called.current = true;
        onComplete();
      }
    }, 2800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center"
        style={{ background: '#050505' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            className="text-[11vw] font-thin tracking-[0.3em] text-white select-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            AKSHAY
          </motion.div>

          <motion.div
            className="mt-6 w-48 h-px bg-white/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-[#C9A84C]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.9 }}
            />
          </motion.div>

          <motion.p
            className="mt-4 text-xs tracking-[0.4em] text-white/30 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Loading Experience
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
