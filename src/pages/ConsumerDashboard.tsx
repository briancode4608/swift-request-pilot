
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ConsumerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Consumer Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Track your deliveries and transport requests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 deliveries, 1 transport</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">27</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$180</div>
              <p className="text-xs text-muted-foreground">With bulk orders</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Services</CardTitle>
              <CardDescription>Request delivery or transport services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link to="/delivery">Send Package</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/transport">Book Ride</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">Track Orders</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Recent Orders</CardTitle>
              <CardDescription>Track your latest requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Package to Mom</p>
                    <p className="text-sm text-muted-foreground">Birthday gift</p>
                  </div>
                  <span className="text-sm text-blue-600">En Route</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Airport Ride</p>
                    <p className="text-sm text-muted-foreground">Tomorrow 8:00 AM</p>
                  </div>
                  <span className="text-sm text-yellow-600">Scheduled</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Grocery Delivery</p>
                    <p className="text-sm text-muted-foreground">Weekly essentials</p>
                  </div>
                  <span className="text-sm text-green-600">Delivered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
