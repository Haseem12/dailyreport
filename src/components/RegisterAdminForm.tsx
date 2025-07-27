
"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function RegisterAdminForm() {
  const [state, setState] = useState<{ message: string; success: boolean }>({ message: "", success: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState({
        message: "This form is disabled for static export. Please re-enable server components for this feature.",
        success: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="departmentName">Department Name</Label>
          <Input
            id="departmentName"
            name="departmentName"
            type="text"
            required
            placeholder="e.g., Marketing"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Department Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="department@example.com"
          />
        </div>
        <div className="space-y-2">
           <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
          />
        </div>
      </div>

      {!state.success && state.message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registration Failed</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full">
          Register Department
      </Button>
    </form>
  );
}
