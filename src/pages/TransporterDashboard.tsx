
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/Navbar';

const TransporterDashboard = () => {
  const { user } = useAuth();

  const availableJobs = [
    { id: '1', type: 'Delivery', pickup: 'Downtown', destination: 'Airport', payment: '$25', urgency: 'Standard' },
    { id: '2', type: 'Transport', pickup: 'Mall', destination: 'Hotel', payment: '$45', urgency: 'Express' },
    { id: '3', type: 'Delivery', pickup: 'Office', destination: 'Residential', payment: '$18', urgency: 'Same Day' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Transporter Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Manage your transport jobs and earnings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">New opportunities</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Jobs finished</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$180</div>
              <p className="text-xs text-muted-foreground">+$45 from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Available Jobs</CardTitle>
                <CardDescription>Jobs matching your vehicle and location</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Pickup</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.type}</TableCell>
                        <TableCell>{job.pickup}</TableCell>
                        <TableCell>{job.destination}</TableCell>
                        <TableCell className="font-medium text-green-600">{job.payment}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.urgency === 'Express' ? 'bg-red-100 text-red-800' :
                            job.urgency === 'Same Day' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {job.urgency}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm">Accept</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Status</CardTitle>
                <CardDescription>Your current vehicle information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Vehicle Type</p>
                  <p className="text-sm text-muted-foreground">Van</p>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <span className="text-sm text-green-600">Available</span>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Downtown Area</p>
                </div>
                <Button className="w-full">Update Status</Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
                <CardDescription>Your performance this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Jobs Completed</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Earnings</span>
                  <span className="font-medium">$890</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-medium">4.8 ⭐</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransporterDashboard;
