import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative" style={{ cursor: 'none' }}>
      <Cursor />

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Nav />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}
