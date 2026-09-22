import { useCallback, useSyncExternalStore } from "react";

/**
 * Avalia uma media query em React. No servidor (e no HTML pré-renderizado)
 * devolve `false`, então quem depende disso só aparece após a hidratação —
 * aceitável para conteúdo decorativo, não para conteúdo essencial.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
