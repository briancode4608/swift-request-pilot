
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormCard } from "@/components/forms/FormCard";
import { FormField } from "@/components/forms/FormField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";

const Delivery = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log("Delivery request submitted:", formData);
      toast({
        title: "Request Submitted",
        description: "Your delivery request has been submitted successfully.",
      });
      navigate("/dashboard");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Request Delivery</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to request a package delivery
          </p>
        </div>

        <FormCard 
          title="Delivery Request Form" 
          description="Provide details about your package and delivery needs"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Product Size" required>
                <Select onValueChange={(value) => handleInputChange("productSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (&lt; 5kg)</SelectItem>
                    <SelectItem value="medium">Medium (5-20kg)</SelectItem>
                    <SelectItem value="large">Large (20-50kg)</SelectItem>
                    <SelectItem value="extra-large">Extra Large (&gt; 50kg)</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Product Type" required>
                <Select onValueChange={(value) => handleInputChange("productType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="fragile">Fragile Items</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Delivery Timeline" required>
                <Select onValueChange={(value) => handleInputChange("deliveryTimeline", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="express">Express (1-3 hrs)</SelectItem>
                    <SelectItem value="same-day">Same Day</SelectItem>
                    <SelectItem value="next-day">Next Day</SelectItem>
                    <SelectItem value="standard">Standard (2-3 days)</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Transport Mode" required>
                <Select onValueChange={(value) => handleInputChange("transportMode", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transport mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Pickup Location" required>
                <Input 
                  placeholder="Enter pickup address" 
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                />
              </FormField>

              <FormField label="Destination" required>
                <Input 
                  placeholder="Enter destination address" 
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Sender Information</h3>
                <FormField label="Sender Name" required>
                  <Input 
                    placeholder="Sender's full name" 
                    value={formData.senderName}
                    onChange={(e) => handleInputChange("senderName", e.target.value)}
                  />
                </FormField>
                <FormField label="Sender Phone" required>
                  <Input 
                    placeholder="Sender's contact number" 
                    value={formData.senderPhone}
                    onChange={(e) => handleInputChange("senderPhone", e.target.value)}
                  />
                </FormField>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Receiver Information</h3>
                <FormField label="Receiver Name" required>
                  <Input 
                    placeholder="Receiver's full name" 
                    value={formData.receiverName}
                    onChange={(e) => handleInputChange("receiverName", e.target.value)}
                  />
                </FormField>
                <FormField label="Receiver Phone" required>
                  <Input 
                    placeholder="Receiver's contact number" 
                    value={formData.receiverPhone}
                    onChange={(e) => handleInputChange("receiverPhone", e.target.value)}
                  />
                </FormField>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </FormCard>
      </main>
    </div>
  );
};

export default Delivery;
