#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all JS files that use makeStyles but don't import it
function addMakeStylesImports() {
  const files = glob.sync('src/**/*.js');
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check if file uses makeStyles but doesn't import it
    if (content.includes('makeStyles') && !content.includes('import { makeStyles }')) {
      console.log(`Adding makeStyles import to: ${file}`);
      
      // Find the last MUI import line
      const lines = content.split('\n');
      let insertIndex = -1;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('@mui/material') || lines[i].includes('@mui/icons-material')) {
          insertIndex = i + 1;
        }
      }
      
      if (insertIndex > -1) {
        lines.splice(insertIndex, 0, "import { makeStyles } from '@mui/styles';");
        fs.writeFileSync(file, lines.join('\n'));
      }
    }
  });
}

console.log('Adding missing makeStyles imports...');
addMakeStylesImports();
console.log('Done! You may need to install @mui/styles: npm install @mui/styles');