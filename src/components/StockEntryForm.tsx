
"use client";

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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// Define a type for a single product in the form
type ProductForm = {
  id: number;
  productName: string;
  quantityRemaining: number;
  batchNumber: string;
  supplyDate?: Date;
  expiryDate?: Date;
  productCondition: 'Good' | 'Damaged' | 'Expired';
};

export default function StockEntryForm() {
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductForm[]>([
    { id: 1, productName: '', quantityRemaining: 0, batchNumber: '', productCondition: 'Good' },
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      { id: Date.now(), productName: '', quantityRemaining: 0, batchNumber: '', productCondition: 'Good' },
    ]);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
        // Since we are in a static build, we can't submit the form.
        // We will just show a toast notification.
        toast({
            title: 'Form Submission Disabled',
            description: 'This form cannot be submitted in a static build. Please re-enable server components.',
            variant: 'destructive',
        });
    } catch (error) {
        console.error("This should not happen in static build: ", error);
    }
  }

  return (
      <form onSubmit={onSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Visit & Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Sales Agent Name</Label>
                    <Input placeholder="e.g., John Doe" />
                </div>
                <div className="space-y-2">
                    <Label>Customer Name</Label>
                    <Input placeholder="e.g., Shoprite Lekki" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label>Customer Address</Label>
                    <Input placeholder="e.g., 123 Admiralty Way" />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Date of Visit</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn('pl-3 text-left font-normal', 'text-muted-foreground')}>
                                <span>Pick a date</span>
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label>Outstanding Balance (₦)</Label>
                    <Input type="number" placeholder="e.g., 50000" />
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
             <div className="flex justify-between items-center">
                <CardTitle>Product Details</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addProduct}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 overflow-x-auto">
            <div className="space-y-4">
                {products.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border p-4 rounded-lg relative">
                        <div className="md:col-span-2 space-y-2">
                            <Label>Product</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select Product" /></SelectTrigger>
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
                        </div>
                        <div className="md:col-span-1 space-y-2"><Label>Qty</Label><Input type="number" /></div>
                        <div className="md:col-span-2 space-y-2"><Label>Batch No.</Label><Input placeholder="Batch Number"/></div>
                        <div className="flex flex-col md:col-span-2 space-y-2"><Label>Supply Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={cn('pl-3 text-left font-normal', 'text-muted-foreground')}>
                                        <span>Pick a date</span>
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col md:col-span-2 space-y-2"><Label>Expiry Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={cn('pl-3 text-left font-normal', 'text-muted-foreground')}>
                                        <span>Pick a date</span>
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>Condition</Label>
                            <Select defaultValue="Good">
                                <SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Damaged">Damaged</SelectItem>
                                    <SelectItem value="Expired">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-1 self-center justify-self-end pt-6">
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeProduct(field.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg">
            Submit Report
        </Button>
      </form>
  );
}
