
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import PinDialog from './PinDialog';

export default function AgentAuthLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedPin = localStorage.getItem('agent-pin');
      if (storedPin) {
        setPin(storedPin);
      } else {
        // If no PIN is stored, we will show the setup dialog
        // so we don't need to authenticate immediately.
        setIsAuthenticated(false); 
      }
    } catch (error) {
      console.error("Could not access local storage", error);
    }
  }, []);

  const handlePinSet = (newPin: string) => {
    try {
      localStorage.setItem('agent-pin', newPin);
      setPin(newPin);
      setIsAuthenticated(true);
    } catch (error) {
       console.error("Could not save PIN to local storage", error);
    }
  };

  const handlePinVerified = () => {
    setIsAuthenticated(true);
  };
  
  if (!isClient) {
    // Render nothing or a loading spinner on the server
    return null;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40">
      <PinDialog
        storedPin={pin}
        onPinSet={handlePinSet}
        onPinVerified={handlePinVerified}
      />
    </div>
  );
}
