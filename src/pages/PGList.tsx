import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PGCard } from '@/components/pg/PGCard';
import { PGFilters } from '@/components/pg/PGFilters';
import { pgListings, priceRanges } from '@/lib/data/pgData';
import { useDebounce } from '@/lib/hooks/useDebounce';

const PGList = () => {
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All Locations');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (searchParams.get('q')) setSearchQuery(searchParams.get('q') || '');
    if (searchParams.get('location')) setSelectedLocation(searchParams.get('location') || 'All Locations');
    if (searchParams.get('type')) setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams]);

  const filteredPGs = useMemo(() => {
    return pgListings.filter((pg) => {
      // Search filter
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        if (
          !pg.name.toLowerCase().includes(searchLower) &&
          !pg.location.toLowerCase().includes(searchLower) &&
          !pg.address.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Location filter
      if (selectedLocation !== 'All Locations' && pg.location !== selectedLocation) {
        return false;
      }

      // Type filter
      if (selectedType !== 'all' && pg.type !== selectedType) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== 0) {
        const range = priceRanges[selectedPriceRange];
        if (pg.price < range.min || pg.price >= range.max) {
          return false;
        }
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          pg.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [debouncedSearch, selectedLocation, selectedType, selectedPriceRange, selectedAmenities]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedType('all');
    setSelectedPriceRange(0);
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Find Your Perfect PG
            </h1>
            <p className="text-muted-foreground">
              Browse {pgListings.length} verified PG accommodations near CU campus
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <PGFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredPGs.length}</span> results
            </p>
          </div>

          {filteredPGs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPGs.map((pg, index) => (
                <PGCard key={pg.id} pg={pg} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No PGs Found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={clearFilters}
                className="text-primary font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PGList;
