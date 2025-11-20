import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="px-6 py-4 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="text-blue-500 h-8 w-8" />
          <h1 className="text-xl font-bold text-white">VideSentry</h1>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                History
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;