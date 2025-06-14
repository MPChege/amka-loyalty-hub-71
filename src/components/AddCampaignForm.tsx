
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(5, "Campaign name must be at least 5 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  type: z.enum(["Discount", "Offer", "Bundle"], { required_error: "Please select a campaign type." }),
  startDate: z.string().refine((d) => new Date(d).toString() !== "Invalid Date", "Please enter a valid start date."),
  endDate: z.string().refine((d) => new Date(d).toString() !== "Invalid Date", "Please enter a valid end date."),
});

export type FormValues = z.infer<typeof formSchema>;

interface AddCampaignFormProps {
  onSuccess: (values: FormValues) => void;
  setOpen: (open: boolean) => void;
}

export function AddCampaignForm({ onSuccess, setOpen }: AddCampaignFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: undefined,
      startDate: "",
      endDate: "",
    },
  });

  function onSubmit(values: FormValues) {
    onSuccess(values);
    toast({
      title: "Campaign Created",
      description: `The "${values.name}" campaign has been scheduled.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl><Input placeholder="Summer Special" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
        )}/>
        <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Describe the campaign details..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
        )}/>
        <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a campaign type" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Discount">Discount</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Bundle">Bundle</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
        )}/>
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="startDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
          )}/>
          <FormField control={form.control} name="endDate" render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
          )}/>
        </div>
        <Button type="submit" className="w-full">Create Campaign</Button>
      </form>
    </Form>
  );
}
