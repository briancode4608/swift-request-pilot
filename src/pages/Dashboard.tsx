import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin-dashboard', { replace: true });
          break;
        case 'business':
          navigate('/business-dashboard', { replace: true });
          break;
        case 'consumer':
          navigate('/consumer-dashboard', { replace: true });
          break;
        case 'transporter':
          navigate('/transporter-dashboard', { replace: true });
          break;
        default:
          // Keep the original dashboard as fallback
          break;
      }
    }
  }, [user, navigate]);

  // This component now primarily serves as a redirect
  // The original dashboard content is preserved as fallback
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to your dashboard...</h1>
        <p className="text-muted-foreground">Please wait while we load your personalized dashboard.</p>
      </div>
    </div>
  );
};

export default Dashboard;
