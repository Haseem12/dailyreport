
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import PinDialog from './PinDialog';

export default function AgentAuthLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const authStatus = localStorage.getItem('agentAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinSuccess = () => {
    localStorage.setItem('agentAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  if (!isClient) {
    // Render nothing or a loading spinner on the server to avoid hydration mismatch
    return null;
  }

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <PinDialog onPinSuccess={handlePinSuccess} />
      )}
    </>
  );
}
