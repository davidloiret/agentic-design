import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Calculate scroll position based on navbar state
    const handleScroll = () => {
      // Header height is approximately 44px as mentioned in NavigationTabs
      const headerHeight = 44;
      const currentScrollY = window.scrollY;
      
      // If we're already past the header, scroll to maintain navbar visibility
      // Otherwise scroll to top
      const scrollPosition = 0 // currentScrollY > headerHeight ? headerHeight : 0;
      
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    };

    // Small delay to ensure navigation has completed
    const timeoutId = setTimeout(handleScroll, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);
};