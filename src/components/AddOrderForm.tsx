
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  customerName: z.string().min(2, "Customer name is required."),
  customerPhone: z.string().min(10, "A valid phone number is required."),
  tableNumber: z.string().min(1, "Table number is required."),
  items: z.string().min(3, "Please list at least one item."),
});

type FormValues = z.infer<typeof formSchema>;

interface AddOrderFormProps {
  onSuccess: (values: FormValues) => void;
  setOpen: (open: boolean) => void;
}

export function AddOrderForm({ onSuccess, setOpen }: AddOrderFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { customerName: "", customerPhone: "", tableNumber: "", items: "" },
  });

  function onSubmit(values: FormValues) {
    onSuccess(values);
    toast({
      title: "Order Created",
      description: `New order for ${values.customerName} has been created.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="customerName" render={({ field }) => (
          <FormItem><FormLabel>Customer Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <FormField control={form.control} name="customerPhone" render={({ field }) => (
          <FormItem><FormLabel>Customer Phone</FormLabel><FormControl><Input placeholder="+254 712 345 678" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <FormField control={form.control} name="tableNumber" render={({ field }) => (
          <FormItem><FormLabel>Table Number</FormLabel><FormControl><Input placeholder="T-05" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <FormField control={form.control} name="items" render={({ field }) => (
          <FormItem><FormLabel>Items</FormLabel><FormControl><Textarea placeholder="e.g., Cappuccino, Croissant" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <Button type="submit" className="w-full">Create Order</Button>
      </form>
    </Form>
  );
}
