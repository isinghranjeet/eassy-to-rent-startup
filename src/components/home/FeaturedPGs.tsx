import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PGCard } from '@/components/pg/PGCard';

// ✅ UPDATED: Use your Render backend URL
const API_URL = 'https://eassy-to-rent-backend.onrender.com';

export function FeaturedPGs() {
  const [featuredPGs, setFeaturedPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchFeaturedPGs = async () => {
      try {
        setLoading(true);
        setError('');
        
        console.log('🌐 Fetching featured PGs from:', `${API_URL}/api/pg`);
        
        // First, try to get all PGs and filter featured ones
        const response = await fetch(`${API_URL}/api/pg`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('📥 Response received:', result);
        
        if (result.success && Array.isArray(result.data)) {
          // Filter for featured PGs
          const featured = result.data
            .filter(pg => pg.featured === true)
            .slice(0, showMore ? 6 : 3); // Show 3 or 6 based on state
          
          console.log(`✅ Found ${featured.length} featured PGs`);
          setFeaturedPGs(featured);
        } else {
          console.warn('⚠️ Invalid response format:', result);
          setError(result.message || 'Failed to load PGs');
          setFeaturedPGs([]);
        }
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError('Unable to load featured PGs. Using demo data instead.');
        
        // Load demo data as fallback
        loadDemoData();
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPGs();
  }, [showMore]);

  const loadDemoData = () => {
    console.log('🔄 Loading demo featured PGs...');
    const demoPGs = [
      {
        _id: 'demo-1',
        name: 'Sunshine Boys PG',
        city: 'Chandigarh',
        locality: 'Gate 1',
        address: 'Gate 1, Chandigarh University Road',
        price: 8500,
        type: 'boys',
        rating: 4.5,
        reviewCount: 42,
        description: 'Premium boys PG with all modern amenities near CU Gate 1',
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80'],
        amenities: ['WiFi', 'AC', 'Meals', 'Parking', 'CCTV', 'Power Backup'],
        verified: true,
        featured: true,
        ownerName: 'Rajesh Kumar',
        ownerPhone: '9876543210',
        distance: '500m from CU'
      },
      {
        _id: 'demo-2',
        name: 'Girls Safe Haven PG',
        city: 'Chandigarh',
        locality: 'Library Road',
        address: 'Near University Library, CU Campus',
        price: 9500,
        type: 'girls',
        rating: 4.8,
        reviewCount: 36,
        description: 'Secure and comfortable PG exclusively for girls with 24/7 security',
        images: ['https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&auto=format&fit=crop&q=80'],
        amenities: ['WiFi', 'AC', 'Meals', 'Security', 'CCTV', 'Hot Water', 'Laundry'],
        verified: true,
        featured: true,
        ownerName: 'Priya Sharma',
        ownerPhone: '9876543211',
        distance: '300m from Library'
      },
      {
        _id: 'demo-3',
        name: 'Co-Ed Student Hub',
        city: 'Chandigarh',
        locality: 'Sports Complex',
        address: 'Opposite CU Sports Complex',
        price: 7500,
        type: 'co-ed',
        rating: 4.3,
        reviewCount: 28,
        description: 'Co-ed PG perfect for students with study room and high-speed internet',
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80'],
        amenities: ['WiFi', 'Study Room', 'Library', 'Common Area', 'Laundry', 'Power Backup'],
        verified: true,
        featured: true,
        ownerName: 'Amit Verma',
        ownerPhone: '9876543212',
        distance: '200m from Sports Complex'
      }
    ];
    
    setFeaturedPGs(showMore ? demoPGs : demoPGs.slice(0, 3));
    console.log('✅ Demo data loaded');
  };

  const handleRetry = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      loadDemoData();
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-64 bg-gray-200 rounded mt-2"></div>
              <div className="h-4 w-96 bg-gray-200 rounded mt-2"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && featuredPGs.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center py-12 border-2 border-dashed border-orange-200 rounded-2xl bg-white">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Connection Issue</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {error}
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={handleRetry}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Load Demo Data
              </Button>
              <a href={`${API_URL}/api/pg`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-orange-300">
                  Test API
                </Button>
              </a>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Backend URL: {API_URL}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-orange-100 text-orange-700 rounded-full border border-orange-200">
              <Star className="h-4 w-4 fill-orange-500" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Top Picks
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Featured PG Accommodations
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Hand-picked premium stays loved by students for their comfort, location, and amenities. 
              All verified and highly rated by residents.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {featuredPGs.length > 3 && (
              <Button 
                onClick={() => setShowMore(!showMore)}
                variant="outline" 
                className="border-orange-300 hover:bg-orange-50"
              >
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            )}
            <Link to="/pg">
              <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
                View All PGs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {featuredPGs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Featured PGs Available</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              There are no featured accommodations at the moment. Check back soon!
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={handleRetry}
                variant="outline"
                className="border-orange-300"
              >
                Refresh
              </Button>
              <a href={`${API_URL}/api/pg/sample-data`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Add Sample Data
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPGs.map((pg, index) => (
                <div 
                  key={pg._id || index} 
                  className="transform transition-transform duration-300 hover:-translate-y-2"
                >
                  <PGCard pg={pg} index={index} />
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Need more options?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Browse our complete collection of verified PG accommodations
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link to="/pg?type=boys">
                    <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      👦 Boys PG
                    </Button>
                  </Link>
                  <Link to="/pg?type=girls">
                    <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                      👧 Girls PG
                    </Button>
                  </Link>
                  <Link to="/pg?type=co-ed">
                    <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                      👫 Co-ed PG
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}