import React from 'react';
import { Chunk as ChunkType } from '../types';
import Chunk from './Chunk';
import Spinner from './Spinner';
import { FaFileAlt } from './icons';

interface ReadingPanelProps {
  chunks: ChunkType[];
  selectedChunkId: string | null;
  onChunkSelect: (chunkId: string) => void;
  isLoading: boolean;
  chapterSelected: boolean;
}

const ReadingPanel: React.FC<ReadingPanelProps> = ({ chunks, selectedChunkId, onChunkSelect, isLoading, chapterSelected }) => {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {isLoading ? (
        <Spinner text="جاري تحميل المحتوى..."/>
      ) : !chapterSelected ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-400">
          <FaFileAlt className="text-6xl mb-4" />
          <h2 className="text-2xl font-semibold">الرجاء اختيار فصل من الفهرس</h2>
          <p>سيتم عرض محتوى الفصل المختار هنا.</p>
        </div>
      ) : chunks.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          {chunks.map(chunk => (
            <Chunk
              key={chunk.chunk_id}
              chunk={chunk}
              isSelected={chunk.chunk_id === selectedChunkId}
              onClick={onChunkSelect}
            />
          ))}
        </div>
      ) : (
         <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <FaFileAlt className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold">لا يوجد محتوى لهذا الفصل</h2>
          </div>
      )}
    </main>
  );
};

export default ReadingPanel;
