// components/admin/AdminHeader.tsx
import React from 'react';
import { LogOut } from 'lucide-react';

interface AdminHeaderProps {
  username?: string;
  onLogout: () => void;
  useMockData?: boolean;
}

const AdminHeader = ({ username, onLogout, useMockData = false }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PG</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  PG Admin Portal
                </h1>
                <p className="text-xs text-gray-500">
                  Manage PG listings and bookings
                </p>
              </div>
            </div>
            
            {useMockData && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full border border-yellow-200">
                Mock Data
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {username || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;