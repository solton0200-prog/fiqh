import React, { useState } from 'react';
import { IndexNode } from '../types';
import TreeView from './TreeView';
import { FaSearch } from './icons';
import Spinner from './Spinner';

interface NavigationPanelProps {
  index: IndexNode[];
  onChapterSelect: (chapterId: string) => void;
  isLoading: boolean;
  isOpen: boolean;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ index, onChapterSelect, isLoading, isOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const panelClasses = `
    bg-slate-800 text-white transition-all duration-300 ease-in-out
    h-full overflow-y-auto flex flex-col
    md:w-80 md:static md:translate-x-0
    fixed top-0 end-0 z-20 w-80
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `;
  
  return (
    <aside className={panelClasses}>
      <div className="p-4 border-b border-slate-700 sticky top-0 bg-slate-800">
        <h2 className="text-lg font-bold mb-3">فهرس الكتاب</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="بحث في الفهرس..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700 rounded-md py-2 ps-9 pe-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="p-4 flex-grow">
        {isLoading ? (
          <Spinner text="جاري تحميل الفهرس..." />
        ) : (
          <TreeView data={index} onChapterSelect={onChapterSelect} searchTerm={searchTerm} />
        )}
      </div>
    </aside>
  );
};

export default NavigationPanel;
