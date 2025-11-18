// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod registry_manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            registry_manager::get_context_menu_items,
            registry_manager::add_context_menu_item,
            registry_manager::remove_context_menu_item
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
