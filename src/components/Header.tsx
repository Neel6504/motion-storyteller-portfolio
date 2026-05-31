import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/contexts/SoundContext';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Tools', href: '#tools' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

const SoundToggle = () => {
  const { isSoundEnabled, toggleSound } = useSound();
  const magneticRef = useMagneticEffect({ strength: 0.2, speed: 0.15 });
  
  return (
    <Button
      ref={magneticRef as any}
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label={isSoundEnabled ? 'Mute sounds' : 'Unmute sounds'}
    >
      {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </Button>
  );
};

const NavLink = ({ item }: { item: typeof navItems[0] }) => {
  const magneticRef = useMagneticEffect({ strength: 0.15, speed: 0.2 });

  return (
    <li ref={magneticRef as any}>
      <a
        href={item.href}
        className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative group"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
      </a>
    </li>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const logoRef = useMagneticEffect({ strength: 0.2, speed: 0.15 });

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogoAnimating(true);
    setTimeout(() => setIsLogoAnimating(false), 600);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <nav className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <motion.a 
          ref={logoRef as any}
          href="#" 
          onClick={handleLogoClick}
          className="font-display font-bold text-xl md:text-2xl text-foreground hover:text-primary transition-colors inline-block cursor-pointer"
          animate={{
            scale: isLogoAnimating ? [1, 1.15, 1] : 1,
            filter: isLogoAnimating 
              ? [
                  'drop-shadow(0 0 0px rgba(82, 39, 255, 0))',
                  'drop-shadow(0 0 20px rgba(82, 39, 255, 0.9)) drop-shadow(0 0 40px rgba(255, 159, 252, 0.6))',
                  'drop-shadow(0 0 0px rgba(82, 39, 255, 0))'
                ]
              : 'drop-shadow(0 0 0px rgba(82, 39, 255, 0))',
          }}
          transition={{
            scale: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1], // ease-in-out
            },
            filter: {
              duration: 0.5,
              ease: [0, 0, 0.2, 1], // ease-out
            },
          }}
        >
          NL<span className="text-primary">.</span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </ul>
          <SoundToggle />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-6">
              <ul className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="text-foreground hover:text-primary transition-colors text-lg font-medium block py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm">Sound Effects</span>
                  <SoundToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
