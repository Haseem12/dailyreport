
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface PinDialogProps {
  storedPin: string | null;
  onPinSet: (pin: string) => void;
  onPinVerified: () => void;
}

export default function PinDialog({ storedPin, onPinSet, onPinVerified }: PinDialogProps) {
  const [input, setInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [error, setError] = useState('');

  const isSetupMode = !storedPin;

  const handleSetup = () => {
    if (input.length < 4) {
      setError('PIN must be at least 4 digits.');
      return;
    }
    if (input !== confirmInput) {
      setError('PINs do not match.');
      return;
    }
    setError('');
    onPinSet(input);
  };

  const handleLogin = () => {
    if (input === storedPin) {
      setError('');
      onPinVerified();
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSetupMode) {
      handleSetup();
    } else {
      handleLogin();
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{isSetupMode ? 'Create Your PIN' : 'Enter Your PIN'}</DialogTitle>
          <DialogDescription>
            {isSetupMode
              ? 'Create a secure 4-digit PIN to access your agent dashboard.'
              : 'Enter your PIN to continue.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter PIN"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={4}
          />
          {isSetupMode && (
            <Input
              type="password"
              placeholder="Confirm PIN"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              maxLength={4}
            />
          )}
          {error && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button type="submit" className="w-full">
              {isSetupMode ? 'Create PIN' : 'Login'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
