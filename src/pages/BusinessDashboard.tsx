
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const BusinessDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Business Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Manage your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+12 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450</div>
              <p className="text-xs text-muted-foreground">+$340 from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common business operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link to="/delivery">Request Delivery</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/transport">Book Transport</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">View All Requests</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest business transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Package Delivery</p>
                    <p className="text-sm text-muted-foreground">To Downtown Office</p>
                  </div>
                  <span className="text-sm text-green-600">Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bulk Transport</p>
                    <p className="text-sm text-muted-foreground">Warehouse Supplies</p>
                  </div>
                  <span className="text-sm text-blue-600">In Progress</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Document Delivery</p>
                    <p className="text-sm text-muted-foreground">Legal Documents</p>
                  </div>
                  <span className="text-sm text-yellow-600">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BusinessDashboard;
