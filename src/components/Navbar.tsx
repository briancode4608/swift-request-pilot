
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
            to="/dashboard" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">Log In</Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
