const fs = require('fs');
const path = require('path');

const searchReplace = {
    'Sialkot Sample Masters': 'Xelent Uniforms',
    'sialkotsamplementasters.com': 'xelentuniforms.com',
    'sialkot sample masters': 'xelent uniforms',
    'Sialkot Sample Master': 'Xelent Uniforms',
    'SSM Apparel': 'XU Apparel',
    'info@sialkotsamplementasters.com': 'info@xelentuniforms.com',
    'sales@sialkotsamplementasters.com': 'sales@xelentuniforms.com',
    'streetwear manufacturer': 'security uniform manufacturer',
    'Streetwear Manufacturer': 'Security Uniform Manufacturer',
    'Streetwear manufacturing': 'Security uniform manufacturing',
    'Streetwear Manufacturing': 'Security Uniform Manufacturing',
    'custom streetwear': 'custom security uniforms',
    'Custom streetwear': 'Custom security uniforms',
    'Custom Streetwear': 'Custom Security Uniforms',
    'Pakistan\\'s premier custom streetwear manufacturer': 'Pakistan\\'s premier security uniform manufacturer',
    'Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear, and Martial Arts Wear': 'Tactical Uniforms, Guard Uniforms, High-Visibility Gear, Corporate Security, Outerwear, and Accessories',
    'Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear \\& Martial Arts': 'Tactical & Combat Uniforms, Standard Guard Uniforms, High-Visibility Gear, Corporate Security Wear, Weather-Resistant Outerwear & Accessories',
    'Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear': 'Tactical Uniforms, Guard Uniforms, High-Visibility Gear, Corporate Security, Outerwear',
    'custom hunting wear, sportswear, ski wear, techwear, streetwear, and martial arts apparel': 'tactical gear, guard uniforms, high-visibility clothing, corporate security wear, outerwear, and security accessories',
    'hunting wear manufacturer, ski wear manufacturer Pakistan, techwear manufacturer Sialkot, martial arts wear manufacturer': 'tactical uniform manufacturer, guard uniform supplier Pakistan, high-visibility gear manufacturer Sialkot, corporate security wear manufacturer',
    'custom hunting wear manufacturer Pakistan, custom sports wear wholesale, ski wear manufacturer Sialkot, techwear manufacturer Pakistan, custom streetwear manufacturer, BJJ gi manufacturer Pakistan, martial arts wear wholesale': 'tactical uniform manufacturer Pakistan, guard uniform wholesale, high-vis gear manufacturer Sialkot, corporate security wear Pakistan, custom security uniform manufacturer, security outerwear wholesale',
    'T-shirts, hoodies, joggers, bomber jackets': 'Tactical shirts, guard pants, hi-vis jackets, security sweaters',
    't-shirts, hoodies, and performance apparel': 'tactical gear, guard uniforms, and security accessories',
    'BJJ gi manufacturer': 'Tactical gear manufacturer',
    'martial arts wear': 'security accessories',
    'Martial Arts Wear': 'Security Accessories',
    'Tech Wear': 'Corporate Security',
    'Techwear': 'Corporate Security Wear',
    'Ski Wear': 'High-Visibility Gear',
    'Sports Wear': 'Standard Guard Uniforms',
    'Hunting Wear': 'Tactical & Combat Uniforms',
};

const dirsToScan = [
    path.join(__dirname, 'client', 'src'),
    path.join(__dirname, 'client', 'index.html'),
    path.join(__dirname, 'server')
];

function processPath(p) {
    try {
        if (!fs.existsSync(p)) return;

        if (fs.statSync(p).isDirectory()) {
            fs.readdirSync(p).forEach(file => {
                processPath(path.join(p, file));
            });
        } else if (p.match(/\.(tsx|ts|html|json|md)$/)) {
            let content = fs.readFileSync(p, 'utf-8');
            let original = content;

            for (const [search, replace] of Object.entries(searchReplace)) {
                content = content.replace(new RegExp(search, 'g'), replace);
                content = content.replace(new RegExp(search.replace(/&/g, '&amp;'), 'g'), replace);
            }

            if (content !== original) {
                console.log(`Updated ${p}`);
                fs.writeFileSync(p, content, 'utf-8');
            }
        }
    } catch (e) {
        console.error(`Error processing ${p}:`, e.message);
    }
}

dirsToScan.forEach(processPath);
console.log('Done scanning.');
