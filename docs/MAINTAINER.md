# Maintainer Guide

This guide is for maintainers of the VidNavigator MCP Server project.

## Project Structure

```
vidnavigator-mcp-starter/
├── 📁 cursor/                    # Cursor-specific files
│   ├── vidnavigator.agent        # Preconfigured agent
│   ├── settings.json.example     # MCP server configuration example
│   └── README.md                 # Cursor setup guide
│
├── 📁 claude-desktop/            # Claude Desktop extension
│   ├── server/                   # MCP server implementation
│   │   └── index.js             # Main server file
│   ├── dist/                    # Build output (generated)
│   │   └── vidnavigator.dxt     # Built extension file
│   ├── manifest.json            # Extension manifest
│   ├── build.js                 # Build script
│   ├── package.json             # Dependencies
│   └── README.md                # Claude Desktop setup guide
│
├── 📁 releases/                  # Pre-built releases (generated)
├── 📁 docs/                     # Documentation
├── 📁 .github/workflows/        # GitHub Actions
│   └── release.yml              # Automated release workflow
├── build.js                     # Root build script
├── package.json                 # Root package.json
└── README.md                    # Main project documentation
```

## Development Workflow

### Setting Up Development Environment

```bash
# Clone the repository
git clone https://github.com/vidnavigator/vidnavigator-mcp-starter.git
cd vidnavigator-mcp-starter

# Install dependencies for Claude Desktop extension
cd claude-desktop
npm install
cd ..
```

### Building Extensions

#### Build Claude Desktop Extension
```bash
# From root directory
npm run build:claude

# Or from claude-desktop directory
cd claude-desktop
npm run build
```

This creates `claude-desktop/dist/vidnavigator.dxt`.

#### Build All Platforms
```bash
# From root directory
npm run build
```

This builds the Claude Desktop extension and copies it to `releases/vidnavigator.dxt`.

### Testing

#### Testing Claude Desktop Extension
1. Build the extension: `npm run build:claude`
2. Open Claude Desktop
3. Go to Settings → Extensions
4. Install from file: `claude-desktop/dist/vidnavigator.dxt`
5. Configure with your API key
6. Test functionality

#### Testing Cursor Setup
1. Follow the instructions in `cursor/README.md`
2. Use the example configuration from `cursor/settings.json.example`
3. Test with the preconfigured agent in `cursor/vidnavigator.agent`

## Release Process

### Automated Releases (Recommended)

1. **Update Version Numbers**:
   ```bash
   # Update version in claude-desktop/package.json
   cd claude-desktop
   npm version patch  # or minor/major
   cd ..
   
   # Update version in claude-desktop/manifest.json
   # Update version in root package.json
   ```

2. **Create and Push Tag**:
   ```bash
   git add .
   git commit -m "Release v0.1.0"
   git tag v0.1.0
   git push origin main --tags
   ```

3. **GitHub Actions** will automatically:
   - Build the Claude Desktop extension
   - Create a GitHub release
   - Upload the `.dxt` file as a release asset

### Manual Releases

1. **Build the extension**:
   ```bash
   npm run build
   ```

2. **Create GitHub Release**:
   - Go to GitHub → Releases → New Release
   - Tag: `v1.0.1`
   - Title: `Release v1.0.1`
   - Upload `releases/vidnavigator.dxt`

## Updating Documentation

### When to Update Documentation

- **API Changes**: Update tool descriptions in both READMEs
- **Installation Changes**: Update setup instructions
- **New Features**: Add to feature lists and examples
- **Breaking Changes**: Update troubleshooting sections

### Files to Update

1. **Main README.md**: Overview and quick start for both platforms
2. **cursor/README.md**: Cursor-specific setup and usage
3. **claude-desktop/README.md**: Claude Desktop-specific setup and usage
4. **claude-desktop/manifest.json**: Extension metadata and tool descriptions

## Common Maintenance Tasks

### Adding New Tools

1. **Add the tool to the hosted server** (`backend/protocols/mcp_server.py` in the backend repository). The Claude Desktop extension relays `tools/list` and `tools/call` to it, so it picks the tool up with no code change or new release.
2. **Update Manifest** (`claude-desktop/manifest.json`): add the tool to the `tools` array. It is only the list shown on the extension's install page.
3. **Update Documentation**:
   - Add to tool lists in READMEs
   - Add usage examples
   - Update feature descriptions

### Version Bumps

1. **Claude Desktop**: `claude-desktop/package.json` and `claude-desktop/manifest.json`
2. **Root**: `package.json`
3. **GitHub Actions**: Automatically uses package.json version

### Dependency Updates

```bash
# Update Claude Desktop dependencies
cd claude-desktop
npm update
npm audit fix

# Test builds after updates
npm run build
```

## Troubleshooting

### Build Issues

- **Node Version**: Ensure Node.js >= 18.0.0
- **Dependencies**: Run `npm ci` in claude-desktop directory
- **Permissions**: Ensure write permissions to dist/ directory

### Release Issues

- **GitHub Actions**: Check workflow logs for build errors
- **Permissions**: Ensure GITHUB_TOKEN has release permissions
- **Tags**: Ensure tags follow `v*` pattern (e.g., `v0.1.0`)

### Extension Issues

- **Manifest Validation**: Check required fields in manifest.json
- **Server Startup**: Test server locally with `node claude-desktop/server/index.js`
- **API Integration**: Verify API endpoints and authentication

## Best Practices

1. **Version Synchronization**: Keep versions in sync across package.json and manifest.json
2. **Testing**: Always test extensions before releases
3. **Documentation**: Update docs with every feature change
4. **Backward Compatibility**: Maintain compatibility when possible
5. **Security**: Never commit API keys or sensitive data

## Support Channels

- **Issues**: [GitHub Issues](https://github.com/vidnavigator/vidnavigator-mcp-starter/issues)
- **API Support**: support@vidnavigator.com
- **Documentation**: [docs.vidnavigator.com](https://docs.vidnavigator.com)