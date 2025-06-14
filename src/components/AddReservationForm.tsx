
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "A valid phone number is required."),
  guests: z.coerce.number().min(1, "There must be at least 1 guest."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
});

interface AddReservationFormProps {
  setOpen: (open: boolean) => void;
}

export function AddReservationForm({ setOpen }: AddReservationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      guests: 1,
      date: new Date().toISOString().split("T")[0],
      time: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd send this to a server.
    console.log("New Reservation:", values);
    toast({
      title: "Reservation Booked",
      description: `A table for ${values.guests} has been booked for ${values.customerName}.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="customerName" render={({ field }) => (
          <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Smith" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+254 712 345 678" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <FormField control={form.control} name="guests" render={({ field }) => (
          <FormItem><FormLabel>Number of Guests</FormLabel><FormControl><Input type="number" min="1" {...field} /></FormControl><FormMessage /></FormItem>
        )}/>
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={form.control} name="time" render={({ field }) => (
            <FormItem><FormLabel>Time</FormLabel><FormControl><Input type="time" placeholder="19:30" {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
        </div>
        <Button type="submit" className="w-full">Book Reservation</Button>
      </form>
    </Form>
  );
}
