import { X, Sparkles, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, command: string, icon: string) => void;
  location: string;
}

interface Preset {
  name: string;
  command: string;
  icon: string;
  description: string;
}

const PRESETS: Record<string, Preset[]> = {
  Files: [
    {
      name: 'Open with Notepad',
      command: 'notepad.exe "%1"',
      icon: 'C:\\Windows\\System32\\notepad.exe,0',
      description: 'Open file in Notepad',
    },
    {
      name: 'Copy File Path',
      command: 'cmd /c echo "%1" | clip',
      icon: '',
      description: 'Copy full file path to clipboard',
    },
    {
      name: 'Open with VS Code',
      command:
        '"C:\\Users\\%USERNAME%\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe" "%1"',
      icon: 'C:\\Users\\%USERNAME%\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe,0',
      description: 'Open file in Visual Studio Code',
    },
  ],
  Folders: [
    {
      name: 'Open CMD Here',
      command: 'cmd /k cd /d "%1"',
      icon: 'C:\\Windows\\System32\\cmd.exe,0',
      description: 'Open Command Prompt in this folder',
    },
    {
      name: 'Open PowerShell Here',
      command: 'powershell -noexit -command "Set-Location \'%1\'"',
      icon: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe,0',
      description: 'Open PowerShell in this folder',
    },
    {
      name: 'Copy Folder Path',
      command: 'cmd /c echo "%1" | clip',
      icon: '',
      description: 'Copy full folder path to clipboard',
    },
  ],
  Background: [
    {
      name: 'Open CMD Here',
      command: 'cmd /k cd /d "%V"',
      icon: 'C:\\Windows\\System32\\cmd.exe,0',
      description: 'Open Command Prompt in current directory',
    },
    {
      name: 'Open PowerShell Here',
      command: 'powershell -noexit -command "Set-Location \'%V\'"',
      icon: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe,0',
      description: 'Open PowerShell in current directory',
    },
  ],
};

export function EditorModal({ isOpen, onClose, onSave, location }: EditorModalProps) {
  const [name, setName] = useState('');
  const [command, setCommand] = useState('');
  const [icon, setIcon] = useState('');
  const [showPresets, setShowPresets] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim() || !command.trim()) {
      alert('Name and Command are required!');
      return;
    }
    onSave(name, command, icon);
    setName('');
    setCommand('');
    setIcon('');
    setShowPresets(true);
    onClose();
  };

  const handlePresetClick = (preset: Preset) => {
    setName(preset.name);
    setCommand(preset.command);
    setIcon(preset.icon);
    setShowPresets(false);
  };

  const handleBrowseCommand = async () => {
    try {
      // Check if running in Tauri
      // @ts-expect-error - Tauri internals not typed
      if (!window.__TAURI_INTERNALS__) {
        alert('File picker is only available in the desktop application.');
        return;
      }

      const selected = await open({
        multiple: false,
        directory: false,
        filters: [
          { name: 'Executables', extensions: ['exe', 'bat', 'cmd', 'ps1'] },
          { name: 'All Files', extensions: ['*'] },
        ],
      });

      if (selected && typeof selected === 'string') {
        setCommand(`"${selected}" "%1"`);
        if (!icon && selected.endsWith('.exe')) {
          setIcon(`${selected},0`);
        }
      }
    } catch (error) {
      console.error('Failed to open file dialog:', error);
    }
  };

  const handleBrowseIcon = async () => {
    try {
      // Check if running in Tauri
      // @ts-expect-error - Tauri internals not typed
      if (!window.__TAURI_INTERNALS__) {
        alert('File picker is only available in the desktop application.');
        return;
      }

      const selected = await open({
        multiple: false,
        directory: false,
        filters: [
          { name: 'Icons', extensions: ['exe', 'ico', 'dll'] },
          { name: 'All Files', extensions: ['*'] },
        ],
      });

      if (selected && typeof selected === 'string') {
        setIcon(`${selected},0`);
      }
    } catch (error) {
      console.error('Failed to open file dialog:', error);
    }
  };

  const presets = PRESETS[location] || [];

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-white'>Add Menu Item</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white'
          >
            <X size={20} />
          </button>
        </div>

        {showPresets && presets.length > 0 && (
          <div className='mb-6'>
            <div className='flex items-center gap-2 mb-3'>
              <Sparkles size={16} className='text-blue-400' />
              <h3 className='text-sm font-semibold text-zinc-300'>Quick Presets</h3>
            </div>
            <div className='grid grid-cols-1 gap-2'>
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(preset)}
                  className='text-left p-3 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-blue-500/50 rounded-lg transition-all group'
                >
                  <div className='font-medium text-white group-hover:text-blue-400 transition-colors'>
                    {preset.name}
                  </div>
                  <div className='text-xs text-zinc-500 mt-1'>{preset.description}</div>
                </button>
              ))}
            </div>
            <div className='mt-4 pt-4 border-t border-zinc-800'>
              <button
                onClick={() => setShowPresets(false)}
                className='text-sm text-zinc-400 hover:text-white transition-colors'
              >
                Or create custom item →
              </button>
            </div>
          </div>
        )}

        {(!showPresets || presets.length === 0) && (
          <>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-zinc-400 mb-2'>Item Name *</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='e.g., Open with VS Code'
                  className='w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-zinc-400 mb-2'>Command *</label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder='e.g., "C:\\Program Files\\App\\app.exe" "%1"'
                    className='flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm'
                  />
                  <button
                    onClick={handleBrowseCommand}
                    className='px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap'
                    title='Browse for executable'
                  >
                    <FolderOpen size={16} />
                    Browse
                  </button>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-zinc-400 mb-2'>
                  Icon Path (Optional)
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder='e.g., C:\\Program Files\\App\\app.exe,0'
                    className='flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm'
                  />
                  <button
                    onClick={handleBrowseIcon}
                    className='px-4 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap'
                    title='Browse for icon'
                  >
                    <FolderOpen size={16} />
                    Browse
                  </button>
                </div>
              </div>

              <div className='bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs text-blue-300'>
                <p className='mb-1'>
                  <strong className='text-blue-200'>Tip:</strong> Use{' '}
                  <code className='bg-blue-900/30 px-1 rounded'>%1</code> for{' '}
                  {location === 'Background' ? 'the folder path' : 'selected file/folder path'}
                </p>
                <p className='text-blue-400/70'>
                  {location === 'Background' && 'For background items, use %V instead of %1'}
                </p>
              </div>
            </div>

            <div className='flex gap-3 mt-6'>
              {presets.length > 0 && (
                <button
                  onClick={() => setShowPresets(true)}
                  className='px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium'
                >
                  ← Back to Presets
                </button>
              )}
              <button
                onClick={onClose}
                className='flex-1 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-900/20'
              >
                Add Item
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
