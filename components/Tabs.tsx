import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
  icon?: React.ReactElement;
  count: number;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="border-b border-slate-600">
        <nav className="-mb-px flex gap-x-4" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTabIndex(index)}
              className={`
                flex items-center gap-x-2 shrink-0 border-b-2 px-1 pb-3 text-sm font-medium
                ${
                  index === activeTabIndex
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }
              `}
            >
              {tab.icon}
              {tab.label}
              {tab.count > 0 && 
                <span className={`text-xs rounded-full px-2 py-0.5 ${index === activeTabIndex ? 'bg-cyan-400 text-slate-900' : 'bg-slate-600 text-slate-200'}`}>
                    {tab.count}
                </span>
              }
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {tabs[activeTabIndex] && tabs[activeTabIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
