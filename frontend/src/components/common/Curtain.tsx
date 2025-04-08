import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from 'react-bootstrap';
const Curtain = ({ children }: { children: React.ReactNode }) => {
  const [showCurtain, setShowCurtain] = useState(true);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [revealContent, setRevealContent] = useState(false);
  useEffect(() => {
    const curtainTimer = setTimeout(() => setShowCurtain(false), 3000);
    const spotlightTimer = setTimeout(() => setShowSpotlight(true), 3000);
    const contentTimer = setTimeout(() => setRevealContent(true), 4000);
    const spotlightEndTimer = setTimeout(() => setShowSpotlight(false), 6000);
    const spotlighttest = 1;
    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(spotlightTimer);
      clearTimeout(contentTimer);
      clearTimeout(spotlightEndTimer);
    };
  }, []);
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        overflow: showCurtain ? 'hidden' : 'visible',
      }}
    >
      {/* Curtains */}
      {showCurtain && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 3, ease: [0.68, -0.55, 0.27, 1.55] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100%',
              width: '50%',
              background: `
                repeating-linear-gradient(
                  to right,
                  #8B0000,
                  #8B0000 4px,
                  #600000 6px,
                  #8B0000 10px
                )`,
              boxShadow: 'inset 5px 0 10px rgba(0, 0, 0, 0.5)',
              zIndex: 30,
            }}
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 3, ease: [0.68, -0.55, 0.27, 1.55] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: '50%',
              background: `
                repeating-linear-gradient(
                  to right,
                  #8B0000,
                  #8B0000 4px,
                  #600000 6px,
                  #8B0000 10px
                )`,
              boxShadow: 'inset -5px 0 10px rgba(0, 0, 0, 0.5)',
              zIndex: 30,
            }}
          />
        </>
      )}
      {/* Spotlight */}
      {showSpotlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 100px 80px, rgba(255,255,255,0.3), transparent 300px)`,
            filter: 'blur(10px)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealContent ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 20, position: 'relative' }}
      >
        <Navbar />
      </motion.div>
      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 15,
          opacity: revealContent ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Curtain;
