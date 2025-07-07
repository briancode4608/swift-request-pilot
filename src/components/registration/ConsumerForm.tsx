
import { FormField } from '@/components/forms/FormField';
import { Textarea } from '@/components/ui/textarea';

interface ConsumerFormProps {
  formData: {
    deliveryAddress: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const ConsumerForm = ({ formData, onInputChange }: ConsumerFormProps) => {
  return (
    <FormField label="Delivery Address" required>
      <Textarea
        value={formData.deliveryAddress}
        onChange={(e) => onInputChange('deliveryAddress', e.target.value)}
        placeholder="Enter your preferred delivery address"
        required
      />
    </FormField>
  );
};
