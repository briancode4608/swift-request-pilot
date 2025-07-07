
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/contexts/AuthContext';
import { RoleSelection } from '@/components/registration/RoleSelection';
import { RegistrationForm } from '@/components/registration/RegistrationForm';

const Register = () => {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('details');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBackToRoleSelection = () => {
    setStep('role');
  };

  if (step === 'role') {
    return (
      <RoleSelection 
        onRoleSelect={handleRoleSelect}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <RegistrationForm 
      selectedRole={selectedRole as UserRole}
      onBack={handleBackToRoleSelection}
    />
  );
};

export default Register;
