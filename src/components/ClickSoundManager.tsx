import { useEffect } from 'react';
import { useClickSound } from '@/hooks/useClickSound';
import { useSound } from '@/contexts/SoundContext';

const ClickSoundManager = () => {
  const { playClickSound } = useClickSound();
  const { isSoundEnabled } = useSound();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isSoundEnabled) return;
      
      const target = e.target as HTMLElement;
      // Play sound on clickable elements
      if (target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]')) {
        playClickSound();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [playClickSound, isSoundEnabled]);

  return null;
};

export default ClickSoundManager;
