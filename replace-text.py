import os
import re

search_replace = {
    "Sialkot Sample Masters! I'm interested in custom streetwear": "Xelent Uniforms! I'm interested in custom security uniforms",
    "Sialkot Sample Masters! I have an inquiry about custom streetwear": "Xelent Uniforms! I have an inquiry about custom security uniform",
    "Sialkot Sample Masters! I need a quote for custom streetwear": "Xelent Uniforms! I need a quote for custom security uniforms",
    'Hunting, Sports, Ski, Tech, Streetwear & Martial Arts': 'Tactical & Combat Uniforms, Standard Guard Uniforms, High-Visibility Gear, Corporate Security, Weather-Resistant Outerwear & Accessories',
    'Hunting, Sports, Ski, Tech, Streetwear \& Martial Arts': 'Tactical & Combat Uniforms, Standard Guard Uniforms, High-Visibility Gear, Corporate Security, Weather-Resistant Outerwear & Accessories',
    'Hunting, Sports, Ski, Tech, Streetwear \\& Martial Arts': 'Tactical & Combat Uniforms, Standard Guard Uniforms, High-Visibility Gear, Corporate Security, Weather-Resistant Outerwear & Accessories',
    'custom streetwear': 'custom security uniforms',
    'Custom streetwear': 'Custom security uniforms',
    'Custom Streetwear': 'Custom Security Uniforms',
    'streetwear manufacturer': 'security uniform manufacturer',
    'Streetwear Manufacturer': 'Security Uniform Manufacturer',
    'Streetwear manufacturing': 'Security uniform manufacturing',
    'Streetwear Manufacturing': 'Security Uniform Manufacturing',
    'streetwear brand': 'security brand',
    'Streetwear brand': 'Security brand',
    'Streetwear Brand': 'Security Brand',
    'streetwear labels': 'security labels',
    'streetwear': 'security uniform',
    'Streetwear': 'Security Uniforms',
    'STREETWEAR': 'SECURITY UNIFORMS',
    'Hunting Wear': 'Tactical & Combat Uniforms',
    'Sports Wear': 'Standard Guard Uniforms',
    'Ski Wear': 'High-Visibility Gear',
    'Tech Wear': 'Corporate Security Wear',
    'Martial Arts Wear': 'Security Accessories',
    'BJJ gi manufacturer': 'Tactical gear manufacturer',
    'martial arts wear': 'security accessories',
    'catStreetwear': 'catSecurityUniform',
    'streetwear oversize fit hoodie': 'security uniform jacket or shirt',
}

dirs_to_scan = [
    './client/src',
    './client/index.html',
    './server'
]

def process_file(file_path):
    if not os.path.isfile(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for search, replace in search_replace.items():
        # replace verbatim
        content = content.replace(search, replace)
        # replace with HTML entities for &
        html_search = search.replace('&', '&amp;')
        if html_search != search:
            content = content.replace(html_search, replace)
            
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")

def scan_dir(path):
    if os.path.isfile(path):
        if path.endswith(('.tsx', '.ts', '.html', '.json', '.md')):
            process_file(path)
    elif os.path.isdir(path):
        for root, _, files in os.walk(path):
            for file in files:
                if file.endswith(('.tsx', '.ts', '.html', '.json', '.md')):
                    process_file(os.path.join(root, file))

for d in dirs_to_scan:
    scan_dir(d)

print("Done scanning.")
