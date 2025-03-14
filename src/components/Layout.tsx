
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import { Toaster } from '@/components/ui/toaster';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationMenu />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-border py-8">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">RentWise</h3>
              <p className="text-muted-foreground max-w-md">
                Empowering tenants with the tools and knowledge they need to
                find affordable housing, understand their rights, and improve
                their living conditions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    Housing Assistance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    Legal Aid Organizations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    Tenant Unions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    Emergency Services
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-sm text-muted-foreground">
            <p>© 2023 RentWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
