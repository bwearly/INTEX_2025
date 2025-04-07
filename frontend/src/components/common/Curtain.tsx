import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CurtainReveal = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence>
        {!isOpen && (
          <>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="absolute top-0 left-0 h-full w-1/2 bg-red-800 z-40"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="absolute top-0 right-0 h-full w-1/2 bg-red-800 z-40"
            />
          </>
        )}
      </AnimatePresence>

      <div className={`z-10 relative w-full h-full transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default CurtainReveal;
