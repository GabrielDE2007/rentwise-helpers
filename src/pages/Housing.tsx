
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Home, DollarSign, Filter, Bed, Bath, Users, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHousingListings, HousingListing } from "@/services/housingService";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const Housing: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  
  // Fetch housing listings with react-query
  const { data: listings, isLoading, isError, error } = useHousingListings({
    searchTerm,
    minPrice,
    maxPrice,
    bedrooms: selectedBedrooms,
    amenities: activeFilters
  });
  
  // Handle filter toggles
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  // Handle price filter changes
  const handlePriceFilterChange = () => {
    const min = minPrice || undefined;
    const max = maxPrice || undefined;
    
    // Validate price range
    if (min !== undefined && max !== undefined && min > max) {
      toast({
        title: "Invalid Price Range",
        description: "Minimum price cannot be greater than maximum price",
        variant: "destructive"
      });
      return;
    }
  };
  
  // Handle reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setActiveFilters([]);
    setSelectedBedrooms(null);
  };
  
  // Show error toast if there's an error
  React.useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load housing listings",
        variant: "destructive"
      });
    }
  }, [isError, error, toast]);
  
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
                    {id: "community-garden", label: "Community Garden"},
                    {id: "accessible", label: "Accessible"},
                    {id: "laundry-in-unit", label: "In-Unit Laundry"},
                    {id: "central-air", label: "Central Air"}
                  ]}
                  activeFilters={activeFilters}
                  onToggleFilter={toggleFilter}
                />
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Bedrooms</h4>
                  <div className="flex flex-wrap gap-2">
                    {[null, 0, 1, 2, 3, 4].map((num) => (
                      <button
                        key={num === null ? 'any' : num}
                        onClick={() => setSelectedBedrooms(num)}
                        className={cn(
                          "px-3 py-1 text-xs rounded-full transition-colors",
                          selectedBedrooms === num
                            ? "bg-housing-primary text-white"
                            : "bg-housing-muted text-housing-dark hover:bg-housing-light"
                        )}
                      >
                        {num === null ? 'Any' : num === 0 ? 'Studio' : `${num} BR`}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <Input 
                      placeholder="Min" 
                      type="number" 
                      className="w-full" 
                      value={minPrice || ''}
                      onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <span>-</span>
                    <Input 
                      placeholder="Max" 
                      type="number" 
                      className="w-full" 
                      value={maxPrice || ''}
                      onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={handlePriceFilterChange}
                  >
                    Apply Price
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
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
                {isLoading ? 'Loading properties...' : `${listings?.length || 0} properties found`}
              </p>
              
              <div className="flex gap-2">
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 text-housing-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Loading housing listings...</p>
              </div>
            ) : isError ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Failed to load listings</h3>
                  <p className="text-muted-foreground mb-4">
                    {error instanceof Error ? error.message : "An unexpected error occurred."}
                  </p>
                  <Button onClick={() => window.location.reload()}>Try Again</Button>
                </CardContent>
              </Card>
            ) : listings && listings.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {listings.map(listing => (
                  <HousingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No housing listings found matching your criteria.</p>
                <Button variant="outline" onClick={resetFilters} className="mt-4">
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
  listing: HousingListing;
}

const HousingCard: React.FC<HousingCardProps> = ({ listing }) => {
  const tagLabels: Record<string, string> = {
    "pet-friendly": "Pet Friendly",
    "near-transit": "Near Transit",
    "utilities-included": "Utilities Included",
    "community-garden": "Community Garden",
    "senior-friendly": "Senior Friendly",
    "accessible": "Accessible",
    "laundry-in-unit": "In-Unit Laundry",
    "central-air": "Central Air",
    "backyard": "Backyard",
    "dishwasher": "Dishwasher",
    "balcony": "Balcony",
    "hardwood-floors": "Hardwood Floors",
    "stainless-appliances": "Stainless Appliances",
    "furnished": "Furnished",
    "near-campus": "Near Campus",
    "luxury": "Luxury",
    "garage": "Garage",
    "renovated": "Renovated"
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
          {listing.sqft && (
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>{listing.sqft} sqft</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="bg-housing-accent text-xs">
              {tagLabels[tag] || tag}
            </Badge>
          ))}
          {listing.tags.length > 3 && (
            <Badge variant="outline" className="bg-muted text-xs">
              +{listing.tags.length - 3} more
            </Badge>
          )}
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
