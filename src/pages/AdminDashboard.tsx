
import React, { useState } from 'react';
import { useAuth, User, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'admin@deliverydrive.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'business@example.com',
      name: 'Business User',
      role: 'business',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      email: 'consumer@example.com',
      name: 'Consumer User',
      role: 'consumer',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      email: 'transporter@example.com',
      name: 'Transporter User',
      role: 'transporter',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'consumer' as UserRole,
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'consumer' });
    
    toast({
      title: "User Added",
      description: `${user.name} has been added successfully.`,
    });
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User Removed",
      description: "User has been removed successfully.",
    });
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'business': return 'bg-blue-100 text-blue-800';
      case 'consumer': return 'bg-green-100 text-green-800';
      case 'transporter': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Manage users and system settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Business Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'business').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Consumers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'consumer').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Transporters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'transporter').length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all system users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            Remove
                          </Button>
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
                <CardTitle>Add New User</CardTitle>
                <CardDescription>Create a new user account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter user name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUser.role} onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="consumer">Consumer</SelectItem>
                      <SelectItem value="transporter">Transporter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleAddUser} className="w-full">
                  Add User
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
                <CardDescription>Navigate to other dashboards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/business-dashboard">Business Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/consumer-dashboard">Consumer Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/transporter-dashboard">Transporter Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
