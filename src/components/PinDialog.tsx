
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LockKeyhole } from 'lucide-react';

interface PinDialogProps {
  onPinSuccess: () => void;
  onPinRegister: (pin: string) => void;
  hasRegisteredPin: boolean;
}

export default function PinDialog({
  onPinSuccess,
  onPinRegister,
  hasRegisteredPin,
}: PinDialogProps) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('agentPin');
    if (pin === storedPin) {
      setError('');
      onPinSuccess();
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
        setError('PIN must be 4 digits.');
        return;
    }
    if (pin !== confirmPin) {
      setError('PINs do not match. Please try again.');
      setConfirmPin('');
      return;
    }
    setError('');
    onPinRegister(pin);
  };

  const isRegisterMode = !hasRegisteredPin;

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" hideCloseButton={true}>
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">
            {isRegisterMode ? 'Create Agent PIN' : 'Agent Verification'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isRegisterMode
              ? "This is a new device. Please create a 4-digit PIN to secure your access."
              : 'Please enter your 4-digit PIN to access the dashboard.'}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={isRegisterMode ? handleRegisterSubmit : handleLoginSubmit}
          className="space-y-4"
        >
          <Input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="text-center text-2xl tracking-[1rem]"
            placeholder="••••"
            autoFocus
          />
          {isRegisterMode && (
            <Input
              type="password"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="text-center text-2xl tracking-[1rem]"
              placeholder="••••"
              aria-label="Confirm PIN"
            />
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {isRegisterMode ? 'Registration Failed' : 'Authentication Failed'}
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button type="submit" className="w-full">
              {isRegisterMode ? 'Register PIN' : 'Unlock'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
