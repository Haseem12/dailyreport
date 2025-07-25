
"use client";

import { useActionState } from 'react';
import { registerDepartmentAction, type RegisterAdminFormState } from '@/app/register/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Registering...' : 'Register Department'}
        </Button>
    )
}

export default function RegisterAdminForm() {
  const initialState: RegisterAdminFormState = { message: "", success: false };
  const [state, formAction] = useActionState(registerDepartmentAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
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

      <SubmitButton />
    </form>
  );
}
