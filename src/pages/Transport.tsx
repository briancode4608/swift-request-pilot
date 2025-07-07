
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormCard } from "@/components/forms/FormCard";
import { FormField } from "@/components/forms/FormField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";

const Transport = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: "",
    passengerCount: "",
    pickupLocation: "",
    destination: "",
    travelDate: "",
    travelTime: "",
    duration: "",
    specialRequests: "",
    contactName: "",
    contactPhone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log("Transport request submitted:", formData);
      toast({
        title: "Request Submitted",
        description: "Your transport request has been submitted successfully.",
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
          <h1 className="text-3xl font-bold">Request Transport</h1>
          <p className="text-muted-foreground mt-2">
            Book vehicles for personal or business transport needs
          </p>
        </div>

        <FormCard 
          title="Transport Request Form" 
          description="Provide details about your transport requirements"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Vehicle Type" required>
                <Select onValueChange={(value) => handleInputChange("vehicleType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Number of Passengers" required>
                <Select onValueChange={(value) => handleInputChange("passengerCount", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select passenger count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2-4">2-4 Passengers</SelectItem>
                    <SelectItem value="5-8">5-8 Passengers</SelectItem>
                    <SelectItem value="9+">9+ Passengers</SelectItem>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField label="Travel Date" required>
                <Input 
                  type="date" 
                  value={formData.travelDate}
                  onChange={(e) => handleInputChange("travelDate", e.target.value)}
                />
              </FormField>

              <FormField label="Travel Time" required>
                <Input 
                  type="time" 
                  value={formData.travelTime}
                  onChange={(e) => handleInputChange("travelTime", e.target.value)}
                />
              </FormField>

              <FormField label="Duration" required>
                <Select onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2h">1-2 hours</SelectItem>
                    <SelectItem value="3-5h">3-5 hours</SelectItem>
                    <SelectItem value="6-8h">6-8 hours</SelectItem>
                    <SelectItem value="full-day">Full Day</SelectItem>
                    <SelectItem value="multi-day">Multi-day</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Contact Name" required>
                <Input 
                  placeholder="Your full name" 
                  value={formData.contactName}
                  onChange={(e) => handleInputChange("contactName", e.target.value)}
                />
              </FormField>

              <FormField label="Contact Phone" required>
                <Input 
                  placeholder="Your contact number" 
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                />
              </FormField>
            </div>

            <FormField label="Special Requests">
              <Textarea 
                placeholder="Any special requirements or additional information..."
                value={formData.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                rows={4}
              />
            </FormField>

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

export default Transport;
