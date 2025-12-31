import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClickSoundManager from "./components/ClickSoundManager";
import { SoundProvider } from "./contexts/SoundContext";
import Loader from "./components/Loader";
import MouseSpotlight from "./components/MouseSpotlight";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Wait for all images to load before showing site
  const handleLoadingComplete = () => {
    // Find all images in the document
    const images = Array.from(document.images);
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }
    let loaded = 0;
    images.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === images.length) setIsLoading(false);
        });
        img.addEventListener('error', () => {
          loaded++;
          if (loaded === images.length) setIsLoading(false);
        });
      }
    });
    if (loaded === images.length) setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        <TooltipProvider>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <Loader onLoadingComplete={handleLoadingComplete} />
              </motion.div>
            ) : (
              <motion.div
                key="site"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ minHeight: '100vh' }}
              >
                <MouseSpotlight />
                <ClickSoundManager />
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </motion.div>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </SoundProvider>
    </QueryClientProvider>
  );
};

export default App;
