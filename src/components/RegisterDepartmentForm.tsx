
"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';

export default function RegisterDepartmentForm() {
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'This form is disabled for static export. Please re-enable server components.',
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
            <Label>Department Name</Label>
            <Input placeholder="e.g., Marketing" />
        </div>
        <div className="space-y-2">
            <Label>Department Email</Label>
            <Input type="email" placeholder="department@example.com" />
        </div>
        <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Create a password" />
        </div>
        <Button type="submit" className="w-full">
            Register Department
        </Button>
    </form>
  );
}
