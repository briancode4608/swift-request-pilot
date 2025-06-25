
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    
    switch (user.role) {
      case 'admin': return '/admin-dashboard';
      case 'business': return '/business-dashboard';
      case 'consumer': return '/consumer-dashboard';
      case 'transporter': return '/transporter-dashboard';
      default: return '/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center rounded-full bg-primary w-8 h-8">
              <span className="text-primary-foreground font-bold">DD</span>
            </div>
            <span className="hidden sm:inline-block font-bold text-xl">Delivery Drive</span>
          </Link>
        </div>
        
        {isAuthenticated && (
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link 
              to="/transport" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Transport
            </Link>
            <Link 
              to="/delivery" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Delivery
            </Link>
            <Link 
              to={getDashboardLink()} 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()}>
                    {user?.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/business-dashboard">Business Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/consumer-dashboard">Consumer Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/transporter-dashboard">Transporter Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/login">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
