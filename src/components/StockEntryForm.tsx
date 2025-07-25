
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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { submitStockReport } from '@/app/entry/actions';

const productSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  quantityRemaining: z.coerce.number().min(0, 'Quantity must be 0 or more'),
  batchNumber: z.string().min(1, 'Batch number is required'),
  supplyDate: z.date({ required_error: 'Supply date is required' }),
  expiryDate: z.date({ required_error: 'Expiry date is required' }),
  productCondition: z.enum(['Good', 'Damaged', 'Expired']),
});

const formSchema = z.object({
  salesAgentName: z.string().min(1, 'Sales agent name is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  customerAddress: z.string().min(1, 'Customer address is required'),
  dateOfVisit: z.date({ required_error: 'Date of visit is required' }),
  outstandingBalance: z.coerce.number().min(0, 'Balance must be 0 or more'),
  products: z.array(productSchema).min(1, 'At least one product is required'),
});

export type StockEntryFormValues = z.infer<typeof formSchema>;


export default function StockEntryForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesAgentName: '',
      customerName: '',
      customerAddress: '',
      outstandingBalance: 0,
      products: [
        {
          productName: '',
          quantityRemaining: 0,
          batchNumber: '',
          productCondition: 'Good',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        await submitStockReport(values);
        toast({
        title: 'Report Submitted!',
        description: 'The stock report has been successfully submitted.',
        });
        form.reset();
    } catch (error) {
        console.error("Report submission failed: ", error);
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Could not submit the report. Please try again.',
        });
    }
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
                <CardTitle>Product Details</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ productName: '', quantityRemaining: 0, batchNumber: '', productCondition: 'Good', supplyDate: new Date(), expiryDate: new Date() })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 overflow-x-auto">
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border p-4 rounded-lg relative">
                        <FormField control={form.control} name={`products.${index}.productName`} render={({ field }) => (
                            <FormItem className="md:col-span-2"><FormLabel>Product</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select Product" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="1.2L (BOTTLE/JERRYCAN): Plain">1.2L (BOTTLE/JERRYCAN): Plain</SelectItem>
                                    <SelectItem value="2.LT (BOTTLE/JERRYCAN): Plain">2.LT (BOTTLE/JERRYCAN): Plain</SelectItem>
                                    <SelectItem value="3.LT (BOTTLE/JERRYCAN): Banana">3.LT (BOTTLE/JERRYCAN): Banana</SelectItem>
                                    <SelectItem value="4.LT (BOTTLE/JERRYCAN): Chocolate">4.LT (BOTTLE/JERRYCAN): Chocolate</SelectItem>
                                    <SelectItem value="5.LT (BOTTLE/JERRYCAN): Strawberry">5.LT (BOTTLE/JERRYCAN): Strawberry</SelectItem>
                                    <SelectItem value="6.LT (BOTTLE/JERRYCAN): Sugar Free">6.LT (BOTTLE/JERRYCAN): Sugar Free</SelectItem>
                                    <SelectItem value="7.50CL BOTTLE/PLATE: Plain">7.50CL BOTTLE/PLATE: Plain</SelectItem>
                                    <SelectItem value="8.50CL BOTTLE/PLATE: Banana">8.50CL BOTTLE/PLATE: Banana</SelectItem>
                                    <SelectItem value="9.50CL BOTTLE/PLATE: Chocolate">9.50CL BOTTLE/PLATE: Chocolate</SelectItem>
                                    <SelectItem value="10.50CL BOTTLE/PLATE: Strawberry">10.50CL BOTTLE/PLATE: Strawberry</SelectItem>
                                    <SelectItem value="11.50CL BOTTLE/PLATE: Sugar Free">11.50CL BOTTLE/PLATE: Sugar Free</SelectItem>
                                    <SelectItem value="12.60CL PLATE: Plain">12.60CL PLATE: Plain</SelectItem>
                                    <SelectItem value="13.60CL PLATE: Banana">13.60CL PLATE: Banana</SelectItem>
                                    <SelectItem value="14.60CL PLATE: Chocolate">14.60CL PLATE: Chocolate</SelectItem>
                                    <SelectItem value="15.60CL PLATE: Strawberry">15.60CL PLATE: Strawberry</SelectItem>
                                    <SelectItem value="16.60CL PLATE: Sugar Free">16.60CL PLATE: Sugar Free</SelectItem>
                                    <SelectItem value="17.40CL PLATE/BOTTLE: Plain">17.40CL PLATE/BOTTLE: Plain</SelectItem>
                                    <SelectItem value="18.40CL PLATE/BOTTLE: Banana">18.40CL PLATE/BOTTLE: Banana</SelectItem>
                                    <SelectItem value="19.40CL PLATE/BOTTLE: Chocolate">19.40CL PLATE/BOTTLE: Chocolate</SelectItem>
                                    <SelectItem value="20.40CL PLATE/BOTTLE: Strawberry">20.40CL PLATE/BOTTLE: Strawberry</SelectItem>
                                    <SelectItem value="21.40CL PLATE/BOTTLE: Greek Yoghurt Sweetened">21.40CL PLATE/BOTTLE: Greek Yoghurt Sweetened</SelectItem>
                                    <SelectItem value="22.40CL PLATE/BOTTLE: Greek Yoghurt Unsweetened">22.40CL PLATE/BOTTLE: Greek Yoghurt Unsweetened</SelectItem>
                                    <SelectItem value="23.38CL: Banana">23.38CL: Banana</SelectItem>
                                    <SelectItem value="24.38CL: Chocolate">24.38CL: Chocolate</SelectItem>
                                    <SelectItem value="25.38CL: Strawberry">25.38CL: Strawberry</SelectItem>
                                    <SelectItem value="26.38CL: Plain">26.38CL: Plain</SelectItem>
                                    <SelectItem value="SBT:">SBT:</SelectItem>
                                    <SelectItem value="QLT:">QLT:</SelectItem>
                                    <SelectItem value="BT:">BT:</SelectItem>
                                    <SelectItem value="BEX:">BEX:</SelectItem>
                                    <SelectItem value="BE:">BE:</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name={`products.${index}.quantityRemaining`} render={({ field }) => (
                            <FormItem className="md:col-span-1"><FormLabel>Qty</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name={`products.${index}.batchNumber`} render={({ field }) => (
                            <FormItem className="md:col-span-2"><FormLabel>Batch No.</FormLabel><FormControl><Input {...field} placeholder="Batch Number"/></FormControl><FormMessage /></FormItem>
                        )}/>
                         <FormField name={`products.${index}.supplyDate`} control={form.control} render={({ field }) => (
                            <FormItem className="flex flex-col md:col-span-2"><FormLabel>Supply Date</FormLabel>
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
                        )} />
                        <FormField name={`products.${index}.expiryDate`} control={form.control} render={({ field }) => (
                            <FormItem className="flex flex-col md:col-span-2"><FormLabel>Expiry Date</FormLabel>
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
                        )} />
                        <FormField control={form.control} name={`products.${index}.productCondition`} render={({ field }) => (
                            <FormItem className="md:col-span-2"><FormLabel>Condition</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger></FormControl>
                                <SelectContent>
                                <SelectItem value="Good">Good</SelectItem>
                                <SelectItem value="Damaged">Damaged</SelectItem>
                                <SelectItem value="Expired">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage /></FormItem>
                        )}/>
                        <div className="md:col-span-1 self-center justify-self-end pt-6">
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </form>
    </Form>
  );
}
