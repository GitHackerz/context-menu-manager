import { invoke } from "@tauri-apps/api/core";

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
      name: "Open with Notepad",
      command: "notepad.exe \"%1\"",
      icon: "notepad.exe,0",
      location: "Files",
      registry_path: "HKCU\\Software\\Classes\\*\\shell\\Open with Notepad"
    },
    {
      name: "Copy Path",
      command: "cmd /c echo \"%1\" | clip",
      icon: null,
      location: "Files",
      registry_path: "HKCU\\Software\\Classes\\*\\shell\\Copy Path"
    }
  ],
  Folders: [
    {
      name: "Open CMD Here",
      command: "cmd /k cd /d \"%1\"",
      icon: "cmd.exe,0",
      location: "Folders",
      registry_path: "HKCU\\Software\\Classes\\Directory\\shell\\Open CMD Here"
    }
  ],
  Background: []
};

const isTauri = () => {
  // @ts-ignore
  return !!window.__TAURI_INTERNALS__;
};

export const api = {
  getItems: async (location: string): Promise<MenuItem[]> => {
    if (isTauri()) {
      return await invoke<MenuItem[]>("get_context_menu_items", { location });
    }
    console.log("Running in browser mode, returning mock items");
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ITEMS[location] || []), 500);
    });
  },

  addItem: async (location: string, name: string, command: string, icon: string | null) => {
    if (isTauri()) {
      return await invoke("add_context_menu_item", { location, name, command, icon });
    }
    console.log("Running in browser mode, adding mock item");
    if (!MOCK_ITEMS[location]) MOCK_ITEMS[location] = [];
    MOCK_ITEMS[location].push({
      name,
      command,
      icon,
      location,
      registry_path: `MOCK\\${name}`
    });
    return Promise.resolve();
  },

  removeItem: async (location: string, name: string) => {
    if (isTauri()) {
      return await invoke("remove_context_menu_item", { location, name });
    }
    console.log("Running in browser mode, removing mock item");
    if (MOCK_ITEMS[location]) {
      MOCK_ITEMS[location] = MOCK_ITEMS[location].filter(i => i.name !== name);
    }
    return Promise.resolve();
  }
};
