import { LogOut, ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  username: string;
  onLogout: () => void;
}

const AdminHeader = ({ username, onLogout }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </button>
            <h1 className="font-display text-2xl font-bold text-gray-900">
              PG Listings Admin
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full border border-orange-200">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Admin: {username}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;