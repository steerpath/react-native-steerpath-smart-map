import React, { createContext, useMemo, useState, useContext } from 'react';

interface SmartMapContextContent {
  smartMapRef: any;
  setSmartMapRef: (ref: any) => void;
}

const SmartMapContext = createContext<SmartMapContextContent | null>(null);

export function SmartMapProvider({ children }: { children: any }) {
  const [smartMapRef, setSmartMapRef] = useState(null);

  const context = useMemo(() => {
    return {
      smartMapRef,
      setSmartMapRef,
    };
  }, [smartMapRef]);
  return <SmartMapContext.Provider value={context}>{children}</SmartMapContext.Provider>;
}

export function useSmartMapContext() {
  const context = useContext(SmartMapContext);
  if (!context) {
    throw new Error('Smart map context hook is not used correctly');
  }
  return context;
}
