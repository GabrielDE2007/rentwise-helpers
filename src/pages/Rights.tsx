
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  LifeBuoy, 
  ChevronRight, 
  Check,
  Info
} from "lucide-react";

const Rights: React.FC = () => {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="main-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Know Your Tenant Rights</h1>
          <p className="text-muted-foreground">
            Learn about your legal protections as a tenant and how to assert your rights in Newark.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-elevation-1 overflow-hidden">
              <div className="bg-rights-primary p-4">
                <h3 className="text-white font-semibold text-lg">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = "#eviction"}>
                  <AlertTriangle className="mr-2 h-4 w-4 text-report-primary" />
                  Fighting Eviction
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = "#repairs"}>
                  <FileText className="mr-2 h-4 w-4 text-rights-primary" />
                  Requesting Repairs
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = "#deposit"}>
                  <Shield className="mr-2 h-4 w-4 text-rights-primary" />
                  Security Deposits
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => window.location.href = "#discrimination"}>
                  <AlertTriangle className="mr-2 h-4 w-4 text-report-primary" />
                  Housing Discrimination
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-rights-accent rounded-lg border border-rights-light p-5">
              <h3 className="font-semibold text-rights-primary mb-3">Need Legal Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with free or low-cost legal aid services in Newark to help with housing issues.
              </p>
              <Button className="w-full bg-rights-primary hover:bg-rights-primary/90">
                <LifeBuoy className="mr-2 h-4 w-4" />
                Find Legal Aid
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <Alert className="bg-rights-accent border-rights-light">
              <Info className="h-4 w-4 text-rights-primary" />
              <AlertTitle>Important Update</AlertTitle>
              <AlertDescription>
                Newark has extended the eviction moratorium for qualified residents through December 2023.
                <a href="#" className="text-rights-primary font-medium block mt-2">Learn if you qualify →</a>
              </AlertDescription>
            </Alert>
            
            <section id="eviction" className="bg-white rounded-lg shadow-elevation-1 p-6">
              <h2 className="text-2xl font-semibold mb-4">Eviction Protection</h2>
              <p className="text-muted-foreground mb-4">
                In Newark, landlords must follow strict legal procedures to evict a tenant. An eviction notice 
                alone is not enough - your landlord must win an eviction lawsuit in court.
              </p>
              
              <h3 className="font-medium text-lg mt-6 mb-3">Your Rights During Eviction</h3>
              <ul className="space-y-2">
                <RightItem text="You must be given proper written notice before eviction proceedings begin" />
                <RightItem text="You have the right to appear in court and present a defense" />
                <RightItem text="Only a court officer can remove you from your home, not your landlord" />
                <RightItem text="Your landlord cannot change locks, remove your belongings, or shut off utilities" />
              </ul>
              
              <Separator className="my-6" />
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">If You Receive an Eviction Notice</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Do not ignore it - respond promptly</li>
                  <li>Seek legal aid immediately</li>
                  <li>Attend all court hearings</li>
                  <li>Bring documentation of rent payments and correspondence with your landlord</li>
                </ol>
              </div>
            </section>
            
            <section id="repairs" className="bg-white rounded-lg shadow-elevation-1 p-6">
              <h2 className="text-2xl font-semibold mb-4">Right to Habitable Housing</h2>
              <p className="text-muted-foreground mb-4">
                Your landlord is required by law to maintain your apartment in livable condition, including working 
                plumbing, heating, electricity, and addressing pest infestations.
              </p>
              
              <h3 className="font-medium text-lg mt-6 mb-3">Requesting Repairs</h3>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <span className="font-medium">Document the issues</span>
                  <p className="text-sm text-muted-foreground">Take photos, videos, and notes about the problems</p>
                </li>
                <li>
                  <span className="font-medium">Send a written repair request</span>
                  <p className="text-sm text-muted-foreground">Always communicate in writing and keep copies</p>
                </li>
                <li>
                  <span className="font-medium">Follow up if no action is taken</span>
                  <p className="text-sm text-muted-foreground">Send a second notice with a specific deadline</p>
                </li>
                <li>
                  <span className="font-medium">Report to housing authorities</span>
                  <p className="text-sm text-muted-foreground">If repairs aren't made, file a complaint with Newark's Department of Inspections</p>
                </li>
              </ol>
              
              <Button className="mt-6">
                Generate Repair Request Letter
              </Button>
            </section>
            
            {/* Additional rights sections would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

interface RightItemProps {
  text: string;
}

const RightItem: React.FC<RightItemProps> = ({ text }) => {
  return (
    <li className="flex items-start">
      <Check className="h-5 w-5 text-rights-primary mr-2 mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
};

export default Rights;
