
import { Card, CardContent } from '@/components/ui/card';
import { UserRole } from '@/contexts/AuthContext';
import { LucideIcon } from 'lucide-react';

interface RoleCardProps {
  role: UserRole;
  label: string;
  description: string;
  icon: LucideIcon;
  onSelect: (role: UserRole) => void;
}

export const RoleCard = ({ role, label, description, icon: Icon, onSelect }: RoleCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50"
      onClick={() => onSelect(role)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
