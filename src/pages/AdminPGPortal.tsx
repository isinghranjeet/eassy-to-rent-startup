









import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import AdminHeader from '../components/admin/AdminHeader';
import AdminStats from '../components/admin/AdminStats';
import AdminListingTable from '../components/admin/AdminListingTable';
import AdminEditModal from '../components/admin/AdminEditModal';

// Import types from new file
import { PGListing } from '../data/adminTypes';

const AdminPGPortal = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // PG Listings State
  const [listings, setListings] = useState<PGListing[]>([
    // ... your sample data here (same as before)
  ]);

  const [editingListing, setEditingListing] = useState<PGListing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        localStorage.setItem('pgAdminAuth', 'true');
      } else {
        alert('Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pgAdminAuth');
  };

  useEffect(() => {
    const auth = localStorage.getItem('pgAdminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // PG Management Functions
  const handleAddListing = () => {
    const newId = (Math.max(...listings.map(l => parseInt(l.id))) + 1).toString();
    const newSlug = `new-pg-listing-${newId}`;
    const newListing: PGListing = {
      id: newId,
      slug: newSlug,
      name: 'New PG Listing',
      address: 'Enter address',
      price: 0,
      type: 'boys',
      rating: 0,
      reviewCount: 0,
      description: 'Enter description',
      images: [],
      amenities: [],
      roomTypes: [],
      distance: '0km',
      availability: 'available',
      verified: false,
      featured: false,
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      published: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setEditingListing(newListing);
    setIsEditing(true);
  };

  const handleEditListing = (listing: PGListing) => {
    setEditingListing({ ...listing });
    setIsEditing(true);
  };

  const handleSaveListing = (listing: PGListing) => {
    const isNew = !listings.find(l => l.id === listing.id);
    const updatedListing = {
      ...listing,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    if (isNew) {
      setListings(prev => [...prev, updatedListing]);
    } else {
      setListings(prev => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
    }

    setIsEditing(false);
    setEditingListing(null);
  };

  const handleDeleteListing = (id: string) => {
    setListings(prev => prev.filter(l => l.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleTogglePublish = (id: string) => {
    setListings(prev =>
      prev.map(l =>
        l.id === id ? { ...l, published: !l.published, updatedAt: new Date().toISOString().split('T')[0] } : l
      )
    );
  };

  const handleToggleFeatured = (id: string) => {
    setListings(prev =>
      prev.map(l =>
        l.id === id ? { ...l, featured: !l.featured, updatedAt: new Date().toISOString().split('T')[0] } : l
      )
    );
  };

  const handleToggleVerified = (id: string) => {
    setListings(prev =>
      prev.map(l =>
        l.id === id ? { ...l, verified: !l.verified, updatedAt: new Date().toISOString().split('T')[0] } : l
      )
    );
  };

  // Statistics
  const stats = {
    total: listings.length,
    published: listings.filter(l => l.published).length,
    draft: listings.filter(l => !l.published).length,
    featured: listings.filter(l => l.featured).length,
    verified: listings.filter(l => l.verified).length,
    boys: listings.filter(l => l.type === 'boys').length,
    girls: listings.filter(l => l.type === 'girls').length,
    coed: listings.filter(l => l.type === 'co-ed').length,
  };

  // Render Login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50/60 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full border border-orange-200 mb-4">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">PG Admin Portal</span>
              </div>
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
                Admin Login
              </h1>
              <p className="text-gray-600 text-sm">
                Sign in to manage PG listings
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
              </button>

              <div className="text-center text-sm text-gray-500 mt-4">
                <p>Default credentials: admin / admin123</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Portal with Components
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <AdminHeader username={username} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <AdminStats stats={stats} />

        <AdminListingTable
          listings={listings}
          onEdit={handleEditListing}
          onTogglePublish={handleTogglePublish}
          onToggleFeatured={handleToggleFeatured}
          onToggleVerified={handleToggleVerified}
          onDelete={(id) => setShowDeleteConfirm(id)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          onAddNew={handleAddListing}
        />

        {/* Edit Modal */}
        {isEditing && editingListing && (
          <AdminEditModal
            listing={editingListing}
            isNew={!listings.find(l => l.id === editingListing.id)}
            onSave={handleSaveListing}
            onCancel={() => {
              setIsEditing(false);
              setEditingListing(null);
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete Listing?
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete this listing? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteListing(showDeleteConfirm)}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminPGPortal;