const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace exact "/admin" or '/admin'
    content = content.replace(/"\/admin"/g, '"/admin-saad"');
    content = content.replace(/'\/admin'/g, "'/admin-saad'");

    // Replace prefixes "/admin/xyz" or '/admin/xyz'
    content = content.replace(/"\/admin\//g, '"/admin-saad/');
    content = content.replace(/'\/admin\//g, "'/admin-saad/");

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Updated: ' + filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir('client/src');
walkDir('server');
console.log("Renaming completed.");
