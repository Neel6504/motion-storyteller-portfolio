import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = () => {
    setIsSoundEnabled((prev: boolean) => !prev);
  };

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
