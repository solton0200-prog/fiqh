import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAdminAtoms, updateAdminAtom, deleteAdminAtom } from '../../services/api';
import { KnowledgeAtom } from '../../types';
import DataTable from '../../components/admin/DataTable';
import Spinner from '../../components/Spinner';
import AtomFormModal from '../../components/admin/AtomFormModal';

const ManageAtoms: React.FC = () => {
  const [atoms, setAtoms] = useState<KnowledgeAtom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingAtom, setEditingAtom] = useState<KnowledgeAtom | null>(null);
  const [filters, setFilters] = useState({ chunk_id: '', atom_type: '', book_title: '' });

  const loadAtoms = useCallback(async () => {
    setIsLoading(true);
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== '')
      );
      const data = await fetchAdminAtoms(activeFilters);
      setAtoms(data);
    } catch (error) {
      console.error('Failed to fetch atoms:', error);
      alert('فشل في جلب البيانات.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const handler = setTimeout(() => {
        loadAtoms();
    }, 500); // Debounce API calls
    return () => clearTimeout(handler);
  }, [filters, loadAtoms]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {name, value} = e.target;
      setFilters(prev => ({...prev, [name]: value}));
  }

  const handleEdit = (atom: KnowledgeAtom) => {
    setEditingAtom(atom);
  };

  const handleSave = async (updatedAtom: KnowledgeAtom) => {
    await updateAdminAtom(updatedAtom.atom_id, updatedAtom);
    alert('تم تحديث الذرة المعرفية بنجاح.');
    loadAtoms();
  };
  
  const handleDelete = async (atom: KnowledgeAtom) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف الذرة: ${atom.atom_id}؟`)) {
      try {
        await deleteAdminAtom(atom.atom_id);
        alert('تم حذف الذرة بنجاح.');
        loadAtoms();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('فشل في حذف الذرة.');
      }
    }
  };
  
  const columns = useMemo(() => [
      { header: 'المعرف', accessor: (row: KnowledgeAtom) => <span className="font-mono text-cyan-400">{row.atom_id}</span> },
      { header: 'معرف المقطع', accessor: (row: KnowledgeAtom) => <span className="font-mono text-gray-400">{row.chunk_id}</span> },
      { header: 'النوع', accessor: (row: KnowledgeAtom) => <span className="bg-purple-600/50 text-purple-300 text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full">{row.atom_type}</span> },
      { header: 'المصدر', accessor: (row: KnowledgeAtom) => row.source.book_title },
      { header: 'الملخص', accessor: (row: KnowledgeAtom) => <p className="truncate max-w-xs">{row.summary_ar}</p> },
  ], []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">إدارة الذرات المعرفية</h1>
      
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6 flex gap-4 items-center">
        <input 
            type="text"
            name="chunk_id"
            value={filters.chunk_id}
            onChange={handleFilterChange}
            placeholder="فلترة حسب معرف المقطع..."
            className="bg-slate-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input 
            type="text"
            name="book_title"
            value={filters.book_title}
            onChange={handleFilterChange}
            placeholder="فلترة حسب المصدر..."
            className="bg-slate-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <select
            name="atom_type"
            value={filters.atom_type}
            onChange={handleFilterChange}
            className="bg-slate-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
            <option value="">كل الأنواع</option>
            <option value="Sharh">Sharh</option>
            <option value="Dalil">Dalil</option>
            <option value="Naqd">Naqd</option>
            <option value="Muqaranah">Muqaranah</option>
        </select>
      </div>

      {isLoading ? <Spinner /> : (
          <DataTable
            columns={columns}
            data={atoms}
            uniqueKeyAccessor={(row) => row.atom_id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
      )}

      <AtomFormModal 
        atom={editingAtom}
        isOpen={!!editingAtom}
        onClose={() => setEditingAtom(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default ManageAtoms;
