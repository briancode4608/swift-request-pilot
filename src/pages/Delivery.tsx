
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";

const formSchema = z.object({
  productSize: z.string({
    required_error: "Please select a product size",
  }),
  productType: z.string({
    required_error: "Please select a product type",
  }),
  deliveryTimeline: z.string({
    required_error: "Please select a delivery timeline",
  }),
  transportMode: z.string({
    required_error: "Please select a transport mode",
  }),
  pickupLocation: z.string().min(3, {
    message: "Pickup location must be at least 3 characters",
  }),
  destination: z.string().min(3, {
    message: "Destination must be at least 3 characters",
  }),
  senderName: z.string().min(2, {
    message: "Sender name must be at least 2 characters",
  }),
  senderPhone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  receiverName: z.string().min(2, {
    message: "Receiver name must be at least 2 characters",
  }),
  receiverPhone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Delivery = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productSize: "",
      productType: "",
      deliveryTimeline: "",
      transportMode: "",
      pickupLocation: "",
      destination: "",
      senderName: "",
      senderPhone: "",
      receiverName: "",
      receiverPhone: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log("Delivery request submitted:", data);
      toast({
        title: "Request Submitted",
        description: "Your delivery request has been submitted successfully.",
      });
      navigate("/dashboard");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Request Delivery</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to request a package delivery
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Delivery Request Form</CardTitle>
            <CardDescription>
              Provide details about your package and delivery needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="productSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Size</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Small (&lt; 5kg)</SelectItem>
                            <SelectItem value="medium">Medium (5-20kg)</SelectItem>
                            <SelectItem value="large">Large (20-50kg)</SelectItem>
                            <SelectItem value="extra-large">Extra Large (&gt; 50kg)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="documents">Documents</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="fragile">Fragile Items</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="deliveryTimeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Timeline</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select delivery timeline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="express">Express (1-3 hrs)</SelectItem>
                            <SelectItem value="same-day">Same Day</SelectItem>
                            <SelectItem value="next-day">Next Day</SelectItem>
                            <SelectItem value="standard">Standard (2-3 days)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transportMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transport Mode</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transport mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="motorcycle">Motorcycle</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="pickupLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pickup address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter destination address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Sender Information</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="senderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sender Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Sender's full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="senderPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sender Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Sender's contact number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Receiver Information</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="receiverName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Receiver Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Receiver's full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="receiverPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Receiver Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Receiver's contact number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Delivery;
