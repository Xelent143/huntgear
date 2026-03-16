import fs from 'fs';
import path from 'path';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const targetDir = path.resolve('client/src');
const files = walkDir(targetDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replacements
    content = content.replace(/Xelent Uniforms/g, 'Sialkot Sample Masters');
    content = content.replace(/Xelent/g, 'Sialkot Sample Masters'); // might double replace "Sialkot Sample Masters Uniforms" so be careful
    content = content.replace(/xelentuniforms/g, 'sialkotsamplemasters');
    // Clean up double replacements
    content = content.replace(/Sialkot Sample Masters Uniforms/g, 'Sialkot Sample Masters');

    // Specific contact details
    content = content.replace(/info@sialkotsamplemasters\.com/g, 'info@sialkotsamplemasters.com');
    content = content.replace(/\+92 300 123 4567/g, '+92 302 292 2242');
    content = content.replace(/923001234567/g, '923022922242');

    // Specific domains
    content = content.replace(/sialkotsamplemasters\.com/g, 'sialkotsamplemasters.com');

    if (original !== content) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
