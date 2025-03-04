#!/usr/bin/env node
const { execSync } = require('child_process');
const { join } = require('path');
const fs = require('fs');

// Colors for console output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Determine if we're running locally or against a remote project
const isLocal = process.argv.includes('--local');
const isReset = process.argv.includes('--reset');

console.log(`${COLORS.cyan}🔄 Supabase Migration Tool${COLORS.reset}`);
console.log(`${COLORS.blue}Mode: ${isLocal ? 'Local' : 'Remote'}${COLORS.reset}`);

try {
  if (isLocal) {
    if (isReset) {
      console.log(`${COLORS.yellow}🔄 Resetting local database...${COLORS.reset}`);
      execSync('supabase db reset', { stdio: 'inherit' });
      console.log(`${COLORS.green}✅ Local database reset successful!${COLORS.reset}`);
    } else {
      console.log(`${COLORS.yellow}🔄 Applying migrations to local database...${COLORS.reset}`);
      execSync('supabase migration up', { stdio: 'inherit' });
      console.log(`${COLORS.green}✅ Local migrations applied successfully!${COLORS.reset}`);
    }
  } else {
    // Check if linked to a Supabase project
    try {
      console.log(`${COLORS.blue}🔍 Checking Supabase project link...${COLORS.reset}`);
      execSync('supabase status', { stdio: 'pipe' });
    } catch (error) {
      console.log(`${COLORS.yellow}⚠️ Not linked to a Supabase project. Linking now...${COLORS.reset}`);
      execSync('supabase link', { stdio: 'inherit' });
    }

    console.log(`${COLORS.yellow}🔄 Pushing migrations to remote database...${COLORS.reset}`);
    execSync('supabase db push', { stdio: 'inherit' });
    console.log(`${COLORS.green}✅ Remote migrations applied successfully!${COLORS.reset}`);
  }
} catch (error) {
  console.error(`${COLORS.red}❌ Migration failed:${COLORS.reset}`, error.message);
  process.exit(1);
}

console.log(`${COLORS.green}🎉 Migration process completed!${COLORS.reset}`);