"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// false auf dem Server und während der Hydration, danach true —
// gleiche Semantik wie das frühere useState+useEffect-Muster.
export function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
