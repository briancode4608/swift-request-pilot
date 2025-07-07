
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BusinessFormProps {
  formData: {
    companyName: string;
    businessType: string;
    coreProduct: string;
    address: string;
    phone: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const BusinessForm = ({ formData, onInputChange }: BusinessFormProps) => {
  return (
    <>
      <FormField label="Company Name" required>
        <Input
          value={formData.companyName}
          onChange={(e) => onInputChange('companyName', e.target.value)}
          placeholder="Enter your company name"
          required
        />
      </FormField>

      <FormField label="Business Type" required>
        <Input
          value={formData.businessType}
          onChange={(e) => onInputChange('businessType', e.target.value)}
          placeholder="e.g., Retail, Restaurant, E-commerce"
          required
        />
      </FormField>

      <FormField label="Core/Niche Product" required>
        <Input
          value={formData.coreProduct}
          onChange={(e) => onInputChange('coreProduct', e.target.value)}
          placeholder="What is your main product or service?"
          required
        />
      </FormField>

      <FormField label="Business Address" required>
        <Textarea
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Enter your business address"
          required
        />
      </FormField>

      <FormField label="Phone Number" required>
        <Input
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          placeholder="Enter your phone number"
          required
        />
      </FormField>
    </>
  );
};
