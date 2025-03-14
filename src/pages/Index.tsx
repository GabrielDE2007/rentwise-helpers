
import React from 'react';
import Hero from '@/components/Hero';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Info, ArrowRight, MapPin, Users, AlertTriangle, Shield } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <section className="py-16 bg-background">
        <div className="main-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">How RentWise Helps You</h2>
            <p className="text-muted-foreground">Our platform connects you with the resources you need to find affordable housing, understand your rights, and improve your living conditions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Search Housing Options"
              description="Browse affordable housing listings filtered by your needs and budget."
              icon={<MapPin className="text-housing-primary" />}
              color="housing"
            />
            <StepCard
              number={2}
              title="Know Your Rights"
              description="Learn about tenant protections and connect with legal resources."
              icon={<Shield className="text-rights-primary" />}
              color="rights"
            />
            <StepCard
              number={3}
              title="Report & Resolve Issues"
              description="Document unsafe conditions and get help from housing authorities."
              icon={<AlertTriangle className="text-report-primary" />}
              color="report"
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-accent/30">
        <div className="main-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">Newark Housing Crisis</h2>
              <p className="text-muted-foreground mb-6">Rising rents and gentrification are pushing out long-time residents, while many apartments remain in unsafe conditions.</p>
              
              <div className="space-y-6">
                <StatisticCard
                  label="Rent increase since 2019"
                  value={35}
                  color="housing"
                />
                <StatisticCard
                  label="Residents spending >50% income on rent"
                  value={42}
                  color="rights"
                />
                <StatisticCard
                  label="Reported unsafe housing conditions"
                  value={68}
                  color="report"
                />
              </div>
              
              <div className="mt-8">
                <Button onClick={() => window.open('/resources', '_self')}>
                  Find Emergency Resources <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-elevation-1">
              <Alert className="mb-6 border-rights-primary/30 bg-rights-accent">
                <Info className="text-rights-primary" />
                <AlertTitle>Important Update</AlertTitle>
                <AlertDescription>
                  Newark has extended the eviction moratorium for qualified residents through December 2023.
                </AlertDescription>
              </Alert>
              
              <h3 className="font-semibold text-xl mb-4">Latest Community News</h3>
              
              <div className="space-y-4">
                <NewsItem
                  title="New Affordable Housing Units Opening in Downtown"
                  date="October 12, 2023"
                  category="housing"
                />
                <NewsItem
                  title="Free Legal Aid Workshop This Saturday"
                  date="October 10, 2023"
                  category="rights"
                />
                <NewsItem
                  title="City Council Votes on Rent Control Measures"
                  date="October 5, 2023"
                  category="resources"
                />
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Join our community</span>
                <Button variant="outline" size="sm" onClick={() => window.open('/community', '_self')}>
                  <Users className="mr-2 h-4 w-4" />
                  Connect with Tenants
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'housing' | 'rights' | 'report' | 'resources';
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, icon, color }) => {
  const colorClasses = {
    housing: "bg-housing-accent border-housing-light",
    rights: "bg-rights-accent border-rights-light",
    report: "bg-report-accent border-report-light",
    resources: "bg-resources-accent border-resources-light",
  };
  
  return (
    <div className={`rounded-xl p-6 border shadow-elevation-1 ${colorClasses[color]}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-lg font-semibold shadow-sm">
          {number}
        </div>
        <div className="p-2 rounded-lg bg-white shadow-sm">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface StatisticCardProps {
  label: string;
  value: number;
  color: 'housing' | 'rights' | 'report' | 'resources';
}

const StatisticCard: React.FC<StatisticCardProps> = ({ label, value, color }) => {
  const colorClasses = {
    housing: "text-housing-primary",
    rights: "text-rights-primary",
    report: "text-report-primary",
    resources: "text-resources-primary"
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-elevation-1">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={`text-xl font-bold ${colorClasses[color]}`}>{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

interface NewsItemProps {
  title: string;
  date: string;
  category: 'housing' | 'rights' | 'report' | 'resources';
}

const NewsItem: React.FC<NewsItemProps> = ({ title, date, category }) => {
  const colorClasses = {
    housing: "text-housing-primary",
    rights: "text-rights-primary",
    report: "text-report-primary",
    resources: "text-resources-primary"
  };
  
  return (
    <div className="border-l-2 border-l-primary/30 pl-4">
      <h4 className="font-medium hover:text-primary cursor-pointer transition-colors">{title}</h4>
      <div className="flex items-center text-xs text-muted-foreground">
        <span>{date}</span>
        <div className="w-1 h-1 rounded-full bg-muted-foreground mx-2" />
        <span className={colorClasses[category]}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default Index;
