import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-2">
          <Link to="/" className="flex items-center space-x-2 mb-2 sm:mb-0">
            <Shield className="w-8 h-8 text-purple-600" />
            <div>
              <span className="text-xl font-bold text-purple-900">SAFER HER</span>
              <div className="text-xs text-purple-900">Because every woman deserves to feel safe</div>
            </div>
          </Link>
  
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            {user ? (
              <>
                <span className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                  Welcome, {user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
  
};