
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { register } from "@/app/register/actions";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterAgentForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await register(values, 'agent');
       toast({
        title: result.success ? 'Agent Registered' : 'Registration Failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
      if (result.success) {
        form.reset();
      }
    } catch (error) {
       toast({
        title: 'Registration Failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                              <Input placeholder="e.g., Jane Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                              <Input type="email" placeholder="agent@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                              <Input placeholder="e.g., 08012345678" {...field} />
                          </FormControl>
                           <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                              <Input type="password" placeholder="Create a password" {...field} />
                          </FormControl>
                           <FormMessage />
                      </FormItem>
                  )}
              />
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Registering...' : 'Register Agent'}
          </Button>
      </form>
    </Form>
  );
}
