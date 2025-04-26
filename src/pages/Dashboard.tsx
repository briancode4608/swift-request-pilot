
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";

// Sample data for demonstration
const transportRequests = [
  {
    id: "TR001",
    customerName: "John Smith",
    pickupLocation: "123 Main St, City Center",
    destination: "456 Park Ave, North Side",
    vehicleType: "car",
    status: "pending",
    createdAt: "2025-04-26T09:30:00Z",
    phone: "+1234567890"
  },
  {
    id: "TR002",
    customerName: "Sarah Johnson",
    pickupLocation: "789 Oak Rd, East Side",
    destination: "321 Pine St, West Side",
    vehicleType: "suv",
    status: "accepted",
    createdAt: "2025-04-26T08:15:00Z",
    phone: "+1987654320"
  },
  {
    id: "TR003",
    customerName: "Michael Brown",
    pickupLocation: "555 Elm St, South Side",
    destination: "777 Maple Ave, Downtown",
    vehicleType: "van",
    status: "pending",
    createdAt: "2025-04-26T07:45:00Z",
    phone: "+1122334455"
  }
];

const deliveryRequests = [
  {
    id: "DR001",
    senderName: "Alex Williams",
    receiverName: "Lisa Davis",
    pickupLocation: "101 Business Rd, Industrial Park",
    destination: "202 Residential St, Suburbs",
    productType: "electronics",
    productSize: "medium",
    deliveryTimeline: "express",
    transportMode: "car",
    status: "pending",
    createdAt: "2025-04-26T10:00:00Z",
    senderPhone: "+1555666777",
    receiverPhone: "+1777888999"
  },
  {
    id: "DR002",
    senderName: "Robert Taylor",
    receiverName: "Emily Wilson",
    pickupLocation: "303 Shop Ave, Shopping District",
    destination: "404 University Rd, College Area",
    productType: "documents",
    productSize: "small",
    deliveryTimeline: "same-day",
    transportMode: "motorcycle",
    status: "accepted",
    createdAt: "2025-04-26T09:15:00Z",
    senderPhone: "+1222333444",
    receiverPhone: "+1444555666"
  },
  {
    id: "DR003",
    senderName: "Jessica Miller",
    receiverName: "David Garcia",
    pickupLocation: "505 Restaurant St, Food District",
    destination: "606 Apartment Rd, Residential Area",
    productType: "food",
    productSize: "small",
    deliveryTimeline: "express",
    transportMode: "motorcycle",
    status: "pending",
    createdAt: "2025-04-26T11:30:00Z",
    senderPhone: "+1888999000",
    receiverPhone: "+1000111222"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transport");

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            View and manage transport and delivery requests
          </p>
        </div>

        <Tabs defaultValue="transport" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="transport">
                Transport Requests
                <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/20" variant="outline">
                  {transportRequests.filter(r => r.status === "pending").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="delivery">
                Delivery Requests
                <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/20" variant="outline">
                  {deliveryRequests.filter(r => r.status === "pending").length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="transport" className="space-y-6">
            {transportRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transport requests available</p>
              </div>
            ) : (
              transportRequests.map((request) => (
                <Card key={request.id} className={request.status === "accepted" ? "border-l-4 border-l-secondary" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{request.customerName}</CardTitle>
                        <CardDescription>
                          ID: {request.id} • {formatDate(request.createdAt)} at {formatTime(request.createdAt)}
                        </CardDescription>
                      </div>
                      <Badge variant={request.status === "pending" ? "outline" : "secondary"}>
                        {request.status === "pending" ? "New Request" : "Accepted"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Pickup Location</h4>
                        <p className="text-sm text-muted-foreground">{request.pickupLocation}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Destination</h4>
                        <p className="text-sm text-muted-foreground">{request.destination}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Vehicle Type</h4>
                        <p className="text-sm text-muted-foreground capitalize">{request.vehicleType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Contact</h4>
                        <p className="text-sm text-muted-foreground">{request.phone}</p>
                      </div>
                      <div className="flex justify-end items-end md:col-span-1">
                        {request.status === "pending" && (
                          <div className="flex space-x-2">
                            <button className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-md hover:bg-secondary/80 transition-colors">
                              Accept Request
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="delivery" className="space-y-6">
            {deliveryRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No delivery requests available</p>
              </div>
            ) : (
              deliveryRequests.map((request) => (
                <Card key={request.id} className={request.status === "accepted" ? "border-l-4 border-l-secondary" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Package: {request.productType} ({request.productSize})
                        </CardTitle>
                        <CardDescription>
                          ID: {request.id} • {formatDate(request.createdAt)} at {formatTime(request.createdAt)}
                        </CardDescription>
                      </div>
                      <Badge variant={request.status === "pending" ? "outline" : "secondary"}>
                        {request.status === "pending" ? "New Request" : "Accepted"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Pickup Location</h4>
                        <p className="text-sm text-muted-foreground">{request.pickupLocation}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Destination</h4>
                        <p className="text-sm text-muted-foreground">{request.destination}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Sender</h4>
                        <p className="text-sm">{request.senderName}</p>
                        <p className="text-sm text-muted-foreground">{request.senderPhone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Receiver</h4>
                        <p className="text-sm">{request.receiverName}</p>
                        <p className="text-sm text-muted-foreground">{request.receiverPhone}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Timeline</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {request.deliveryTimeline.replace('-', ' ')}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Transport Mode</h4>
                        <p className="text-sm text-muted-foreground capitalize">{request.transportMode}</p>
                      </div>
                      <div className="flex justify-end items-end">
                        {request.status === "pending" && (
                          <div className="flex space-x-2">
                            <button className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-md hover:bg-secondary/80 transition-colors">
                              Accept Request
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
