import { Trash2, Terminal, Image as ImageIcon } from "lucide-react";

export interface MenuItem {
  name: string;
  command: string;
  icon?: string | null;
  location: string;
  registry_path: string;
}

interface MenuItemListProps {
  items: MenuItem[];
  onDelete: (item: MenuItem) => void;
}

export function MenuItemList({ items, onDelete }: MenuItemListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
        <p>No custom items found for this location.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item) => (
        <div
          key={item.name}
          className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 flex items-center justify-between hover:border-zinc-600 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
              {item.icon ? <ImageIcon size={20} /> : <Terminal size={20} />}
            </div>
            <div>
              <h3 className="font-medium text-white">{item.name}</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1 truncate max-w-md">
                {item.command}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onDelete(item)}
            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            title="Remove Item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
