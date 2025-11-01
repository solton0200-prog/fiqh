import React from 'react';
import { FaSpinner } from './icons';

const Spinner: React.FC<{ size?: string; text?: string }> = ({ size = '2rem', text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-slate-500 p-8">
      <FaSpinner className="animate-spin" style={{ fontSize: size }} />
      {text && <p className="mt-4 text-lg">{text}</p>}
    </div>
  );
};

export default Spinner;
