#!/usr/bin/env node
// **Version:** 0.2.0
/**
 * IDPF Framework Installer
 * Unified cross-platform installer for Windows, macOS, and Linux
 *
 * Usage: node install.js
 *
 * This file is a backward-compatible wrapper.
 * The actual implementation is in install/index.js
 */

// Delegate to the modular installer
require('./install/index.js');
