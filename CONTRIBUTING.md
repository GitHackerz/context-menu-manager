# Contributing to Windows Context Menu Manager

First off, thank you for considering contributing to Windows Context Menu Manager! It's people like you that make this tool better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Focus on what is best** for the community
- **Show empathy** towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher ([Download](https://nodejs.org))
- **Rust** 1.91 or higher ([Install via rustup](https://rustup.rs))
- **Git** ([Download](https://git-scm.com))
- **Visual Studio Build Tools** (Windows) OR **GNU toolchain** (see below)

### Toolchain Setup

#### Option 1: MSVC (Recommended for production)

1. Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. Select "Desktop development with C++" workload
3. Restart your terminal

#### Option 2: GNU (Easier setup)

```bash
rustup toolchain install stable-gnu
rustup default stable-gnu
```

## Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/context-menu-manager.git
   cd context-menu-manager
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/GitHackerz/context-menu-manager.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Run the development server**:
   ```bash
   npm run tauri dev
   ```

The app should launch automatically with hot-reload enabled.

## How to Contribute

### Workflow

1. **Create a branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** and test thoroughly

3. **Commit your changes** (see [Commit Messages](#commit-messages))

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** on GitHub

### Types of Contributions

We welcome:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📝 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- ♿ **Accessibility improvements**
- 🌍 **Translations** (future)
- ✅ **Tests**

## Coding Guidelines

### TypeScript/React (Frontend)

- Use **functional components** with hooks
- Use **TypeScript** for type safety
- Follow **React best practices**
- Use **Tailwind CSS** for styling (no inline styles)
- Keep components **small and focused**
- Use **meaningful variable names**

Example:
```tsx
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg transition-colors",
        variant === 'primary' && "bg-blue-600 hover:bg-blue-700"
      )}
    >
      {children}
    </button>
  );
}
```

### Rust (Backend)

- Follow **Rust conventions** (use `rustfmt`)
- Handle **errors properly** (use `Result<T, E>`)
- Add **documentation comments** for public functions
- Keep functions **focused and testable**
- Use **descriptive error messages**

Example:
```rust
/// Retrieves all context menu items for the specified location.
///
/// # Arguments
/// * `location` - The context location ("Files", "Folders", or "Background")
///
/// # Returns
/// A vector of MenuItem structs or an error message
#[tauri::command]
pub fn get_context_menu_items(location: String) -> Result<Vec<MenuItem>, String> {
    let path = get_registry_path(&location).ok_or("Invalid location")?;
    // ... implementation
}
```

### File Organization

- **Components**: One component per file
- **Utilities**: Group related utilities in `lib/`
- **Types**: Define interfaces/types at the top of files
- **Constants**: Use UPPER_CASE for constants

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(ui): add file browser button to command input

Added a Browse button next to the command input field that opens
a native file picker dialog for selecting executables.

Closes #42
```

```bash
fix(registry): handle empty registry keys gracefully

Previously, the app would crash when encountering empty registry
keys. Now it returns an empty array instead.

Fixes #38
```

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add tests** if applicable
3. **Ensure all tests pass**: `npm test` (when available)
4. **Update CHANGELOG.md** with your changes
5. **Request review** from maintainers
6. **Address feedback** promptly

### PR Checklist

- [ ] Code follows the project's coding guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tested on Windows 10/11
- [ ] Screenshots added (for UI changes)

## Reporting Bugs

### Before Submitting

1. **Check existing issues** to avoid duplicates
2. **Test with the latest version**
3. **Gather information** about your environment

### Bug Report Template

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**:
  - OS version (e.g., Windows 11 22H2)
  - App version
  - Rust toolchain (MSVC or GNU)
- **Screenshots**: If applicable
- **Logs**: Error messages or console output

## Suggesting Features

We love feature suggestions! Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- **Problem**: What problem does this solve?
- **Solution**: Your proposed solution
- **Alternatives**: Other solutions you've considered
- **Additional Context**: Mockups, examples, etc.

## Development Tips

### Hot Reload

The app supports hot reload for frontend changes. For backend changes, you'll need to restart the dev server.

### Debugging

#### Frontend (React)
- Open DevTools in the app: `Ctrl+Shift+I`
- Use `console.log()` for debugging
- React DevTools extension works!

#### Backend (Rust)
- Use `println!()` or `dbg!()` for debugging
- Check terminal output where you ran `npm run tauri dev`
- Use `cargo test` for unit tests

### Testing Registry Changes

⚠️ **Important**: Always test registry changes carefully!

1. Create a test item with a harmless command (e.g., `notepad.exe`)
2. Verify it appears in Windows Explorer
3. Test the command works correctly
4. Remove the test item
5. Verify it's removed from Explorer

### Building for Production

```bash
# Clean build
cargo clean
npm run tauri build

# Output location
src-tauri/target/release/context-menu-manager.exe
```

## Questions?

- **General questions**: [GitHub Discussions](https://github.com/GitHackerz/context-menu-manager/discussions)
- **Bug reports**: [GitHub Issues](https://github.com/GitHackerz/context-menu-manager/issues)
- **Security issues**: Email maintainers directly (see README)

---

Thank you for contributing! 🎉
