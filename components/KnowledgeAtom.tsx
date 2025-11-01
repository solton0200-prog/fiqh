import React, { useState } from 'react';
import { KnowledgeAtom as AtomType } from '../types';
import { FaAngleLeft, FaAngleDown } from './icons';

interface KnowledgeAtomProps {
  atom: AtomType;
}

const KnowledgeAtom: React.FC<KnowledgeAtomProps> = ({ atom }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSubtypeBadgeColor = (subtype: string | null) => {
    switch(subtype) {
      case 'روائي': return 'bg-green-600';
      case 'فقهي': return 'bg-blue-600';
      case 'أصولي': return 'bg-purple-600';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="group relative bg-slate-700/50 rounded-lg mb-4 border border-slate-600 transition-all duration-300 hover:border-cyan-500">
      {/* Popover for original text */}
      <div className="absolute bottom-full mb-2 start-1/2 -translate-x-1/2 w-80 max-h-60 overflow-y-auto p-3 text-sm bg-slate-900 text-white rounded-lg shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        <h4 className="font-bold border-b border-slate-600 pb-1 mb-2 text-cyan-400">النص الأصلي من المصدر</h4>
        <p className="leading-normal">{atom.source.original_text}</p>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <p className="flex-grow text-base text-slate-100">{atom.summary_ar}</p>
          {atom.atom_subtype && (
            <span className={`text-xs text-white font-semibold rounded-full px-3 py-1 me-auto ms-3 whitespace-nowrap ${getSubtypeBadgeColor(atom.atom_subtype)}`}>
              {atom.atom_subtype}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
          <p>
            <span className="font-semibold text-slate-300">المصدر:</span> {atom.source.book_title} ({atom.source.author})
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 hover:text-cyan-400"
          >
            {isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
            {isExpanded ? <FaAngleDown /> : <FaAngleLeft />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-slate-600 bg-slate-800/50 p-4 rounded-b-lg">
          <pre className="text-sm text-yellow-200 whitespace-pre-wrap font-mono">
            {JSON.stringify(atom.structured_content, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default KnowledgeAtom;
