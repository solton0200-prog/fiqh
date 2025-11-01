import React, { useState, useEffect, useMemo } from 'react';
import { fetchAtoms } from '../services/api';
import { KnowledgeAtom as AtomType } from '../types';
import Spinner from './Spinner';
import Tabs from './Tabs';
import KnowledgeAtom from './KnowledgeAtom';
import { FaBrain, FaExclamationCircle, FaComments, FaBalanceScale, FaLightbulb } from './icons';

interface KnowledgePanelProps {
  selectedChunkId: string | null;
  isOpen: boolean;
}

const KnowledgePanel: React.FC<KnowledgePanelProps> = ({ selectedChunkId, isOpen }) => {
  const [atoms, setAtoms] = useState<AtomType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedChunkId) {
      setAtoms([]);
      return;
    }

    const loadAtoms = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedAtoms = await fetchAtoms(selectedChunkId);
        setAtoms(fetchedAtoms);
      } catch (err) {
        setError("Failed to fetch knowledge atoms.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAtoms();
  }, [selectedChunkId]);

  const categorizedAtoms = useMemo(() => {
    const commentaries = atoms.filter(a => a.atom_type === 'Sharh');
    const evidences = atoms.filter(a => a.atom_type === 'Dalil');
    const critiques = atoms.filter(a => a.atom_type === 'Naqd' || a.atom_type === 'Muqaranah');
    return { commentaries, evidences, critiques };
  }, [atoms]);
  
  const panelClasses = `
    bg-slate-800 text-white transition-all duration-300 ease-in-out
    h-full overflow-y-auto flex flex-col
    md:w-96 md:static md:translate-x-0
    fixed top-0 start-0 z-20 w-80
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  const renderContent = () => {
    if (isLoading) return <Spinner text="تحميل الذرات المعرفية..." />;
    if (error) return <div className="p-4 text-red-400 flex items-center gap-2"><FaExclamationCircle/> {error}</div>;
    if (!selectedChunkId) {
        return <div className="p-8 text-center text-slate-400 flex flex-col items-center"><FaBrain className="text-5xl mb-4"/><p>الرجاء تحديد مقطع نصي لعرض الذرات المعرفية المرتبطة به.</p></div>;
    }
    if (atoms.length === 0) {
        return <div className="p-8 text-center text-slate-400 flex flex-col items-center"><FaExclamationCircle className="text-5xl mb-4"/><p>لا توجد ذرات معرفية مرتبطة بهذا المقطع.</p></div>;
    }

    const tabs = [
        { label: 'شروح', icon: <FaComments />, count: categorizedAtoms.commentaries.length, content: categorizedAtoms.commentaries.map(atom => <KnowledgeAtom key={atom.atom_id} atom={atom} />) },
        { label: 'أدلة', icon: <FaBalanceScale />, count: categorizedAtoms.evidences.length, content: categorizedAtoms.evidences.map(atom => <KnowledgeAtom key={atom.atom_id} atom={atom} />) },
        { label: 'نقد وآراء', icon: <FaLightbulb />, count: categorizedAtoms.critiques.length, content: categorizedAtoms.critiques.map(atom => <KnowledgeAtom key={atom.atom_id} atom={atom} />) },
    ];

    return <Tabs tabs={tabs} />;
  }

  return (
    <aside className={panelClasses}>
      <div className="p-4 border-b border-slate-700 sticky top-0 bg-slate-800">
        <h2 className="text-lg font-bold">اللوحة المعرفية</h2>
      </div>
      <div className="p-4 flex-grow">
        {renderContent()}
      </div>
    </aside>
  );
};

export default KnowledgePanel;
