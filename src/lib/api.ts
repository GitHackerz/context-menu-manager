import { invoke } from '@tauri-apps/api/core';

// Debug logging
console.log('=== Tauri API Debug ===');
// Check for Tauri v2 internals or v1 global
const isTauri = () => !!(window as any).__TAURI_INTERNALS__ || !!(window as any).__TAURI__;
console.log('isTauri:', isTauri());
console.log('invoke function:', invoke);
console.log('typeof invoke:', typeof invoke);
console.log('======================');

export interface MenuItem {
  name: string;
  command: string;
  icon: string | null;
  location: string;
  registry_path: string;
}

const MOCK_ITEMS: Record<string, MenuItem[]> = {
  Files: [
    {
      name: 'Open with Notepad',
      command: 'notepad.exe "%1"',
      icon: 'notepad.exe,0',
      location: 'Files',
      registry_path: 'HKCU\\Software\\Classes\\*\\shell\\Open with Notepad',
    },
    {
      name: 'Copy Path',
      command: 'cmd /c echo "%1" | clip',
      icon: null,
      location: 'Files',
      registry_path: 'HKCU\\Software\\Classes\\*\\shell\\Copy Path',
    },
  ],
  Folders: [
    {
      name: 'Open CMD Here',
      command: 'cmd /k cd /d "%1"',
      icon: 'cmd.exe,0',
      location: 'Folders',
      registry_path: 'HKCU\\Software\\Classes\\Directory\\shell\\Open CMD Here',
    },
  ],
  Background: [],
};


export const api = {
  getItems: async (location: string): Promise<MenuItem[]> => {
    try {
      const result = await invoke<MenuItem[]>('get_context_menu_items', { location });
      console.log('Successfully loaded items from registry:', result);
      return result;
    } catch (error) {
      if (isTauri()) {
        console.error('Tauri invoke failed:', error);
        throw error;
      }
      console.log('Running in browser mode, returning mock items. Error:', error);
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_ITEMS[location] || []), 500);
      });
    }
  },

  addItem: async (location: string, name: string, command: string, icon: string | null) => {
    try {
      await invoke('add_context_menu_item', { location, name, command, icon });
      console.log('Successfully added item via Tauri');
    } catch (error) {
      if (isTauri()) {
        console.error('Tauri invoke failed:', error);
        throw error;
      }
      console.log('Running in browser mode, adding mock item. Error:', error);
      if (!MOCK_ITEMS[location]) MOCK_ITEMS[location] = [];
      MOCK_ITEMS[location].push({
        name,
        command,
        icon,
        location,
        registry_path: `MOCK\\${name}`,
      });
    }
  },

  removeItem: async (location: string, name: string) => {
    try {
      await invoke('remove_context_menu_item', { location, name });
      console.log('Successfully removed item via Tauri');
    } catch (error) {
      if (isTauri()) {
        console.error('Tauri invoke failed:', error);
        throw error;
      }
      console.log('Running in browser mode, removing mock item. Error:', error);
      if (MOCK_ITEMS[location]) {
        MOCK_ITEMS[location] = MOCK_ITEMS[location].filter((i) => i.name !== name);
      }
    }
  },
};
