"use client";

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const productSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  quantityRemaining: z.coerce.number().min(0, 'Quantity must be 0 or more'),
  remarks: z.string().optional(),
  action: z.string().optional(),
});

const formSchema = z.object({
  salesAgentName: z.string().min(1, 'Sales agent name is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  customerAddress: z.string().min(1, 'Customer address is required'),
  supplyDate: z.date({ required_error: 'Supply date is required' }),
  dateOfVisit: z.date({ required_error: 'Date of visit is required' }),
  batchNumber: z.string().min(1, 'Batch number is required'),
  expiryDate: z.date({ required_error: 'Expiry date is required' }),
  productCondition: z.enum(['Good', 'Damaged']),
  outstandingBalance: z.coerce.number().min(0, 'Balance must be 0 or more'),
  products: z.array(productSchema).min(1, 'At least one product is required'),
});

export default function StockEntryForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesAgentName: '',
      customerName: '',
      customerAddress: '',
      batchNumber: '',
      productCondition: 'Good',
      outstandingBalance: 0,
      products: [{ productName: '', quantityRemaining: 0, remarks: '', action: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Report Submitted!',
      description: 'The stock report has been successfully submitted.',
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Visit & Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormField name="salesAgentName" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sales Agent Name</FormLabel>
                      <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="customerName" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Shoprite Lekki" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField name="customerAddress" control={form.control} render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Customer Address</FormLabel>
                      <FormControl><Input placeholder="e.g., 123 Admiralty Way" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="dateOfVisit" control={form.control} render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Visit</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="outstandingBalance" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Outstanding Balance (₦)</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 50000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
             <div className="flex justify-between items-center">
                <CardTitle>Batch & Product Details</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ productName: '', quantityRemaining: 0, remarks: '', action: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <FormField name="batchNumber" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Number</FormLabel>
                      <FormControl><Input placeholder="e.g., B012345" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="supplyDate" control={form.control} render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Supply Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField name="expiryDate" control={form.control} render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="productCondition" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overall Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Damaged">Damaged</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-9 gap-4 items-start border p-4 rounded-lg relative">
                        <FormField control={form.control} name={`products.${index}.productName`} render={({ field }) => (
                            <FormItem className="md:col-span-3"><FormLabel>Product Name</FormLabel><FormControl><Input {...field} placeholder="Product Name"/></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name={`products.${index}.quantityRemaining`} render={({ field }) => (
                            <FormItem className="md:col-span-1"><FormLabel>Qty</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name={`products.${index}.remarks`} render={({ field }) => (
                            <FormItem className="md:col-span-2"><FormLabel>Remarks</FormLabel><FormControl><Textarea {...field} placeholder="e.g. Stock running low" className="h-10" /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name={`products.${index}.action`} render={({ field }) => (
                            <FormItem className="md:col-span-2"><FormLabel>Action</FormLabel><FormControl><Input {...field} placeholder="e.g. Reorder"/></FormControl><FormMessage /></FormItem>
                        )}/>
                        <div className="md:col-span-1 self-center justify-self-end pt-6">
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg">Submit Report</Button>
      </form>
    </Form>
  );
}
