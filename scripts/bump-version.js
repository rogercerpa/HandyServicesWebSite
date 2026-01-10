#!/usr/bin/env node

/**
 * Auto-increment PATCH version in package.json
 * Runs as a pre-commit hook to bump version on every commit
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagePath = path.join(__dirname, '..', 'package.json');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Parse current version
const [major, minor, patch] = packageJson.version.split('.').map(Number);

// Increment patch version
const newVersion = `${major}.${minor}.${patch + 1}`;

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

// Stage the updated package.json
execSync('git add package.json', { cwd: path.join(__dirname, '..') });

console.log(`Version bumped: ${major}.${minor}.${patch} → ${newVersion}`);

