
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { BusinessForm } from './BusinessForm';
import { ConsumerForm } from './ConsumerForm';
import { TransporterForm } from './TransporterForm';

interface RegistrationFormProps {
  selectedRole: UserRole;
  onBack: () => void;
}

export const RegistrationForm = ({ selectedRole, onBack }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Business specific
    companyName: '',
    businessType: '',
    coreProduct: '',
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
        description: "Your account has been created. You can now log in.",
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

  const renderRoleSpecificFields = () => {
    switch (selectedRole) {
      case 'business':
        return (
          <BusinessForm
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 'consumer':
        return (
          <ConsumerForm
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 'transporter':
        return (
          <TransporterForm
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={onBack}
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

              {renderRoleSpecificFields()}

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
