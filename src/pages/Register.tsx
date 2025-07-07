
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/contexts/AuthContext';
import { Building2, ShoppingCart, Truck, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Business specific
    companyName: '',
    businessType: '',
    address: '',
    phone: '',
    // Consumer specific
    deliveryAddress: '',
    // Transporter specific
    vehicleType: '',
    licenseNumber: '',
    experience: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const roleOptions = [
    {
      value: 'business' as UserRole,
      label: 'Business',
      description: 'I want to send packages and manage deliveries',
      icon: Building2
    },
    {
      value: 'consumer' as UserRole,
      label: 'Consumer',
      description: 'I want to receive packages and book deliveries',
      icon: ShoppingCart
    },
    {
      value: 'transporter' as UserRole,
      label: 'Transporter',
      description: 'I want to deliver packages and provide transport',
      icon: Truck
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('details');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created. You can now sign in.",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'role') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Join Delivery Drive</h1>
            <p className="text-muted-foreground">Choose your account type to get started</p>
          </div>

          <div className="grid gap-4">
            {roleOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card 
                  key={option.value}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50"
                  onClick={() => handleRoleSelect(option.value)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{option.label}</h3>
                        <p className="text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => setStep('role')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to role selection
          </Button>
          <h1 className="text-3xl font-bold">Create {selectedRole} Account</h1>
          <p className="text-muted-foreground">Enter your details to complete registration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Fill in your information below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Full Name" required>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </FormField>

              <FormField label="Email" required>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </FormField>

              <FormField label="Password" required>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </FormField>

              <FormField label="Confirm Password" required>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </FormField>

              {selectedRole === 'business' && (
                <>
                  <FormField label="Company Name" required>
                    <Input
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Enter your company name"
                      required
                    />
                  </FormField>

                  <FormField label="Business Type" required>
                    <Input
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      placeholder="e.g., Retail, Restaurant, E-commerce"
                      required
                    />
                  </FormField>

                  <FormField label="Business Address" required>
                    <Textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your business address"
                      required
                    />
                  </FormField>

                  <FormField label="Phone Number" required>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </FormField>
                </>
              )}

              {selectedRole === 'consumer' && (
                <FormField label="Delivery Address" required>
                  <Textarea
                    value={formData.deliveryAddress}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                    placeholder="Enter your preferred delivery address"
                    required
                  />
                </FormField>
              )}

              {selectedRole === 'transporter' && (
                <>
                  <FormField label="Vehicle Type" required>
                    <Input
                      value={formData.vehicleType}
                      onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                      placeholder="e.g., Van, Truck, Motorcycle"
                      required
                    />
                  </FormField>

                  <FormField label="License Number" required>
                    <Input
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      placeholder="Enter your driving license number"
                      required
                    />
                  </FormField>

                  <FormField label="Experience" required>
                    <Input
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="Years of driving/delivery experience"
                      required
                    />
                  </FormField>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
