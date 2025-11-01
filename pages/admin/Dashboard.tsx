import React from 'react';
import { FaCubes, FaAtom, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">لوحة التحكم الرئيسية</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <FaTools className="text-4xl text-cyan-400 mb-4"/>
          <h2 className="text-xl font-bold text-white mb-2">مرحباً بك</h2>
          <p className="text-slate-400">هذه هي لوحة التحكم الخاصة بورشة فقه دانش. يمكنك من هنا إدارة محتوى التطبيق.</p>
        </div>

        <Link to="/admin/chunks" className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
          <FaCubes className="text-4xl text-cyan-400 mb-4"/>
          <h2 className="text-xl font-bold text-white mb-2">إدارة المقاطع النصية</h2>
          <p className="text-slate-400">إضافة، تعديل، وحذف المقاطع النصية الأساسية من كتاب الروضة.</p>
        </Link>
        
        <Link to="/admin/atoms" className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
          <FaAtom className="text-4xl text-cyan-400 mb-4"/>
          <h2 className="text-xl font-bold text-white mb-2">إدارة الذرات المعرفية</h2>
          <p className="text-slate-400">إدارة الشروح، الأدلة، والآراء المرتبطة بكل مقطع نصي.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
