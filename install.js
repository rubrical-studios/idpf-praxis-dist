#!/usr/bin/env node
/**
 * @framework-script 0.33.2
 * IDPF Framework Installer
 * Unified cross-platform installer for Windows, macOS, and Linux
 *
 * Usage: node install.js
 *
 * This file is a backward-compatible wrapper.
 * The actual implementation is in install/index.js
 */

// Delegate to the modular installer
const { main } = require('./install/index.js');
main();
