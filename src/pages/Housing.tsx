
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Home, DollarSign, Filter, Bed, Bath, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for housing listings
const HOUSING_LISTINGS = [
  {
    id: 1,
    title: "Affordable 2BR in South Ward",
    address: "123 Clinton Ave, Newark, NJ",
    price: 1250,
    bedrooms: 2,
    bathrooms: 1,
    type: "Section 8 Accepted",
    image: "https://placehold.co/600x400/housing-primary/white?text=Housing+Image",
    tags: ["pet-friendly", "near-transit", "utilities-included"]
  },
  {
    id: 2,
    title: "Studio Apartment Downtown",
    address: "456 Market St, Newark, NJ",
    price: 950,
    bedrooms: 0,
    bathrooms: 1,
    type: "Low Income",
    image: "https://placehold.co/600x400/housing-secondary/white?text=Housing+Image",
    tags: ["near-transit", "utilities-included"]
  },
  {
    id: 3,
    title: "Family 3BR Apartment",
    address: "789 Bergen St, Newark, NJ",
    price: 1500,
    bedrooms: 3,
    bathrooms: 1.5,
    type: "Affordable Housing",
    image: "https://placehold.co/600x400/housing-primary/white?text=Housing+Image",
    tags: ["pet-friendly", "community-garden"]
  },
  {
    id: 4,
    title: "Senior Living 1BR",
    address: "101 Springfield Ave, Newark, NJ",
    price: 1100,
    bedrooms: 1,
    bathrooms: 1,
    type: "Senior Housing",
    image: "https://placehold.co/600x400/housing-secondary/white?text=Housing+Image",
    tags: ["utilities-included", "senior-friendly", "near-transit"]
  },
];

const Housing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  // Filter listings based on search term and active filters
  const filteredListings = HOUSING_LISTINGS.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         listing.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilters.length === 0) return matchesSearch;
    
    const hasMatchingTags = activeFilters.some(filter => listing.tags.includes(filter));
    
    return matchesSearch && hasMatchingTags;
  });
  
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="main-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Find Affordable Housing</h1>
          <p className="text-muted-foreground">
            Search for affordable housing options, Section 8 apartments, 
            and rental assistance programs in Newark.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" />
            <Input 
              placeholder="Search by location, neighborhood or features..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button>
            Find Housing <MapPin className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-lg shadow-elevation-1">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" /> Filters
              </h3>
              
              <div className="space-y-4">
                <FilterSection 
                  title="Housing Type" 
                  options={[
                    {id: "section-8", label: "Section 8"},
                    {id: "affordable", label: "Affordable Housing"},
                    {id: "senior", label: "Senior Housing"},
                    {id: "low-income", label: "Low Income"}
                  ]}
                />
                
                <Separator />
                
                <FilterSection 
                  title="Amenities" 
                  options={[
                    {id: "pet-friendly", label: "Pet Friendly"},
                    {id: "utilities-included", label: "Utilities Included"},
                    {id: "near-transit", label: "Near Public Transit"},
                    {id: "community-garden", label: "Community Garden"}
                  ]}
                  activeFilters={activeFilters}
                  onToggleFilter={toggleFilter}
                />
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Min" type="number" className="w-full" />
                    <span>-</span>
                    <Input placeholder="Max" type="number" className="w-full" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button variant="outline" size="sm" className="w-full">Reset</Button>
                <Button size="sm" className="w-full">Apply</Button>
              </div>
            </div>
            
            <div className="bg-housing-accent p-5 rounded-lg border border-housing-light">
              <h3 className="font-semibold text-housing-primary mb-3">Housing Assistance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Need help determining if you're eligible for housing assistance programs?
              </p>
              <Button variant="outline" className="w-full border-housing-primary text-housing-primary hover:bg-housing-primary hover:text-white">
                Check Eligibility
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">
                {filteredListings.length} properties found
              </p>
              
              <div className="flex gap-2">
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredListings.map(listing => (
                <HousingCard key={listing.id} listing={listing} />
              ))}
            </div>
            
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No housing listings found matching your criteria.</p>
                <Button variant="outline" onClick={() => {setSearchTerm(""); setActiveFilters([])}} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  options: {id: string; label: string}[];
  activeFilters?: string[];
  onToggleFilter?: (filter: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  options,
  activeFilters = [],
  onToggleFilter = () => {}
}) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map(option => (
          <div key={option.id} className="flex items-center">
            <input 
              type="checkbox" 
              id={option.id} 
              className="mr-2"
              checked={activeFilters.includes(option.id)}
              onChange={() => onToggleFilter(option.id)} 
            />
            <label htmlFor={option.id} className="text-sm cursor-pointer">{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

interface HousingCardProps {
  listing: {
    id: number;
    title: string;
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    type: string;
    image: string;
    tags: string[];
  };
}

const HousingCard: React.FC<HousingCardProps> = ({ listing }) => {
  const tagLabels: Record<string, string> = {
    "pet-friendly": "Pet Friendly",
    "near-transit": "Near Transit",
    "utilities-included": "Utilities Included",
    "community-garden": "Community Garden",
    "senior-friendly": "Senior Friendly"
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-shadow border border-border">
      <div className="aspect-video relative bg-muted">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-housing-primary">{listing.type}</Badge>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">{listing.title}</h3>
          <span className="text-housing-primary font-bold">${listing.price}/mo</span>
        </div>
        
        <p className="text-muted-foreground text-sm flex items-center mb-4">
          <MapPin className="h-3 w-3 mr-1" /> {listing.address}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span>{listing.bedrooms} {listing.bedrooms === 1 ? "Bed" : "Beds"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span>{listing.bathrooms} {listing.bathrooms === 1 ? "Bath" : "Baths"}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-housing-accent text-xs">
              {tagLabels[tag] || tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">Contact</Button>
          <Button className="flex-1 bg-housing-primary hover:bg-housing-primary/90">View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default Housing;
