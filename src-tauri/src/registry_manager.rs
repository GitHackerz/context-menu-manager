use serde::{Deserialize, Serialize};
use winreg::enums::*;
use winreg::RegKey;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MenuItem {
    pub name: String,
    pub command: String,
    pub icon: Option<String>,
    pub location: String,
    pub registry_path: String,
}

fn get_registry_path(location: &str) -> Option<&'static str> {
    match location {
        "Files" => Some(r"Software\Classes\*\shell"),
        "Folders" => Some(r"Software\Classes\Directory\shell"),
        "Background" => Some(r"Software\Classes\Directory\Background\shell"),
        _ => None,
    }
}

#[tauri::command]
pub fn get_context_menu_items(location: String) -> Result<Vec<MenuItem>, String> {
    let path = get_registry_path(&location).ok_or("Invalid location")?;
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);

    let shell_key = match hkcu.open_subkey(path) {
        Ok(key) => key,
        Err(_) => return Ok(Vec::new()),
    };

    let mut items = Vec::new();

    for name in shell_key.enum_keys().filter_map(|x| x.ok()) {
        if name.is_empty() {
            continue;
        }

        if let Ok(item_key) = shell_key.open_subkey(&name) {
            let icon: Option<String> = item_key.get_value("Icon").ok();

            let command = if let Ok(command_key) = item_key.open_subkey("command") {
                command_key.get_value("").unwrap_or_default()
            } else {
                String::new()
            };

            items.push(MenuItem {
                name: name.clone(),
                command,
                icon,
                location: location.clone(),
                registry_path: format!("{}\\{}", path, name),
            });
        }
    }

    Ok(items)
}

#[tauri::command]
pub fn add_context_menu_item(
    location: String,
    name: String,
    command: String,
    icon: Option<String>,
) -> Result<(), String> {
    let base_path = get_registry_path(&location).ok_or("Invalid location")?;
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);

    let (shell_key, _) = hkcu.create_subkey(base_path).map_err(|e| e.to_string())?;
    let (item_key, _) = shell_key.create_subkey(&name).map_err(|e| e.to_string())?;

    if let Some(icon_path) = icon {
        if !icon_path.is_empty() {
            item_key
                .set_value("Icon", &icon_path)
                .map_err(|e| e.to_string())?;
        }
    }

    let (command_key, _) = item_key
        .create_subkey("command")
        .map_err(|e| e.to_string())?;
    command_key
        .set_value("", &command)
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn remove_context_menu_item(location: String, name: String) -> Result<(), String> {
    let base_path = get_registry_path(&location).ok_or("Invalid location")?;
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);

    let shell_key = hkcu
        .open_subkey_with_flags(base_path, KEY_ALL_ACCESS)
        .map_err(|e| e.to_string())?;
    shell_key
        .delete_subkey_all(&name)
        .map_err(|e| e.to_string())?;

    Ok(())
}
