import { useEffect, useRef } from "react";

export function useModalOpen(fn?: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(ev: MouseEvent) {
      if (ev.target instanceof Node && !ref.current?.contains(ev.target)) {
        fn?.();
      }
    }
    document.addEventListener("click", handleClick);

    function handleDownKey(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        fn?.();
      }
    }
    document.addEventListener("keydown", handleDownKey);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleDownKey);
    };
  }, [fn]);

  return [ref];
}
