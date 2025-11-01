import React, { useState, Fragment } from 'react';
import { IndexNode } from '../types';
import { FaFolder, FaFolderOpen, FaFileAlt, FaAngleLeft, FaAngleDown } from './icons';

interface TreeNodeProps {
  node: IndexNode;
  onNodeClick: (node: IndexNode) => void;
  searchTerm: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onNodeClick, searchTerm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isParent = node.children && node.children.length > 0;
  
  const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
  
  if (!matchesSearch && !node.children?.some(child => child.name.toLowerCase().includes(searchTerm.toLowerCase()))) {
    return null;
  }

  const handleToggle = () => {
    if (isParent) {
      setIsOpen(!isOpen);
    } else {
      onNodeClick(node);
    }
  };
  
  const highlightMatch = (text: string, term: string) => {
      if (!term) return text;
      const parts = text.split(new RegExp(`(${term})`, 'gi'));
      return parts.map((part, index) => 
        part.toLowerCase() === term.toLowerCase() ? <span key={index} className="bg-yellow-300 text-black">{part}</span> : part
      );
  }

  return (
    <div className="my-1">
      <div
        onClick={handleToggle}
        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-700"
      >
        <div className="w-6 flex-shrink-0">
          {isParent && (isOpen ? <FaAngleDown className="text-xs" /> : <FaAngleLeft className="text-xs" />)}
        </div>
        <div className="me-2 text-cyan-400">
          {isParent ? (isOpen ? <FaFolderOpen /> : <FaFolder />) : <FaFileAlt />}
        </div>
        <span className="text-sm">{highlightMatch(node.name, searchTerm)}</span>
      </div>
      {isOpen && isParent && (
        <div className="ps-6 border-s-2 border-slate-600">
          {node.children?.map(child => (
            <TreeNode key={child.id} node={child} onNodeClick={onNodeClick} searchTerm={searchTerm} />
          ))}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
    data: IndexNode[];
    onChapterSelect: (chapterId: string) => void;
    searchTerm: string;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onChapterSelect, searchTerm }) => {
    const handleNodeClick = (node: IndexNode) => {
        if (!node.children || node.children.length === 0) {
            onChapterSelect(node.id);
        }
    }

    return (
        <div>
            {data.map(node => (
                <TreeNode key={node.id} node={node} onNodeClick={handleNodeClick} searchTerm={searchTerm} />
            ))}
        </div>
    );
};

export default TreeView;
