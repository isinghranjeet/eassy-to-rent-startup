import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PGCard } from '@/components/pg/PGCard';
import { PGFilters } from '@/components/pg/PGFilters';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { toast } from 'sonner';
import { Loader2, AlertCircle, Search, Filter, Grid, List } from 'lucide-react';

const API_URL = 'https://eassy-to-rent-backend.onrender.com/api';

interface PGListing {
  _id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  price: number;
  type: 'boys' | 'girls' | 'co-ed' | 'family';
  images: string[];
  amenities: string[];
  verified: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  ownerName?: string;
  ownerPhone?: string;
  createdAt: string;
  slug?: string;
  distance?: string;
  published?: boolean;
  locality?: string;
  location?: string;
}

const PGList = () => {
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating' | 'newest'>('newest');
  
  const [listings, setListings] = useState<PGListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    if (searchParams.get('q')) setSearchQuery(searchParams.get('q') || '');
    if (searchParams.get('location')) setSelectedLocation(searchParams.get('location') || 'all');
    if (searchParams.get('type')) setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/pg`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'API request failed');
      }
      
      const listingsData = result.data || [];
      const listingsArray = Array.isArray(listingsData) ? listingsData : [];
      
      const transformedListings: PGListing[] = listingsArray.map((listing: any, index: number) => ({
        _id: listing._id || listing.id || `db-${Date.now()}-${index}`,
        name: listing.name || 'Premium PG',
        description: listing.description || 'Comfortable accommodation with amenities',
        city: listing.city || 'City',
        address: listing.address || 'Address',
        price: listing.price || 0,
        type: (listing.type as 'boys' | 'girls' | 'co-ed' | 'family') || 'boys',
        images: Array.isArray(listing.images) && listing.images.length > 0 
          ? listing.images 
          : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80'],
        amenities: Array.isArray(listing.amenities) ? listing.amenities : ['WiFi', 'Power Backup'],
        verified: Boolean(listing.verified),
        featured: Boolean(listing.featured),
        rating: listing.rating || 4.0,
        reviewCount: listing.reviewCount || 0,
        ownerName: listing.ownerName || 'Owner',
        ownerPhone: listing.ownerPhone || '9315058665',
        createdAt: listing.createdAt || new Date().toISOString(),
        slug: listing.slug || listing._id,
        distance: listing.distance || 'Nearby',
        locality: listing.locality || 'Area',
        location: listing.city || 'City',
        published: listing.published !== false
      }));
      
      setListings(transformedListings);
      
    } catch (err: any) {
      setError(err.message || 'Failed to load listings');
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    const demoPGs: PGListing[] = [
      {
        _id: 'demo-1',
        name: 'Sunshine PG',
        description: 'Premium accommodation with all amenities',
        city: 'Chandigarh',
        address: 'Gate 1, CU Road',
        price: 8500,
        type: 'boys',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80'],
        amenities: ['WiFi', 'AC', 'Meals', 'Parking'],
        verified: true,
        featured: true,
        rating: 4.5,
        reviewCount: 42,
        ownerName: 'Rajesh Kumar',
        ownerPhone: '9876543210',
        createdAt: new Date().toISOString(),
        distance: '500m from CU',
        locality: 'Gate 1',
        published: true
      }
    ];
    
    setListings(demoPGs);
  };

  const filteredPGs = useMemo(() => {
    let filtered = listings.filter((pg) => {
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const matchesSearch = 
          (pg.name?.toLowerCase() || '').includes(searchLower) ||
          (pg.address?.toLowerCase() || '').includes(searchLower) ||
          (pg.city?.toLowerCase() || '').includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      if (selectedLocation !== 'all') {
        const pgLocation = pg.location || pg.city || '';
        if (pgLocation.toLowerCase() !== selectedLocation.toLowerCase()) {
          return false;
        }
      }

      if (selectedType !== 'all' && pg.type !== selectedType) {
        return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });

    return filtered;
  }, [listings, debouncedSearch, selectedLocation, selectedType, sortBy]);

  const locations = useMemo(() => {
    const uniqueLocations = new Set<string>();
    listings.forEach(pg => {
      const location = pg.location || pg.city;
      if (location) uniqueLocations.add(location);
    });
    return ['all', ...Array.from(uniqueLocations)];
  }, [listings]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedType('all');
    setSelectedPriceRange(0);
    setSelectedAmenities([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-24">
            <Loader2 className="h-12 w-12 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading accommodations...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find PG Accommodations</h1>
          <p className="text-gray-600 mb-6">
            Browse {listings.length} verified accommodations
          </p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location or PG name..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-gray-600">
              Showing {filteredPGs.length} of {listings.length} results
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg text-sm ${selectedType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('boys')}
              className={`px-4 py-2 rounded-lg text-sm ${selectedType === 'boys' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Boys PG
            </button>
            <button
              onClick={() => setSelectedType('girls')}
              className={`px-4 py-2 rounded-lg text-sm ${selectedType === 'girls' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Girls PG
            </button>
            <button
              onClick={() => setSelectedType('co-ed')}
              className={`px-4 py-2 rounded-lg text-sm ${selectedType === 'co-ed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Co-ed PG
            </button>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All Locations</option>
              {locations.filter(loc => loc !== 'all').map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        {filteredPGs.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredPGs.map((pg, index) => (
              <PGCard key={pg._id} pg={pg} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No accommodations found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PGList;