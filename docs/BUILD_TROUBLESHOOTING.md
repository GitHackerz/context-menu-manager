# Build Troubleshooting

This guide helps you resolve common build issues when compiling the Windows Context Menu Manager from source.

## Common Issues

### Issue 1: Linker Error - `link.exe` failed

**Error Message:**
```
error: linking with `link.exe` failed: exit code: 1
= note: link: extra operand '...'
```

**Cause:** Git's `link.exe` is being found instead of MSVC's linker.

**Solution:** Switch to GNU toolchain:

```bash
rustup toolchain install stable-gnu
rustup default stable-gnu
cargo clean
npm run tauri dev
```

### Issue 2: MSVC Not Found

**Error Message:**
```
error: linker `link.exe` not found
note: in the Visual Studio installer, ensure the "C++ build tools" workload is selected
```

**Cause:** Visual Studio C++ Build Tools not installed.

**Solution:** Install MSVC Build Tools:

1. Download from https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. Run installer
3. Select "Desktop development with C++" workload
4. Install (requires ~6GB)
5. Restart terminal
6. Run `npm run tauri dev`

### Issue 3: Tailwind CSS Plugin Error

**Error Message:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin
```

**Solution:**

```bash
npm uninstall tailwindcss
npm install -D @tailwindcss/postcss
```

Then update `postcss.config.js`:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Issue 4: Cargo Build Fails

**Error Message:**
```
error: could not compile `<package>` due to previous error
```

**Solution:**

1. Clean the build:
   ```bash
   cargo clean
   ```

2. Update Rust:
   ```bash
   rustup update
   ```

3. Rebuild:
   ```bash
   npm run tauri dev
   ```

### Issue 5: Node Modules Issues

**Error Message:**
```
Cannot find module '...'
```

**Solution:**

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Verifying Your Setup

### Check Rust Installation

```bash
rustc --version
# Should show: rustc 1.91.x or higher

cargo --version
# Should show: cargo 1.91.x or higher

rustup show
# Should show active toolchain
```

### Check Node.js Installation

```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 9.x.x or higher
```

### Check Toolchain

```bash
rustup show
# Should show either:
# - stable-x86_64-pc-windows-msvc (if using MSVC)
# - stable-x86_64-pc-windows-gnu (if using GNU)
```

## Platform-Specific Notes

### Windows 10/11

- **Recommended**: Use GNU toolchain for easier setup
- **Production**: Use MSVC toolchain for better compatibility

### WSL (Windows Subsystem for Linux)

Not recommended for this project as it targets Windows-specific APIs (Registry).

## Getting Help

If you're still experiencing issues:

1. Check [existing issues](https://github.com/GitHackerz/context-menu-manager/issues)
2. Search [GitHub Discussions](https://github.com/GitHackerz/context-menu-manager/discussions)
3. Create a new issue with:
   - Full error message
   - Output of `rustup show`
   - Output of `node --version`
   - Your OS version

## Clean Build

If all else fails, try a completely clean build:

```bash
# Clean Rust build
cd src-tauri
cargo clean
cd ..

# Clean Node modules
rm -rf node_modules package-lock.json

# Reinstall everything
npm install

# Try building again
npm run tauri dev
```
