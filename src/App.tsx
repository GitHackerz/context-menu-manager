import { useState, useEffect } from 'react';
import { api } from './lib/api';
import { Sidebar } from './components/Sidebar';
import { MenuItemList, MenuItem } from './components/MenuItemList';
import { EditorModal } from './components/EditorModal';
import { Plus, RefreshCw } from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Files');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const result = await api.getItems(activeTab);
      setItems(result);
    } catch (error) {
      console.error('Failed to load items:', error);
      // Don't alert in browser mode if it's just a connection error
      if (error instanceof Error && !error.message.includes('fetch')) {
        alert(`Error: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddItem = async (name: string, command: string, icon: string) => {
    try {
      await api.addItem(activeTab, name, command, icon || null);
      await loadItems();
    } catch (error) {
      console.error('Failed to add item:', error);
      alert(`Error: ${error}`);
    }
  };

  const handleDeleteItem = async (item: MenuItem) => {
    if (!confirm(`Are you sure you want to remove "${item.name}"?`)) return;

    try {
      await api.removeItem(activeTab, item.name);
      await loadItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className='flex h-screen bg-zinc-950 text-white'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='flex-1 flex flex-col'>
        <header className='border-b border-zinc-800 p-6 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>{activeTab} Context Menu</h2>
            <p className='text-sm text-zinc-500 mt-1'>
              Manage right-click menu items for {activeTab.toLowerCase()}
            </p>
          </div>

          <div className='flex gap-3'>
            <button
              onClick={loadItems}
              disabled={isLoading}
              className='px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50'
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20'
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>
        </header>

        <main className='flex-1 overflow-y-auto p-6'>
          {isLoading ? (
            <div className='flex items-center justify-center h-64'>
              <RefreshCw size={32} className='animate-spin text-blue-500' />
            </div>
          ) : (
            <MenuItemList items={items} onDelete={handleDeleteItem} />
          )}
        </main>
      </div>

      <EditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddItem}
        location={activeTab}
      />
    </div>
  );
}

export default App;
