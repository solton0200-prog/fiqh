import React, { useState, useCallback } from 'react';
import { FaUpload, FaFileCode } from 'react-icons/fa';

interface FileUploadProps {
  onFileRead: (content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileRead }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileRead(content);
        setFileName(file.name);
      };
      reader.readAsText(file);
    } else {
      alert('الرجاء اختيار ملف JSON فقط.');
    }
  }, [onFileRead]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${isDragging ? 'border-cyan-400 bg-slate-700/50' : 'border-slate-600 hover:border-cyan-500'}`}
    >
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={onFileChange}
        accept=".json"
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        <FaUpload className="text-4xl text-slate-400 mb-3" />
        <p className="text-slate-300">اسحب وأفلت ملف JSON هنا، أو انقر للاختيار</p>
        <p className="text-xs text-slate-500 mt-1">يجب أن يكون الملف بصيغة JSON</p>
        {fileName && (
            <div className="mt-4 bg-green-900/50 border border-green-700 text-green-300 text-sm rounded-md px-4 py-2 flex items-center gap-2">
                <FaFileCode />
                <span>{fileName}</span>
            </div>
        )}
      </label>
    </div>
  );
};

export default FileUpload;
