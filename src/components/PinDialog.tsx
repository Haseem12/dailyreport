
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

const CORRECT_PIN = '1234'; // In a real app, this would not be hardcoded

export default function PinDialog({ onPinSuccess }: { onPinSuccess: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setError('');
      onPinSuccess();
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" hideCloseButton={true}>
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Agent Verification</DialogTitle>
          <DialogDescription className="text-center">
            Please enter your 4-digit PIN to access the dashboard.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <Input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="text-center text-2xl tracking-[1rem]"
            placeholder="••••"
            autoFocus
          />
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
