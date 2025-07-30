import { useEffect, useState } from "react";

export function useWindowSize(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isDesktop;
}
