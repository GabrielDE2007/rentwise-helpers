
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Home, HelpCircle, AlertTriangle } from 'lucide-react';
import useTransitionEffect from '@/hooks/useTransitionEffect';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const isVisible = useTransitionEffect();

  return (
    <section className="relative bg-gradient-to-br from-background to-accent/30 overflow-hidden py-20 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-64 -top-64 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-64 top-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-32 bottom-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="main-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "space-y-6 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="inline-block">
              <span className="category-pill bg-primary/10 text-primary">
                Empowering Tenants
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Guide to <span className="text-primary">Affordable Housing</span> &
              <span className="text-primary"> Tenant Rights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Connect with resources to find affordable housing, understand your rights as a tenant,
              report unsafe conditions, and access community support services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/housing')}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-3 font-medium transition-all shadow-elevation-1 hover:shadow-elevation-2"
              >
                Find Housing
              </button>
              <button
                onClick={() => navigate('/rights')}
                className="bg-white hover:bg-accent border border-border rounded-lg px-6 py-3 font-medium transition-all shadow-elevation-1 hover:shadow-elevation-2"
              >
                Know Your Rights
              </button>
            </div>
          </div>

          <div
            className={cn(
              "glass-panel rounded-2xl relative overflow-hidden transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-housing-primary/10 to-primary/5" />
            <div className="relative p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FeatureCard 
                  icon={<Home className="text-housing-primary" />}
                  title="Find Affordable Housing"
                  description="Search for affordable apartments, rental assistance programs, and more."
                  onClick={() => navigate('/housing')}
                  color="housing"
                />
                <FeatureCard 
                  icon={<Shield className="text-rights-primary" />}
                  title="Know Your Rights"
                  description="Learn about your legal protections and eviction defense resources."
                  onClick={() => navigate('/rights')}
                  color="rights"
                />
                <FeatureCard 
                  icon={<AlertTriangle className="text-report-primary" />}
                  title="Report Issues"
                  description="Report unsafe living conditions and connect with housing authorities."
                  onClick={() => navigate('/report')}
                  color="report"
                />
                <FeatureCard 
                  icon={<HelpCircle className="text-resources-primary" />}
                  title="Access Resources"
                  description="Find emergency services, legal aid, and community support."
                  onClick={() => navigate('/resources')}
                  color="resources"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color: 'housing' | 'rights' | 'report' | 'resources';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  onClick,
  color
}) => {
  const colorClasses = {
    housing: "hover:bg-housing-accent hover:border-housing-light",
    rights: "hover:bg-rights-accent hover:border-rights-light",
    report: "hover:bg-report-accent hover:border-report-light",
    resources: "hover:bg-resources-accent hover:border-resources-light",
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-white/30 shadow-elevation-1 hover:shadow-elevation-2 cursor-pointer transition-all duration-300 hover:-translate-y-1",
        colorClasses[color]
      )}
    >
      <div className="flex flex-col space-y-2">
        <div className="p-2 w-fit rounded-lg bg-white shadow-sm">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Hero;
