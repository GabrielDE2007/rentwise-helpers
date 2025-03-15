
import { useQuery } from "@tanstack/react-query";

// Types for housing data
export interface HousingListing {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  image: string;
  tags: string[];
  sqft?: number;
  description?: string;
  listedDate?: string;
  availableDate?: string;
}

// Fallback mock data with more properties in Newark, NJ
const MOCK_HOUSING_LISTINGS: HousingListing[] = [
  {
    id: "1",
    title: "Affordable 2BR in South Ward",
    address: "123 Clinton Ave, Newark, NJ",
    price: 1250,
    bedrooms: 2,
    bathrooms: 1,
    type: "Section 8 Accepted",
    image: "https://placehold.co/600x400/housing-primary/white?text=Housing+Image",
    tags: ["pet-friendly", "near-transit", "utilities-included"],
    sqft: 850,
    description: "Spacious 2-bedroom apartment in Newark's South Ward. Section 8 vouchers accepted. Includes heat and hot water.",
    listedDate: "2023-09-15",
    availableDate: "2023-10-01"
  },
  {
    id: "2",
    title: "Studio Apartment Downtown",
    address: "456 Market St, Newark, NJ",
    price: 950,
    bedrooms: 0,
    bathrooms: 1,
    type: "Low Income",
    image: "https://placehold.co/600x400/housing-secondary/white?text=Housing+Image",
    tags: ["near-transit", "utilities-included"],
    sqft: 500,
    description: "Cozy studio apartment in downtown Newark, walking distance to Penn Station and Prudential Center.",
    listedDate: "2023-09-10",
    availableDate: "2023-10-15"
  },
  {
    id: "3",
    title: "Family 3BR Apartment",
    address: "789 Bergen St, Newark, NJ",
    price: 1500,
    bedrooms: 3,
    bathrooms: 1.5,
    type: "Affordable Housing",
    image: "https://placehold.co/600x400/housing-primary/white?text=Housing+Image",
    tags: ["pet-friendly", "community-garden"],
    sqft: 1000,
    description: "Spacious 3-bedroom apartment perfect for families. Access to community garden and playground.",
    listedDate: "2023-09-05",
    availableDate: "2023-09-30"
  },
  {
    id: "4",
    title: "Senior Living 1BR",
    address: "101 Springfield Ave, Newark, NJ",
    price: 1100,
    bedrooms: 1,
    bathrooms: 1,
    type: "Senior Housing",
    image: "https://placehold.co/600x400/housing-secondary/white?text=Housing+Image",
    tags: ["utilities-included", "senior-friendly", "near-transit"],
    sqft: 650,
    description: "Senior-friendly one bedroom apartment with accessibility features and community activities.",
    listedDate: "2023-09-20",
    availableDate: "2023-10-15"
  },
  {
    id: "5",
    title: "Modern 2BR near University",
    address: "222 University Ave, Newark, NJ",
    price: 1400,
    bedrooms: 2,
    bathrooms: 1,
    type: "Student Housing",
    image: "https://placehold.co/600x400/housing-primary/white?text=Housing+Image",
    tags: ["near-campus", "utilities-included", "furnished"],
    sqft: 800,
    description: "Newly renovated 2-bedroom apartment near Rutgers Newark campus. Ideal for students and faculty.",
    listedDate: "2023-09-12",
    availableDate: "2023-10-01"
  },
  {
    id: "6",
    title: "Affordable 1BR in North Ward",
    address: "333 Summer Ave, Newark, NJ",
    price: 1000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Section 8 Accepted",
    image: "https://placehold.co/600x400/housing-secondary/white?text=Housing+Image",
    tags: ["pet-friendly", "near-transit"],
    sqft: 600,
    description: "Well-maintained one bedroom apartment in quiet neighborhood. Close to Branch Brook Park.",
    listedDate: "2023-09-18",
    availableDate: "2023-10-15"
  },
  {
    id: "7",
    title: "Iron Bound 3BR Townhouse",
    address: "555 Ferry St, Newark, NJ",
    price: 1800,
    bedrooms: 3,
    bathrooms: 2,
    type: "Affordable Housing",
    image: "https://placehold.co/600x400/housing-primary/white?text=Housing+Image",
    tags: ["central-air", "near-transit", "renovated"],
    sqft: 1200,
    description: "Beautiful townhouse in the heart of Ironbound district. Near restaurants, shops, and transportation.",
    listedDate: "2023-09-08",
    availableDate: "2023-10-01"
  },
  {
    id: "8",
    title: "Accessible 2BR Garden Apartment",
    address: "777 Weequahic Ave, Newark, NJ",
    price: 1350,
    bedrooms: 2,
    bathrooms: 1,
    type: "Accessible Housing",
    image: "https://placehold.co/600x400/housing-secondary/white?text=Housing+Image",
    tags: ["accessible", "pet-friendly", "utilities-included"],
    sqft: 900,
    description: "Ground floor, wheelchair accessible apartment with wide doorways and accessible bathroom.",
    listedDate: "2023-09-14",
    availableDate: "2023-10-15"
  },
  {
    id: "9",
    title: "Luxury 1BR Downtown Loft",
    address: "999 Edison Place, Newark, NJ",
    price: 1600,
    bedrooms: 1,
    bathrooms: 1,
    type: "Market Rate",
    image: "https://placehold.co/600x400/housing-primary/white?text=Housing+Image",
    tags: ["luxury", "hardwood-floors", "stainless-appliances"],
    sqft: 750,
    description: "Modern loft-style apartment with high ceilings, stainless steel appliances, and city views.",
    listedDate: "2023-09-16",
    availableDate: "2023-10-01"
  },
  {
    id: "10",
    title: "Affordable Studio in East Ward",
    address: "444 Lafayette St, Newark, NJ",
    price: 900,
    bedrooms: 0,
    bathrooms: 1,
    type: "Low Income",
    image: "https://placehold.co/600x400/housing-secondary/white?text=Housing+Image",
    tags: ["utilities-included", "near-transit"],
    sqft: 450,
    description: "Cozy studio apartment with all utilities included. Close to Newark Penn Station.",
    listedDate: "2023-09-19",
    availableDate: "2023-10-01"
  },
  {
    id: "11",
    title: "Family 4BR Home in West Ward",
    address: "888 South Orange Ave, Newark, NJ",
    price: 2000,
    bedrooms: 4,
    bathrooms: 2,
    type: "Section 8 Accepted",
    image: "https://placehold.co/600x400/housing-primary/white?text=Housing+Image",
    tags: ["pet-friendly", "backyard", "garage"],
    sqft: 1600,
    description: "Spacious single-family home with fenced backyard, garage, and finished basement.",
    listedDate: "2023-09-07",
    availableDate: "2023-10-15"
  },
  {
    id: "12",
    title: "Newly Renovated 2BR Condo",
    address: "666 McCarter Hwy, Newark, NJ",
    price: 1450,
    bedrooms: 2,
    bathrooms: 1.5,
    type: "First-Time Homebuyer",
    image: "https://placehold.co/600x400/housing-secondary/white?text=Housing+Image",
    tags: ["dishwasher", "laundry-in-unit", "balcony"],
    sqft: 950,
    description: "Modern condo with open floor plan, in-unit laundry, and private balcony. Near downtown.",
    listedDate: "2023-09-11",
    availableDate: "2023-10-01"
  }
];

/**
 * Fetches housing listings with optional filters
 */
export const fetchHousingListings = async (filters?: {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | null;
  amenities?: string[];
  housingTypes?: string[];
}): Promise<HousingListing[]> => {
  // In a real application, this would be an API call to a real estate service
  // For now, we'll use our expanded mock data
  
  console.log("Fetching housing listings with filters:", filters);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // In a real implementation, this would be:
    // const response = await fetch(`https://real-estate-api.com/listings?location=Newark,NJ&...`);
    // return await response.json();
    
    let listings = [...MOCK_HOUSING_LISTINGS];
    
    // Apply filters
    if (filters) {
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        listings = listings.filter(listing => 
          listing.title.toLowerCase().includes(term) || 
          listing.address.toLowerCase().includes(term) ||
          listing.description?.toLowerCase().includes(term)
        );
      }
      
      if (filters.minPrice !== undefined) {
        listings = listings.filter(listing => listing.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        listings = listings.filter(listing => listing.price <= filters.maxPrice!);
      }
      
      if (filters.bedrooms !== undefined && filters.bedrooms !== null) {
        listings = listings.filter(listing => listing.bedrooms === filters.bedrooms);
      }
      
      if (filters.amenities && filters.amenities.length > 0) {
        listings = listings.filter(listing => 
          filters.amenities!.some(amenity => listing.tags.includes(amenity))
        );
      }
      
      // Add housing type filter
      if (filters.housingTypes && filters.housingTypes.length > 0) {
        listings = listings.filter(listing => 
          filters.housingTypes!.includes(listing.type)
        );
      }
    }
    
    return listings;
  } catch (error) {
    console.error("Error fetching housing listings:", error);
    throw new Error("Failed to fetch housing listings. Please try again later.");
  }
};

/**
 * React Query hook for fetching housing listings
 */
export const useHousingListings = (filters?: {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | null;
  amenities?: string[];
  housingTypes?: string[];
}) => {
  return useQuery({
    queryKey: ['housingListings', filters],
    queryFn: () => fetchHousingListings(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
