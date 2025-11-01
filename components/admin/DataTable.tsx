import React, { useState } from 'react';
import { FaTrash, FaPencilAlt, FaAngleRight, FaAngleLeft } from 'react-icons/fa';

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  uniqueKeyAccessor: (row: T) => string | number;
}

const DataTable = <T,>({ columns, data, onEdit, onDelete, uniqueKeyAccessor }: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3">{col.header}</th>
              ))}
              {(onEdit || onDelete) && <th scope="col" className="px-6 py-3">إجراءات</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={uniqueKeyAccessor(row)} className="border-b border-slate-700 hover:bg-slate-700/30">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4">{col.accessor(row)}</td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      {onEdit && <button onClick={() => onEdit(row)} className="text-blue-400 hover:text-blue-300"><FaPencilAlt /></button>}
                      {onDelete && <button onClick={() => onDelete(row)} className="text-red-400 hover:text-red-300"><FaTrash /></button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
             {paginatedData.length === 0 && (
                <tr>
                    <td colSpan={columns.length + 1} className="text-center py-8 text-slate-500">
                        لا توجد بيانات لعرضها.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-slate-700/50">
          <span className="text-sm text-slate-400">
            صفحة {currentPage} من {totalPages}
          </span>
          <div className="flex gap-2">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 rounded-md bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed">
              <FaAngleRight />
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 rounded-md bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed">
              <FaAngleLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
