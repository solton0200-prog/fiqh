import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaBook, FaTachometerAlt, FaCubes, FaAtom, FaSignOutAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const baseLinkClasses = 'flex items-center p-3 my-1 rounded-md transition-colors';
  const inactiveLinkClasses = 'text-slate-400 hover:bg-slate-700 hover:text-white';
  const activeLinkClasses = 'bg-cyan-500 text-white font-bold';

  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  return (
    <aside className="w-64 bg-slate-800 p-4 flex flex-col border-s-2 border-slate-700">
      <div className="flex items-center gap-3 p-3 mb-6">
        <FaBook className="text-3xl text-cyan-400" />
        <div>
          <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
          <p className="text-xs text-slate-400">ورشة فقه دانش</p>
        </div>
      </div>

      <nav className="flex-grow">
        <NavLink to="/admin" end className={getLinkClass}>
          <FaTachometerAlt className="me-3" />
          <span>الرئيسية</span>
        </NavLink>
        <NavLink to="/admin/chunks" className={getLinkClass}>
          <FaCubes className="me-3" />
          <span>إدارة المقاطع</span>
        </NavLink>
        <NavLink to="/admin/atoms" className={getLinkClass}>
          <FaAtom className="me-3" />
          <span>إدارة الذرات المعرفية</span>
        </NavLink>
      </nav>
      
      <div>
        <button
          onClick={logout}
          className={`${baseLinkClasses} ${inactiveLinkClasses} w-full`}
        >
          <FaSignOutAlt className="me-3" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
