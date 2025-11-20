import { File, Folder, Monitor } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: 'Files', label: 'Files', icon: File },
    { id: 'Folders', label: 'Folders', icon: Folder },
    { id: 'Background', label: 'Background', icon: Monitor },
  ];

  return (
    <div className='w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col gap-2 h-full'>
      <h1 className='text-xl font-bold text-white mb-6 px-2'>Context Manager</h1>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium',
            activeTab === tab.id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
          )}
        >
          <tab.icon size={18} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
