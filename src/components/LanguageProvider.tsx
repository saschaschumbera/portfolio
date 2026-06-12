"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "de" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "de", toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");
  const toggle = () => setLang((l) => (l === "de" ? "en" : "de"));

  // Must run post-hydration: SSR always renders "de", a lazy initializer would mismatch.
  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "de" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
