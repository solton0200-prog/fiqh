import React from 'react';
// FIX: Import `FaBrain` icon.
import { FaBars, FaBook, FaSearch, FaBrain } from './icons';

interface HeaderProps {
  toggleNavPanel: () => void;
  toggleKnowledgePanel: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleNavPanel, toggleKnowledgePanel }) => {
  return (
    <header className="bg-slate-800 text-white shadow-md flex items-center justify-between p-3 px-4 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleNavPanel} className="p-2 rounded-full hover:bg-slate-700 md:hidden">
          <FaBars />
        </button>
        <div className="flex items-center gap-2">
          <FaBook className="text-2xl text-cyan-400" />
          <h1 className="text-xl font-bold whitespace-nowrap">ورشة فقه دانش</h1>
        </div>
      </div>
      
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <input
            type="search"
            placeholder="بحث شامل في المتون والشروح..."
            className="w-full bg-slate-700 text-white rounded-full py-2 ps-10 pe-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="text-slate-400" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <button onClick={toggleKnowledgePanel} className="p-2 rounded-full hover:bg-slate-700 md:hidden">
          <FaBrain />
        </button>
      </div>
    </header>
  );
};

export default Header;