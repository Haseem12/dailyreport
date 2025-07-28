
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { registerDepartment } from "@/app/admin/actions";


const formSchema = z.object({
  departmentName: z.string().min(1, "Department name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export default function RegisterDepartmentForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const result = await registerDepartment(values);
        toast({
            title: result.success ? 'Department Registered' : 'Registration Failed',
            description: result.message,
            variant: result.success ? 'default' : 'destructive',
        });
        if (result.success) {
            form.reset();
        }
    } catch (error) {
        toast({
            title: 'An Error Occurred',
            description: 'Failed to register the department. Please try again.',
            variant: 'destructive',
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="departmentName"
            render={({ field }) => (
              <FormItem>
                  <FormLabel>Department Name</FormLabel>
                   <FormControl>
                      <Input placeholder="e.g., Marketing" {...field} />
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
                  <FormLabel>Department Email</FormLabel>
                   <FormControl>
                      <Input type="email" placeholder="department@example.com" {...field} />
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
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Registering...' : 'Register Department'}
          </Button>
      </form>
    </Form>
  );
}
