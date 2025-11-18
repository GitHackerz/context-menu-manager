# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the project maintainers. You can find contact information in the [GitHub profile](https://github.com/GitHackerz).

Please include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

We will acknowledge your email within 48 hours and send a more detailed response within 7 days indicating the next steps in handling your report.

## Security Best Practices

When using this application:

1. **User-Scope Only**: The app only modifies `HKEY_CURRENT_USER` registry keys, which are safer than system-wide keys
2. **No Admin Required**: The app doesn't require administrator privileges
3. **Verify Commands**: Always verify the command paths before adding context menu items
4. **Backup Registry**: Consider backing up your registry before making extensive changes
5. **Source Verification**: Only download releases from the official GitHub repository

## Known Security Considerations

- **Registry Modifications**: This app modifies the Windows Registry. While it targets user-scope keys only, always be cautious when adding custom commands
- **Command Execution**: Context menu items execute commands with your user privileges. Only add commands from trusted sources
- **Path Validation**: The app does not validate executable paths. Ensure you're pointing to legitimate executables

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions as soon as possible

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request.
