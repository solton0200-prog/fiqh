import React from 'react';
import { Chunk as ChunkType } from '../types';

interface ChunkProps {
  chunk: ChunkType;
  isSelected: boolean;
  onClick: (chunkId: string) => void;
}

const Chunk: React.FC<ChunkProps> = ({ chunk, isSelected, onClick }) => {
  const chunkClasses = `
    p-4 mb-2 rounded-lg cursor-pointer transition-colors duration-200
    ${isSelected 
      ? 'bg-cyan-100 dark:bg-cyan-800/50 ring-2 ring-cyan-500' 
      : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'}
  `;
  
  return (
    <div
      className={chunkClasses}
      onClick={() => onClick(chunk.chunk_id)}
    >
      <p className="text-lg leading-relaxed">{chunk.text}</p>
    </div>
  );
};

export default Chunk;
