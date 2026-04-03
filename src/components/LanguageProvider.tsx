"use client";

import { createContext, useContext, useState } from "react";

type Lang = "de" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "de", toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");
  const toggle = () => setLang((l) => (l === "de" ? "en" : "de"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
