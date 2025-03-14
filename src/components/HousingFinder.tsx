
import React, { useState } from 'react';
import { Search, Home, MapPin, DollarSign, Filter } from 'lucide-react';
import { useTransitionEffect } from '@/hooks/useTransitionEffect';
import { cn } from '@/lib/utils';

// Placeholder data for housing listings
const housingListings = [
  {
    id: 1,
    title: "Affordable 2BR Apartment",
    address: "123 Main St, Newark, NJ",
    price: 1200,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    type: "apartment",
    programs: ["Section 8", "Low Income"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    availableNow: true,
  },
  {
    id: 2,
    title: "Studio in Downtown",
    address: "456 Elm St, Newark, NJ",
    price: 950,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 500,
    type: "studio",
    programs: ["Low Income"],
    image: "https://images.unsplash.com/photo-1581404635299-45c6b97071a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    availableNow: false,
  },
  {
    id: 3,
    title: "Family 3BR Townhouse",
    address: "789 Oak St, Newark, NJ",
    price: 1600,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    type: "townhouse",
    programs: ["Section 8", "First-time Buyer"],
    image: "https://images.unsplash.com/photo-1568443759773-842f1abe9548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    availableNow: true,
  },
  {
    id: 4,
    title: "Senior Living 1BR",
    address: "101 Pine St, Newark, NJ",
    price: 900,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    type: "apartment",
    programs: ["Senior Housing", "Low Income"],
    image: "https://images.unsplash.com/photo-1603793507613-d52ea9b3767a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    availableNow: true,
  },
];

const HousingFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);
  const [programFilter, setProgramFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const isVisible = useTransitionEffect();

  // All available programs across all listings
  const allPrograms = Array.from(
    new Set(
      housingListings.flatMap(listing => listing.programs)
    )
  );

  // Filter listings based on search term and filters
  const filteredListings = housingListings.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriceRange = 
      listing.price >= priceRange[0] && listing.price <= priceRange[1];
    
    const matchesBedroom = 
      bedroomFilter === null || listing.bedrooms === bedroomFilter;
    
    const matchesProgram = 
      programFilter === null || listing.programs.includes(programFilter);
    
    return matchesSearch && matchesPriceRange && matchesBedroom && matchesProgram;
  });

  return (
    <div className={cn(
      "transition-all duration-500",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="bg-housing-accent py-8 border-b border-border">
        <div className="main-container">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search by location, neighborhood, or housing type..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-housing-primary/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="absolute right-2 top-2 p-1.5 rounded-md bg-housing-muted text-housing-dark hover:bg-housing-light transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
              </button>
            </div>

            {/* Filters Section */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-border shadow-sm animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price Range</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">${priceRange[0]}</span>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-housing-muted rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-muted-foreground">${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Bedrooms</label>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setBedroomFilter(null)}
                        className={cn(
                          "px-3 py-1 text-xs rounded-full transition-colors",
                          bedroomFilter === null
                            ? "bg-housing-primary text-white"
                            : "bg-housing-muted text-housing-dark hover:bg-housing-light"
                        )}
                      >
                        Any
                      </button>
                      {[0, 1, 2, 3].map((num) => (
                        <button
                          key={num}
                          onClick={() => setBedroomFilter(num)}
                          className={cn(
                            "px-3 py-1 text-xs rounded-full transition-colors",
                            bedroomFilter === num
                              ? "bg-housing-primary text-white"
                              : "bg-housing-muted text-housing-dark hover:bg-housing-light"
                          )}
                        >
                          {num === 0 ? "Studio" : `${num} BR`}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Programs</label>
                    <select
                      value={programFilter || ""}
                      onChange={(e) => setProgramFilter(e.target.value || null)}
                      className="w-full px-3 py-2 text-sm bg-housing-muted border border-border rounded-md"
                    >
                      <option value="">Any Program</option>
                      {allPrograms.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="main-container py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Available Housing
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredListings.length} properties found
          </span>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-20">
            <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <HousingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
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
    sqft: number;
    type: string;
    programs: string[];
    image: string;
    availableNow: boolean;
  };
}

const HousingCard: React.FC<HousingCardProps> = ({ listing }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="glass-card group">
      {/* Image with lazy loading and blur effect */}
      <div 
        className={cn(
          "blur-load relative h-48 rounded-lg overflow-hidden mb-4",
          imageLoaded ? "loaded" : ""
        )}
        style={{ backgroundImage: `url(${listing.image}?blur=20&w=50)` }}
      >
        <img
          src={listing.image}
          alt={listing.title}
          onLoad={() => setImageLoaded(true)}
          className="rounded-lg object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {listing.availableNow && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-housing-primary text-white text-xs font-medium rounded-full">
            Available Now
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{listing.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{listing.address}</span>
            </div>
          </div>
          <div className="flex items-center text-housing-primary font-medium">
            <DollarSign size={16} className="mr-0.5" />
            <span>{listing.price}</span>
          </div>
        </div>

        <div className="flex justify-between text-sm border-t border-border pt-3">
          <div className="flex space-x-4">
            <span>{listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} BR`}</span>
            <span>{listing.bathrooms} BA</span>
            <span>{listing.sqft} sqft</span>
          </div>
          <span className="capitalize">{listing.type}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {listing.programs.map((program) => (
            <span 
              key={program} 
              className="badge badge-primary"
            >
              {program}
            </span>
          ))}
        </div>
        
        <button className="w-full mt-2 py-2 bg-housing-primary text-white rounded-lg transition-colors hover:bg-housing-dark">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HousingFinder;
