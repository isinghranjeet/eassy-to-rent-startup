import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, AlertCircle, CheckCircle, RefreshCw, Trash2, Edit, 
  Eye, EyeOff, Star, StarOff, UserCheck, Search, Filter, 
  Plus, Download, Upload, BarChart3, Users, Home, Settings,
  ChevronRight, ChevronLeft, X, Save, Loader2, MapPin,
  Phone, Mail, Calendar, Check, XCircle, ExternalLink
} from 'lucide-react';

// ✅ Backend URL
const API_URL = 'https://eassy-to-rent-backend.onrender.com';

// ✅ PG Listing Interface
interface PGListing {
  _id: string;
  name: string;
  city: string;
  locality: string;
  address: string;
  price: number;
  type: 'boys' | 'girls' | 'co-ed' | 'family';
  description: string;
  images: string[];
  gallery: string[];
  googleMapLink: string;
  amenities: string[];
  roomTypes: string[];
  distance: string;
  availability: 'available' | 'sold-out' | 'coming-soon';
  published: boolean;
  verified: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerId: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Edit Modal Component
const EditModal = ({ listing, onClose, onSave }: { 
  listing: PGListing; 
  onClose: () => void;
  onSave: (data: PGListing) => void;
}) => {
  const [formData, setFormData] = useState(listing);
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newAmenity, setNewAmenity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()]
      });
      setNewImage('');
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()]
      });
      setNewAmenity('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const removeAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Edit PG Listing
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PG Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Locality
                </label>
                <input
                  type="text"
                  value={formData.locality}
                  onChange={(e) => setFormData({...formData, locality: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹/month) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="co-ed">Co-ed</option>
                  <option value="family">Family</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Name *
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Phone *
                </label>
                <input
                  type="text"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Email
                </label>
                <input
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="available">Available</option>
                  <option value="sold-out">Sold Out</option>
                  <option value="coming-soon">Coming Soon</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance
                </label>
                <input
                  type="text"
                  value={formData.distance}
                  onChange={(e) => setFormData({...formData, distance: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="e.g., 500m from CU"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              required
            />
          </div>

          {/* Images */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=Image+Error';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Enter amenity"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  <span className="text-sm">{amenity}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps Link */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Maps Link
            </label>
            <input
              type="text"
              value={formData.googleMapLink}
              onChange={(e) => setFormData({...formData, googleMapLink: e.target.value})}
              placeholder="https://maps.google.com/?q=..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Status Toggles */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">Published</div>
                <div className="text-sm text-gray-600">Visible to users</div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, published: !formData.published})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.published ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.published ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">Featured</div>
                <div className="text-sm text-gray-600">Show in featured</div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, featured: !formData.featured})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.featured ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.featured ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">Verified</div>
                <div className="text-sm text-gray-600">Verified badge</div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, verified: !formData.verified})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.verified ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.verified ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Delete Confirmation Modal
const DeleteModal = ({ onConfirm, onCancel }: { 
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Delete Listing?
        </h3>
        <p className="text-gray-600">
          This action cannot be undone. All data will be permanently removed.
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
        >
          Delete Listing
        </button>
      </div>
    </div>
  </div>
);

// ✅ Quick Stats Component
const StatsCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white rounded-2xl p-6 border shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
    </div>
    {trend && (
      <div className={`text-sm ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend.value > 0 ? '↗' : '↘'} {trend.value}% from last month
      </div>
    )}
  </div>
);

// ✅ Rating Stars Component
const RatingStars = ({ rating, reviewCount, showCount = true, size = "sm" }: { 
  rating: number; 
  reviewCount: number; 
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const starSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  }[size];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-medium ${
          size === "sm" ? "text-sm" : 
          size === "md" ? "text-base" : 
          "text-lg"
        } ${rating >= 4 ? 'text-green-600' : rating >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
          {rating.toFixed(1)}
        </span>
        {showCount && reviewCount > 0 && (
          <>
            <span className="text-gray-400">•</span>
            <span className={`${size === "sm" ? "text-xs" : "text-sm"} text-gray-500`}>
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// ✅ Listing Card Component
const ListingCard = ({ listing, onEdit, onDelete, onToggleStatus }: any) => {
  const mainImage = listing.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';
  const navigate = useNavigate();

  // Function to handle view details
  const handleViewDetails = () => {
    navigate(`/pg/${listing._id}`);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={mainImage}
          alt={listing.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Error';
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.featured && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
              Featured
            </span>
          )}
          {listing.verified && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
              Verified
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            listing.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {listing.published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900 line-clamp-1">{listing.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{listing.city}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">{listing.locality}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-orange-600">₹{listing.price}</div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
        </div>

        {/* Rating Display */}
        <div className="mb-3">
          <RatingStars 
            rating={listing.rating || 0} 
            reviewCount={listing.reviewCount || 0} 
            size="md"
          />
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {listing.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities?.slice(0, 3).map((amenity: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {amenity}
            </span>
          ))}
          {listing.amenities?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{listing.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            {/* View Button */}
            <button
              onClick={handleViewDetails}
              className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">View</span>
            </button>
            
            {/* Status Toggle Buttons */}
            <button
              onClick={() => onToggleStatus(listing._id, 'published')}
              className={`p-2 rounded-lg transition-colors ${
                listing.published 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={listing.published ? 'Unpublish' : 'Publish'}
            >
              {listing.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button
              onClick={() => onToggleStatus(listing._id, 'featured')}
              className={`p-2 rounded-lg transition-colors ${
                listing.featured 
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={listing.featured ? 'Unfeature' : 'Feature'}
            >
              {listing.featured ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
            </button>
            <button
              onClick={() => onToggleStatus(listing._id, 'verified')}
              className={`p-2 rounded-lg transition-colors ${
                listing.verified 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={listing.verified ? 'Unverify' : 'Verify'}
            >
              <UserCheck className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(listing)}
              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(listing._id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Main Admin Component
const AdminPGPortal = () => {
  const navigate = useNavigate();
  
  // State
  const [listings, setListings] = useState<PGListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<PGListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [editingListing, setEditingListing] = useState<PGListing | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'name' | 'rating'>('newest');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0,
    verified: 0,
    boys: 0,
    girls: 0,
    coed: 0,
    family: 0,
    avgRating: 0,
    totalReviews: 0
  });

  // ✅ Fetch Listings
  const fetchListings = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('🔍 Fetching listings from:', API_URL);
      
      const response = await fetch(`${API_URL}/api/pg?admin=true`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        const listingsData = result.data;
        setListings(listingsData);
        setFilteredListings(listingsData);
        setConnectionStatus('connected');
        
        // Calculate stats
        calculateStats(listingsData);
        
        console.log(`✅ Loaded ${listingsData.length} listings`);
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(`Failed to load listings: ${err.message}`);
      setConnectionStatus('disconnected');
      
      // Fallback mock data
      const mockData = getMockData();
      setListings(mockData);
      setFilteredListings(mockData);
      calculateStats(mockData);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const calculateStats = (data: PGListing[]) => {
    const totalRatings = data.reduce((sum, listing) => sum + (listing.rating || 0), 0);
    const totalReviews = data.reduce((sum, listing) => sum + (listing.reviewCount || 0), 0);
    
    setStats({
      total: data.length,
      published: data.filter(l => l.published).length,
      draft: data.filter(l => !l.published).length,
      featured: data.filter(l => l.featured).length,
      verified: data.filter(l => l.verified).length,
      boys: data.filter(l => l.type === 'boys').length,
      girls: data.filter(l => l.type === 'girls').length,
      coed: data.filter(l => l.type === 'co-ed').length,
      family: data.filter(l => l.type === 'family').length,
      avgRating: data.length > 0 ? totalRatings / data.length : 0,
      totalReviews: totalReviews
    });
  };

  // Mock data fallback
  const getMockData = (): PGListing[] => [
    {
      _id: 'mock-1',
      name: 'Sunshine Boys PG',
      city: 'Chandigarh',
      locality: 'Gate 1',
      address: 'Gate 1, Chandigarh University Road',
      price: 8500,
      type: 'boys',
      description: 'Premium boys PG with all modern amenities near CU Gate 1',
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
      gallery: [],
      googleMapLink: '',
      amenities: ['WiFi', 'AC', 'Meals', 'Parking', 'CCTV'],
      roomTypes: ['Single', 'Double'],
      distance: '500m from CU',
      availability: 'available',
      published: true,
      verified: true,
      featured: true,
      rating: 4.5,
      reviewCount: 42,
      ownerName: 'Rajesh Kumar',
      ownerPhone: '9876543210',
      ownerEmail: 'rajesh@example.com',
      ownerId: 'owner-1',
      contactEmail: 'contact@example.com',
      contactPhone: '9876543210',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'mock-2',
      name: 'Girls Safe Haven PG',
      city: 'Chandigarh',
      locality: 'Library Road',
      address: 'Near University Library, CU Campus',
      price: 9500,
      type: 'girls',
      description: 'Secure and comfortable PG exclusively for girls with 24/7 security',
      images: ['https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800'],
      gallery: [],
      googleMapLink: '',
      amenities: ['WiFi', 'AC', 'Meals', 'Security', 'CCTV'],
      roomTypes: ['Single', 'Double', 'Triple'],
      distance: '300m from Library',
      availability: 'available',
      published: true,
      verified: true,
      featured: false,
      rating: 4.8,
      reviewCount: 36,
      ownerName: 'Priya Sharma',
      ownerPhone: '9876543211',
      ownerEmail: 'priya@example.com',
      ownerId: 'owner-2',
      contactEmail: 'contact2@example.com',
      contactPhone: '9876543211',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'mock-3',
      name: 'Co-Ed Student Hub',
      city: 'Chandigarh',
      locality: 'Sports Complex',
      address: 'Opposite CU Sports Complex',
      price: 7500,
      type: 'co-ed',
      description: 'Co-ed PG perfect for students with study room and high-speed internet',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'],
      gallery: [],
      googleMapLink: '',
      amenities: ['WiFi', 'Study Room', 'Library', 'Common Area'],
      roomTypes: ['Single', 'Double'],
      distance: '200m from Sports Complex',
      availability: 'available',
      published: false,
      verified: false,
      featured: false,
      rating: 4.3,
      reviewCount: 28,
      ownerName: 'Amit Verma',
      ownerPhone: '9876543212',
      ownerEmail: 'amit@example.com',
      ownerId: 'owner-3',
      contactEmail: 'contact3@example.com',
      contactPhone: '9876543212',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  // ✅ Apply Filters
  useEffect(() => {
    let filtered = [...listings];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(listing =>
        listing.name.toLowerCase().includes(query) ||
        listing.city.toLowerCase().includes(query) ||
        listing.locality.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.ownerName.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(listing => listing.type === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(listing =>
        filterStatus === 'published' ? listing.published : !listing.published
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredListings(filtered);
  }, [listings, searchQuery, filterType, filterStatus, sortBy]);

  // ✅ Initial Load
  useEffect(() => {
    fetchListings();
  }, []);

  // ✅ Handle Save Listing
  const handleSaveListing = async (listingData: PGListing) => {
    setActionLoading(true);
    try {
      const isNew = !listingData._id || listingData._id.startsWith('mock-');
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? `${API_URL}/api/pg` : `${API_URL}/api/pg/${listingData._id}`;

      console.log(`💾 ${method} ${url}`);

      // For mock data (fallback)
      if (connectionStatus === 'disconnected' || listingData._id.startsWith('mock-')) {
        if (isNew) {
          const newListing = {
            ...listingData,
            _id: `mock-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setListings(prev => [...prev, newListing as PGListing]);
        } else {
          setListings(prev => prev.map(l => 
            l._id === listingData._id ? listingData : l
          ));
        }
        alert('Listing saved successfully (using mock data)');
        return;
      }

      // Real API call
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listingData)
      });

      const result = await response.json();

      if (result.success) {
        if (isNew) {
          setListings(prev => [...prev, result.data]);
        } else {
          setListings(prev => prev.map(l => 
            l._id === listingData._id ? result.data : l
          ));
        }
        alert('Listing saved successfully!');
      } else {
        throw new Error(result.message || 'Failed to save');
      }

    } catch (error: any) {
      console.error('❌ Save error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setActionLoading(false);
      setEditingListing(null);
    }
  };

  // ✅ Handle Delete Listing
  const handleDeleteListing = async (id: string) => {
    setActionLoading(true);
    try {
      // For mock data
      if (id.startsWith('mock-')) {
        setListings(prev => prev.filter(l => l._id !== id));
        alert('Listing deleted (using mock data)');
        return;
      }

      // Real API call
      const response = await fetch(`${API_URL}/api/pg/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        setListings(prev => prev.filter(l => l._id !== id));
        alert('Listing deleted successfully!');
      } else {
        throw new Error(result.message || 'Failed to delete');
      }

    } catch (error: any) {
      console.error('❌ Delete error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setActionLoading(false);
      setDeletingId(null);
    }
  };

  // ✅ Handle Toggle Status
  const handleToggleStatus = async (id: string, field: 'published' | 'featured' | 'verified') => {
    try {
      const listing = listings.find(l => l._id === id);
      if (!listing) return;

      const newValue = !listing[field];
      
      // For mock data
      if (id.startsWith('mock-')) {
        setListings(prev => prev.map(l => 
          l._id === id ? { ...l, [field]: newValue } : l
        ));
        return;
      }

      // Real API call
      const response = await fetch(`${API_URL}/api/pg/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: newValue })
      });

      const result = await response.json();

      if (result.success) {
        setListings(prev => prev.map(l => 
          l._id === id ? { ...l, [field]: newValue } : l
        ));
      } else {
        throw new Error(result.message);
      }

    } catch (error: any) {
      console.error(`❌ Toggle ${field} error:`, error);
      alert(`Error: ${error.message}`);
    }
  };

  // ✅ Add New Listing
  const handleAddNew = () => {
    const newListing: PGListing = {
      _id: '',
      name: 'New PG Listing',
      city: 'Chandigarh',
      locality: '',
      address: '',
      price: 5000,
      type: 'boys',
      description: 'Enter description here...',
      images: [],
      gallery: [],
      googleMapLink: '',
      amenities: ['WiFi', 'Power Backup'],
      roomTypes: ['Single', 'Double'],
      distance: '',
      availability: 'available',
      published: false,
      verified: false,
      featured: false,
      rating: 4.0,
      reviewCount: 0,
      ownerName: 'Owner Name',
      ownerPhone: '9876543210',
      ownerEmail: 'owner@example.com',
      ownerId: '',
      contactEmail: '',
      contactPhone: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEditingListing(newListing);
  };

  // ✅ Export Data
  const handleExport = () => {
    const dataStr = JSON.stringify(listings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `pg-listings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // ✅ Handle Refresh
  const handleRefresh = () => {
    fetchListings();
  };

  // ✅ Loading State
  if (loading && listings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading Admin Panel...</h2>
          <p className="text-gray-600 mt-2">Please wait while we fetch your listings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-xl">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PG Admin Portal</h1>
                <p className="text-sm text-gray-600">
                  Manage all PG listings • {connectionStatus === 'connected' ? '🟢 Live' : '🟡 Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={actionLoading}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${actionLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Connection Status */}
        <div className="mb-8">
          {connectionStatus === 'connected' ? (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-700">✅ Connected to Backend</h3>
                  <p className="text-green-600 text-sm">
                    Real-time data sync with {API_URL}
                  </p>
                </div>
                <div className="text-sm text-green-700 font-medium">
                  {listings.length} listings loaded
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-700">⚠️ Using Mock Data</h3>
                  <p className="text-orange-600 text-sm">
                    Backend not connected. Working offline with sample data.
                  </p>
                </div>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <StatsCard
            title="Total Listings"
            value={stats.total}
            icon={Home}
            color="bg-blue-500"
          />
          <StatsCard
            title="Published"
            value={stats.published}
            icon={Eye}
            color="bg-green-500"
          />
          <StatsCard
            title="Featured"
            value={stats.featured}
            icon={Star}
            color="bg-orange-500"
          />
          <StatsCard
            title="Verified"
            value={stats.verified}
            icon={UserCheck}
            color="bg-purple-500"
          />
          <StatsCard
            title="Avg. Rating"
            value={stats.avgRating.toFixed(1)}
            icon={Star}
            color="bg-yellow-500"
          />
          <StatsCard
            title="Total Reviews"
            value={stats.totalReviews}
            icon={BarChart3}
            color="bg-indigo-500"
          />
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, city, description, owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="boys">Boys PG</option>
                  <option value="girls">Girls PG</option>
                  <option value="co-ed">Co-ed PG</option>
                  <option value="family">Family PG</option>
                </select>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="rating">Rating: High to Low</option>
              </select>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 bg-current"></div>)}
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <div className="space-y-1">
                    <div className="w-4 h-2 bg-current"></div>
                    <div className="w-4 h-2 bg-current"></div>
                  </div>
                </button>
              </div>
              <button
                onClick={handleAddNew}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-600 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Plus className="h-5 w-5" />
                Add New PG
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredListings.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{listings.length}</span> listings
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Published</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Featured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-red-700 font-medium">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Listings Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
            >
              Create Your First Listing
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                onEdit={setEditingListing}
                onDelete={setDeletingId}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-2xl border shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={listing.images[0] || 'https://via.placeholder.com/100'}
                    alt={listing.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{listing.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-600">{listing.city}, {listing.locality}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{listing.type}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm font-medium text-orange-600">₹{listing.price}/month</span>
                        </div>
                        <div className="mt-2">
                          <RatingStars 
                            rating={listing.rating || 0} 
                            reviewCount={listing.reviewCount || 0} 
                            size="sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/pg/${listing._id}`)}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 text-sm"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                        <button
                          onClick={() => setEditingListing(listing)}
                          className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(listing._id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {listing.amenities?.slice(0, 5).map((amenity: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PG Finder Admin • v2.0.0</p>
          <p className="mt-1">Average Rating: {stats.avgRating.toFixed(1)} • Total Reviews: {stats.totalReviews}</p>
        </div>
      </main>

      {/* Edit Modal */}
      {editingListing && (
        <EditModal
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onSave={handleSaveListing}
        />
      )}

      {/* Delete Modal */}
      {deletingId && (
        <DeleteModal
          onConfirm={() => handleDeleteListing(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
};

export default AdminPGPortal; 