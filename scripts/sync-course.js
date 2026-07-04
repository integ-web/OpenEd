const fs = require('fs');
const path = require('path');

const srcDir = `C:\\Users\\Madhvi Gupta\\Downloads\\Design System for Frontier Model Evaluation (6)\\src\\app\\components\\course`;
const destDir = `C:\\Users\\Madhvi Gupta\\Documents\\OpenEd\\src\\features\\course`;

function getFiles(dir, relativeTo = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, relativeTo));
    } else {
      results.push(path.relative(relativeTo, filePath));
    }
  });
  return results;
}

function sync() {
  console.log('Starting course files sync...');
  const files = getFiles(srcDir);
  let copiedCount = 0;
  let updatedCount = 0;
  let identicalCount = 0;

  files.forEach((relPath) => {
    const srcPath = path.join(srcDir, relPath);
    const destPath = path.join(destDir, relPath);

    const srcContent = fs.readFileSync(srcPath);

    if (!fs.existsSync(destPath)) {
      // Ensure directory exists
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, srcContent);
      console.log(`Copied missing file: ${relPath}`);
      copiedCount++;
    } else {
      const destContent = fs.readFileSync(destPath);
      if (!srcContent.equals(destContent)) {
        fs.writeFileSync(destPath, srcContent);
        console.log(`Overwrote different file: ${relPath}`);
        updatedCount++;
      } else {
        console.log(`Identical file: ${relPath}`);
        identicalCount++;
      }
    }
  });

  console.log(`Sync complete. Copied: ${copiedCount}, Updated: ${updatedCount}, Identical: ${identicalCount}`);
}

sync();
