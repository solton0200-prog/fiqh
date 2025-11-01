import React, { useState, useEffect, useCallback } from 'react';
import { fetchAdminChunks, uploadAdminChunks, deleteAdminChunk } from '../../services/api';
import { RawdaChunk } from '../../types';
import FileUpload from '../../components/admin/FileUpload';
import DataTable from '../../components/admin/DataTable';
import Spinner from '../../components/Spinner';
import { FaSpinner } from '../../components/icons';

const ManageChunks: React.FC = () => {
  const [chunks, setChunks] = useState<RawdaChunk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const loadChunks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdminChunks();
      setChunks(data);
    } catch (error) {
      console.error('Failed to fetch chunks:', error);
      alert('فشل في جلب البيانات.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChunks();
  }, [loadChunks]);

  const handleFileUpload = (content: string) => {
    setFileContent(content);
  };

  const handleProcessUpload = async () => {
    if (!fileContent) {
      alert('الرجاء اختيار ملف أولاً.');
      return;
    }
    try {
      const newChunks = JSON.parse(fileContent);
      if (!Array.isArray(newChunks)) throw new Error('JSON is not an array');
      
      setIsUploading(true);
      await uploadAdminChunks(newChunks);
      alert('تم رفع ومعالجة الملف بنجاح!');
      setFileContent(null); // Reset after upload
      // FIX: The left-hand side of an assignment expression may not be an optional property access.
      const fileInput = document.querySelector<HTMLInputElement>('#file-upload');
      if (fileInput) {
        fileInput.value = ''; // Reset file input UI
      }
      loadChunks();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('فشل في رفع الملف. تأكد من أن الملف بصيغة JSON صحيحة وأنه يحتوي على مصفوفة من المقاطع.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (chunk: RawdaChunk) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف المقطع: ${chunk.chunk_id}؟`)) {
      try {
        await deleteAdminChunk(chunk.chunk_id);
        alert('تم حذف المقطع بنجاح.');
        loadChunks();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('فشل في حذف المقطع.');
      }
    }
  };
  
  const columns = [
      { header: 'المعرف', accessor: (row: RawdaChunk) => <span className="font-mono text-cyan-400">{row.chunk_id}</span> },
      { header: 'الموضوع', accessor: (row: RawdaChunk) => row.subject_ar },
      { header: 'المستوى', accessor: (row: RawdaChunk) => row.hierarchical_level },
      { header: 'النص', accessor: (row: RawdaChunk) => <p className="truncate max-w-sm">{row.text}</p> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">إدارة المقاطع النصية</h1>
      
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
        <h2 className="text-xl font-semibold mb-4">رفع مجمع للمقاطع (rozeh.json)</h2>
        <FileUpload onFileRead={handleFileUpload} />
        {fileContent && (
          <button 
            onClick={handleProcessUpload}
            disabled={isUploading}
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
          >
            {isUploading && <FaSpinner className="animate-spin -ms-1 me-3" />}
            <span>رفع ومعالجة الملف</span>
          </button>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">المقاطع الحالية</h2>
      {isLoading ? <Spinner /> : (
          <DataTable
            columns={columns}
            data={chunks}
            uniqueKeyAccessor={(row) => row.chunk_id}
            onDelete={handleDelete}
          />
      )}
    </div>
  );
};

export default ManageChunks;