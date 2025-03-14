
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, AlertTriangle, Compass, Menu, X, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const NavigationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Handle navigation menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Find Housing', path: '/housing', icon: <Home size={18} /> },
    { name: 'Tenant Rights', path: '/rights', icon: <BookOpen size={18} /> },
    { name: 'Report Issues', path: '/report', icon: <AlertTriangle size={18} /> },
    { name: 'Resources', path: '/resources', icon: <Compass size={18} /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="main-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 font-display font-bold text-xl"
            >
              <span className="text-primary">Rent</span>
              <span>Wise</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link",
                  isActive(link.path) && "nav-link-active"
                )}
              >
                <div className="flex items-center space-x-2">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                <span className="nav-link-indicator" />
              </Link>
            ))}
          </nav>

          {/* Authentication Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  {currentUser.displayName || currentUser.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                >
                  <LogOut size={16} /> 
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="bg-white border-b border-border">
            <nav className="main-container py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(link.path)
                      ? "bg-accent text-primary font-medium"
                      : "hover:bg-accent"
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {/* Authentication Buttons - Mobile */}
              <div className="border-t border-border pt-2 mt-2">
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                      Signed in as {currentUser.displayName || currentUser.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      <LogOut size={18} />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <User size={18} />
                      <span>Log in</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors mt-2"
                    >
                      <User size={18} />
                      <span>Sign up</span>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationMenu;
