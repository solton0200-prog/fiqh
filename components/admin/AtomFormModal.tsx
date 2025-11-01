import React, { useState, useEffect } from 'react';
import { KnowledgeAtom } from '../../types';
import Modal from '../Modal';
import { FaSpinner } from '../icons';

interface AtomFormModalProps {
  atom: KnowledgeAtom | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAtom: KnowledgeAtom) => Promise<void>;
}

const AtomFormModal: React.FC<AtomFormModalProps> = ({ atom, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<KnowledgeAtom>>({});
  const [structuredContentStr, setStructuredContentStr] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (atom) {
      setFormData(atom);
      setStructuredContentStr(JSON.stringify(atom.structured_content, null, 2));
    }
  }, [atom]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, source: { ...prev.source, [name]: value } }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!atom) return;

    try {
      const structured_content = JSON.parse(structuredContentStr);
      setIsSaving(true);
      await onSave({ ...formData, structured_content } as KnowledgeAtom);
      onClose();
    } catch (error) {
        if (error instanceof SyntaxError) {
            alert('خطأ في صيغة JSON في حقل المحتوى المنظم. الرجاء التصحيح والمحاولة مرة أخرى.');
        } else {
            console.error('Failed to save atom:', error);
            alert('فشل في حفظ الذرة المعرفية.');
        }
    } finally {
        setIsSaving(false);
    }
  };

  if (!isOpen || !atom) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`تعديل الذرة المعرفية: ${atom.atom_id}`}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
          <div>
            <label className="block text-sm font-bold mb-2">المعرف (Chunk ID)</label>
            <input type="text" name="chunk_id" value={formData.chunk_id || ''} onChange={handleChange} className="w-full bg-slate-700 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">نوع الذرة</label>
            <select name="atom_type" value={formData.atom_type || ''} onChange={handleChange} className="w-full bg-slate-700 rounded-md p-2">
                <option value="Sharh">Sharh</option>
                <option value="Dalil">Dalil</option>
                <option value="Naqd">Naqd</option>
                <option value="Muqaranah">Muqaranah</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">الملخص العربي</label>
            <textarea name="summary_ar" value={formData.summary_ar || ''} onChange={handleChange} rows={3} className="w-full bg-slate-700 rounded-md p-2" />
          </div>
           <div>
            <label className="block text-sm font-bold mb-2">عنوان الكتاب المصدر</label>
            <input type="text" name="book_title" value={formData.source?.book_title || ''} onChange={handleSourceChange} className="w-full bg-slate-700 rounded-md p-2" />
          </div>
           <div>
            <label className="block text-sm font-bold mb-2">المؤلف</label>
            <input type="text" name="author" value={formData.source?.author || ''} onChange={handleSourceChange} className="w-full bg-slate-700 rounded-md p-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">المحتوى المنظم (JSON)</label>
            <textarea 
                dir="ltr"
                value={structuredContentStr} 
                onChange={(e) => setStructuredContentStr(e.target.value)} 
                rows={8} 
                className="w-full bg-slate-900 text-cyan-300 font-mono rounded-md p-2" 
                placeholder='{ "key": "value" }'
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md">
            إلغاء
          </button>
          <button type="submit" disabled={isSaving} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md flex items-center">
            {isSaving && <FaSpinner className="animate-spin -ms-1 me-3" />}
            حفظ التغييرات
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AtomFormModal;
