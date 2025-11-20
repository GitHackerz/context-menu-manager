# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 (2025-11-20)


### Features

* add husky for pre-commit hooks and update package dependencies ([412d534](https://github.com/GitHackerz/context-menu-manager/commit/412d5346a90e49bd03430e55d58ceacc6edc6c25))
* **ci:** add automated release pipeline with Conventional Commits ([b59c7c9](https://github.com/GitHackerz/context-menu-manager/commit/b59c7c95eeedcbf8f041c5ecb18ce6f35a84e058))
* implement user interface for managing context menu items, including item listing, an editor modal, and API integration. ([f7c2f76](https://github.com/GitHackerz/context-menu-manager/commit/f7c2f76f129da326690be0da271d11b59740e2fd))
* initial commit - Windows Context Menu Manager v1.0.0 ([dd8f2f8](https://github.com/GitHackerz/context-menu-manager/commit/dd8f2f842836dbb34e2ce8e71f5f1a8829b59b40))
* Initialize React application with core components, API integration, and project configurations. ([893cd96](https://github.com/GitHackerz/context-menu-manager/commit/893cd96cd2936501f1b86a680883e379fe059a03))
* update @tauri-apps/api to v2.9.0 and enhance registry path handling ([b38864f](https://github.com/GitHackerz/context-menu-manager/commit/b38864f5d5bc9c16fa4aa0bd9d326729de178551))


### Bug Fixes

* ci pipeline errors - commit lockfiles and add rust components ([1b26c0b](https://github.com/GitHackerz/context-menu-manager/commit/1b26c0b148fa310918452fe653ce0ebfdd1496b7))

## [Unreleased]

### Added
- Initial release
- Visual context menu editor
- Preset templates for common applications
- File browser for selecting executables
- Support for Files, Folders, and Background contexts
- Auto icon detection from executables
- Modern dark UI with glassmorphism
- User-scope registry modifications (safe, no admin required)

## [1.0.0] - 2025-11-18

### Added
- Initial public release
- Core functionality for managing Windows context menus
- React + Tauri architecture
- Rust backend with winreg integration
- Tailwind CSS styling
- Comprehensive documentation

[Unreleased]: https://github.com/GitHackerz/context-menu-manager/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/GitHackerz/context-menu-manager/releases/tag/v1.0.0
