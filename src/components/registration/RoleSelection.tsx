
import { Button } from '@/components/ui/button';
import { UserRole } from '@/contexts/AuthContext';
import { Building2, ShoppingCart, Truck, ArrowLeft } from 'lucide-react';
import { RoleCard } from './RoleCard';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
  onBack: () => void;
}

export const RoleSelection = ({ onRoleSelect, onBack }: RoleSelectionProps) => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Join Delivery Drive</h1>
          <p className="text-muted-foreground">Choose your account type to get started</p>
        </div>

        <div className="grid gap-4">
          {roleOptions.map((option) => (
            <RoleCard
              key={option.value}
              role={option.value}
              label={option.label}
              description={option.description}
              icon={option.icon}
              onSelect={onRoleSelect}
            />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
