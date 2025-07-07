
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';

interface TransporterFormProps {
  formData: {
    vehicleType: string;
    licenseNumber: string;
    experience: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const TransporterForm = ({ formData, onInputChange }: TransporterFormProps) => {
  return (
    <>
      <FormField label="Vehicle Type" required>
        <Input
          value={formData.vehicleType}
          onChange={(e) => onInputChange('vehicleType', e.target.value)}
          placeholder="e.g., Van, Truck, Motorcycle"
          required
        />
      </FormField>

      <FormField label="License Number" required>
        <Input
          value={formData.licenseNumber}
          onChange={(e) => onInputChange('licenseNumber', e.target.value)}
          placeholder="Enter your driving license number"
          required
        />
      </FormField>

      <FormField label="Experience" required>
        <Input
          value={formData.experience}
          onChange={(e) => onInputChange('experience', e.target.value)}
          placeholder="Years of driving/delivery experience"
          required
        />
      </FormField>
    </>
  );
};
