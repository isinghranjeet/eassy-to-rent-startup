import { Save, X, Plus } from 'lucide-react';
import { useState } from 'react';

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

interface AdminEditModalProps {
  listing: PGListing;
  isNew: boolean;
  onSave: (listing: PGListing) => void;
  onCancel: () => void;
}

const AdminEditModal = ({ listing, isNew, onSave, onCancel }: AdminEditModalProps) => {
  const [editedListing, setEditedListing] = useState<PGListing>({ ...listing });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [newRoomType, setNewRoomType] = useState('');

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setEditedListing({
      ...editedListing,
      images: [...editedListing.images, newImageUrl.trim()]
    });
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...editedListing.images];
    newImages.splice(index, 1);
    setEditedListing({
      ...editedListing,
      images: newImages
    });
  };

  const handleAddAmenity = () => {
    if (!newAmenity.trim()) return;
    setEditedListing({
      ...editedListing,
      amenities: [...editedListing.amenities, newAmenity.trim()]
    });
    setNewAmenity('');
  };

  const handleRemoveAmenity = (amenity: string) => {
    setEditedListing({
      ...editedListing,
      amenities: editedListing.amenities.filter(a => a !== amenity)
    });
  };

  const handleAddRoomType = () => {
    if (!newRoomType.trim()) return;
    setEditedListing({
      ...editedListing,
      roomTypes: [...editedListing.roomTypes, newRoomType.trim()]
    });
    setNewRoomType('');
  };

  const handleRemoveRoomType = (roomType: string) => {
    setEditedListing({
      ...editedListing,
      roomTypes: editedListing.roomTypes.filter(r => r !== roomType)
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              {isNew ? 'Add New PG' : 'Edit PG Listing'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PG Name *
              </label>
              <input
                type="text"
                value={editedListing.name}
                onChange={(e) => setEditedListing({ ...editedListing, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Enter PG name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={editedListing.slug}
                onChange={(e) => setEditedListing({ ...editedListing, slug: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="unique-slug-here"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                value={editedListing.type}
                onChange={(e) => setEditedListing({ ...editedListing, type: e.target.value as 'boys' | 'girls' | 'co-ed' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              >
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="co-ed">Co-Ed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability *
              </label>
              <select
                value={editedListing.availability}
                onChange={(e) => setEditedListing({ ...editedListing, availability: e.target.value as 'available' | 'limited' | 'full' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              >
                <option value="available">Available</option>
                <option value="limited">Limited</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>

          {/* Address & Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              value={editedListing.address}
              onChange={(e) => setEditedListing({ ...editedListing, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              placeholder="Enter full address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Price (₹) *
              </label>
              <input
                type="number"
                value={editedListing.price}
                onChange={(e) => setEditedListing({ ...editedListing, price: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="12000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                value={editedListing.originalPrice || ''}
                onChange={(e) => setEditedListing({ 
                  ...editedListing, 
                  originalPrice: e.target.value ? parseInt(e.target.value) : undefined 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="14000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance from Campus *
              </label>
              <input
                type="text"
                value={editedListing.distance}
                onChange={(e) => setEditedListing({ ...editedListing, distance: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="500m"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={editedListing.description}
              onChange={(e) => setEditedListing({ ...editedListing, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              placeholder="Describe the PG in detail..."
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Enter image URL"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {editedListing.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Add amenity (e.g., WiFi)"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {editedListing.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm"
                >
                  {amenity}
                  <button
                    onClick={() => handleRemoveAmenity(amenity)}
                    className="text-orange-500 hover:text-orange-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Types
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newRoomType}
                onChange={(e) => setNewRoomType(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Add room type (e.g., Single)"
              />
              <button
                type="button"
                onClick={handleAddRoomType}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {editedListing.roomTypes.map((roomType) => (
                <span
                  key={roomType}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {roomType}
                  <button
                    onClick={() => handleRemoveRoomType(roomType)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Owner Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Name *
              </label>
              <input
                type="text"
                value={editedListing.ownerName}
                onChange={(e) => setEditedListing({ ...editedListing, ownerName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Owner's name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Phone *
              </label>
              <input
                type="tel"
                value={editedListing.ownerPhone}
                onChange={(e) => setEditedListing({ ...editedListing, ownerPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="+91XXXXXXXXXX"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Email *
              </label>
              <input
                type="email"
                value={editedListing.ownerEmail}
                onChange={(e) => setEditedListing({ ...editedListing, ownerEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="owner@example.com"
              />
            </div>
          </div>

          {/* Rating & Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={editedListing.rating}
                onChange={(e) => setEditedListing({ ...editedListing, rating: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="4.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Count
              </label>
              <input
                type="number"
                value={editedListing.reviewCount}
                onChange={(e) => setEditedListing({ ...editedListing, reviewCount: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="50"
              />
            </div>
          </div>

          {/* Status Flags */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editedListing.published}
                onChange={(e) => setEditedListing({ ...editedListing, published: e.target.checked })}
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Published</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editedListing.featured}
                onChange={(e) => setEditedListing({ ...editedListing, featured: e.target.checked })}
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editedListing.verified}
                onChange={(e) => setEditedListing({ ...editedListing, verified: e.target.checked })}
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Verified</span>
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(editedListing)}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditModal;