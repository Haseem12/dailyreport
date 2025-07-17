
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import PinDialog from './PinDialog';

export default function AgentAuthLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinIsSet, setPinIsSet] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedPin = localStorage.getItem('agentPin');
    if (storedPin) {
      setPinIsSet(true);
      const authStatus = localStorage.getItem('agentAuthenticated');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handlePinSuccess = () => {
    localStorage.setItem('agentAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handlePinRegister = (pin: string) => {
    localStorage.setItem('agentPin', pin);
    setPinIsSet(true);
    handlePinSuccess();
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <PinDialog
          onPinSuccess={handlePinSuccess}
          onPinRegister={handlePinRegister}
          hasRegisteredPin={pinIsSet}
        />
      )}
    </>
  );
}
