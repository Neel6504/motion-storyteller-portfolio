import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const update = () => {
      const widthMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const prefersCoarse = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);

      // Treat as mobile only when the viewport is narrow AND the device indicates coarse pointer or touch.
      // This avoids classifying touch-enabled desktops/laptops as mobile and preserves hover effects there.
      setIsMobile(!!(widthMobile && (prefersCoarse || hasTouch)));
    };

    // run once to initialize
    update();

    // Use addEventListener if available, otherwise fallback to addListener for older Safari
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update);
    } else if (typeof (mql as any).addListener === 'function') {
      (mql as any).addListener(update);
    }

    // also watch window resize as a fallback
    window.addEventListener('resize', update);

    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', update);
      } else if (typeof (mql as any).removeListener === 'function') {
        (mql as any).removeListener(update);
      }
      window.removeEventListener('resize', update);
    };
  }, []);

  return !!isMobile;
}
