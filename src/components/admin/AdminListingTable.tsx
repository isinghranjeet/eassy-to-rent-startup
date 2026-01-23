import { Edit2, Eye, EyeOff, Star, Shield, Trash2, Search } from 'lucide-react';

interface PGListing {
  id: string;
  slug: string;
  name: string;
  address: string;
  price: number;
  originalPrice?: number;
  type: 'boys' | 'girls' | 'co-ed';
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  amenities: string[];
  roomTypes: string[];
  distance: string;
  availability: 'available' | 'limited' | 'full';
  verified: boolean;
  featured: boolean;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminListingTableProps {
  listings: PGListing[];
  onEdit: (listing: PGListing) => void;
  onTogglePublish: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onToggleVerified: (id: string) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: string;
  onFilterTypeChange: (type: string) => void;
  filterStatus: string;
  onFilterStatusChange: (status: string) => void;
  onAddNew: () => void;
}

const AdminListingTable = ({
  listings,
  onEdit,
  onTogglePublish,
  onToggleFeatured,
  onToggleVerified,
  onDelete,
  searchQuery,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterStatus,
  onFilterStatusChange,
  onAddNew
}: AdminListingTableProps) => {
  // Filtered listings
  const filteredListings = listings.filter(listing => {
    const matchesSearch = searchQuery === '' ||
      listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || listing.type === filterType;
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'published' && listing.published) ||
      (filterStatus === 'draft' && !listing.published);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search listings by name, address, or owner..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={filterType}
              onChange={(e) => onFilterTypeChange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            >
              <option value="all">All Types</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="co-ed">Co-Ed</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => onFilterStatusChange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            
            <button
              onClick={onAddNew}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              <span>+</span>
              Add New PG
            </button>
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">PG Details</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={listing.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400'}
                          alt={listing.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{listing.name}</h3>
                          {listing.featured && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                              Featured
                            </span>
                          )}
                          {listing.verified && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{listing.address}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>⭐ {listing.rating} ({listing.reviewCount})</span>
                          <span>•</span>
                          <span>{listing.distance} from campus</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      listing.type === 'boys' ? 'bg-blue-100 text-blue-700' :
                      listing.type === 'girls' ? 'bg-pink-100 text-pink-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {listing.type === 'co-ed' ? 'Co-Ed' : listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-lg font-semibold text-gray-900">₹{listing.price.toLocaleString()}</div>
                    {listing.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">₹{listing.originalPrice.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        listing.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {listing.published ? 'Published' : 'Draft'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        listing.availability === 'available' ? 'bg-green-100 text-green-700' :
                        listing.availability === 'limited' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {listing.availability === 'available' ? 'Available' :
                         listing.availability === 'limited' ? 'Limited' : 'Full'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(listing)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => onTogglePublish(listing.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          listing.published 
                            ? 'text-green-600 hover:bg-green-50' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={listing.published ? 'Unpublish' : 'Publish'}
                      >
                        {listing.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => onToggleFeatured(listing.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          listing.featured 
                            ? 'text-orange-600 hover:bg-orange-50' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={listing.featured ? 'Remove Featured' : 'Make Featured'}
                      >
                        <Star className={`h-4 w-4 ${listing.featured ? 'fill-orange-500' : ''}`} />
                      </button>
                      
                      <button
                        onClick={() => onToggleVerified(listing.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          listing.verified 
                            ? 'text-green-600 hover:bg-green-50' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={listing.verified ? 'Unverify' : 'Verify'}
                      >
                        <Shield className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => onDelete(listing.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListingTable;