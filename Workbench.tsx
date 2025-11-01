import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import NavigationPanel from './components/NavigationPanel';
import ReadingPanel from './components/ReadingPanel';
import KnowledgePanel from './components/KnowledgePanel';
import { fetchIndex, fetchChunks } from './services/api';
import { IndexNode, Chunk } from './types';

function Workbench() {
  const [index, setIndex] = useState<IndexNode[]>([]);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedChunkId, setSelectedChunkId] = useState<string | null>(null);
  
  const [isIndexLoading, setIndexLoading] = useState(true);
  const [isChunksLoading, setChunksLoading] = useState(false);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);

  useEffect(() => {
    const loadIndex = async () => {
      try {
        setIndexLoading(true);
        const indexData = await fetchIndex();
        setIndex(indexData);
      } catch (error) {
        console.error("Failed to load index:", error);
      } finally {
        setIndexLoading(false);
      }
    };
    loadIndex();
  }, []);

  useEffect(() => {
    if (!selectedChapterId) {
        setChunks([]);
        return;
    };

    const loadChunks = async () => {
      try {
        setChunksLoading(true);
        setSelectedChunkId(null); // Reset chunk selection when chapter changes
        const chunksData = await fetchChunks(selectedChapterId);
        setChunks(chunksData);
      } catch (error) {
        console.error("Failed to load chunks:", error);
      } finally {
        setChunksLoading(false);
      }
    };
    loadChunks();
  }, [selectedChapterId]);
  
  const handleChapterSelect = useCallback((chapterId: string) => {
    setSelectedChapterId(chapterId);
    if (window.innerWidth < 768) {
      setIsNavOpen(false); // Close nav on selection on mobile
    }
  }, []);

  const handleChunkSelect = useCallback((chunkId: string) => {
    setSelectedChunkId(chunkId);
  }, []);

  const toggleNavPanel = () => setIsNavOpen(prev => !prev);
  const toggleKnowledgePanel = () => setIsKnowledgeOpen(prev => !prev);

  const closePanels = () => {
    if(isNavOpen) setIsNavOpen(false);
    if(isKnowledgeOpen) setIsKnowledgeOpen(false);
  };

  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-300 flex flex-col overflow-hidden">
      <Header toggleNavPanel={toggleNavPanel} toggleKnowledgePanel={toggleKnowledgePanel} />
      <div className="flex flex-1 overflow-hidden relative">
        {(isNavOpen || isKnowledgeOpen) && <div onClick={closePanels} className="fixed inset-0 bg-black/50 z-10 md:hidden" />}
        
        <KnowledgePanel selectedChunkId={selectedChunkId} isOpen={isKnowledgeOpen}/>
        
        <ReadingPanel
          chunks={chunks}
          selectedChunkId={selectedChunkId}
          onChunkSelect={handleChunkSelect}
          isLoading={isChunksLoading}
          chapterSelected={!!selectedChapterId}
        />
        
        <NavigationPanel 
            index={index} 
            onChapterSelect={handleChapterSelect} 
            isLoading={isIndexLoading}
            isOpen={isNavOpen}
        />
      </div>
    </div>
  );
}

export default Workbench;
