import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import {
    ArrowLeft, Palette, Type, Image as ImageIcon,
    Layers, Sparkles, Save, Download, RotateCcw,
    MousePointer2, ChevronDown, Trash2,
} from 'lucide-react';
import Canvas2D from '../design2d/components/Canvas2D';
import { useDesign2DStore } from '../design2d/store/design2dStore';
import { DEMO_TEMPLATES } from '../design2d/demoTemplates';
import { RASTER_TEMPLATES } from '../design2d/rasterTemplates';
import '../design2d/design2d.css';

// ─── Inject Google Fonts once ───────────────────────────────────────────────
const GOOGLE_FONTS_URL =
    'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800' +
    '&family=Rajdhani:wght@600;700' +
    '&family=Russo+One' +
    '&family=Black+Han+Sans' +
    '&family=Teko:wght@600;700' +
    '&family=Share+Tech+Mono' +
    '&family=Chakra+Petch:wght@600;700' +
    '&family=Orbitron:wght@700;900' +
    '&family=Bebas+Neue' +
    '&family=Anton' +
    '&family=Big+Shoulders+Display:wght@700;900' +
    '&family=Oswald:wght@600;700' +
    '&family=Exo+2:wght@700;900' +
    '&family=Squada+One' +
    '&family=Staatliches' +
    '&family=Inter:wght@400;700' +
    '&family=Roboto:wght@400;700' +
    '&family=Roboto+Condensed:wght@700' +
    '&family=Lato:wght@700;900' +
    '&family=Montserrat:wght@700;900' +
    '&family=Source+Sans+3:wght@700;900' +
    '&family=Noto+Sans:wght@700' +
    '&family=Playfair+Display:wght@700' +
    '&family=Merriweather:wght@700;900' +
    '&family=IM+Fell+English' +
    '&family=JetBrains+Mono:wght@700' +
    '&family=Special+Elite' +
    '&family=Black+Ops+One' +
    '&family=Permanent+Marker' +
    '&display=swap';

function useGoogleFonts() {
    useEffect(() => {
        if (document.getElementById('d2d-google-fonts')) return;
        const link = document.createElement('link');
        link.id = 'd2d-google-fonts';
        link.rel = 'stylesheet';
        link.href = GOOGLE_FONTS_URL;
        document.head.appendChild(link);
    }, []);
}

// ─── Color palette ─────────────────────────────────────────────────────────

const COLOR_PALETTE = [
    '#1a1a2e', '#16213e', '#0f3460', '#533483',
    '#e94560', '#d4af37', '#2d6a4f', '#40916c',
    '#000000', '#1e1e1e', '#333333', '#555555',
    '#777777', '#999999', '#cccccc', '#ffffff',
    '#8b0000', '#b22222', '#dc3545', '#ff6b6b',
    '#003049', '#023e8a', '#0077b6', '#00b4d8',
    '#2b2d42', '#3d405b', '#606c38', '#283618',
    '#bc6c25', '#dda15e', '#780000', '#c1121f',
];

// ─── Built-in patterns ──────────────────────────────────────────────────────

const PATTERNS = [
    { id: 'none', name: 'Solid Color', preview: '' },
    { id: 'camo-woodland', name: 'Woodland Camo', preview: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#2d4a2e" width="80" height="80"/><circle fill="#1a3a1b" cx="20" cy="20" r="15"/><circle fill="#4a6b3a" cx="50" cy="40" r="12"/><circle fill="#1a3a1b" cx="70" cy="10" r="10"/><circle fill="#3a5a2a" cx="10" cy="60" r="14"/></svg>') },
    { id: 'camo-desert', name: 'Desert Camo', preview: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#c5a66e" width="80" height="80"/><circle fill="#8b7355" cx="25" cy="25" r="18"/><circle fill="#d4b896" cx="55" cy="50" r="14"/><circle fill="#8b7355" cx="65" cy="15" r="10"/></svg>') },
    { id: 'camo-urban', name: 'Urban Camo', preview: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#555" width="80" height="80"/><rect fill="#333" x="10" y="10" width="25" height="20"/><rect fill="#777" x="40" y="30" width="30" height="25"/><rect fill="#444" x="5" y="50" width="20" height="25"/></svg>') },
    { id: 'stripes', name: 'Tactical Stripes', preview: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect fill="#1a1a2e" width="20" height="20"/><rect fill="#2a2a4e" width="20" height="4"/><rect fill="#2a2a4e" y="10" width="20" height="4"/></svg>') },
];

// ─── Tool definitions ───────────────────────────────────────────────────────

type ToolId = 'select' | 'color' | 'logo' | 'text' | 'pattern' | 'preset' | 'save' | 'export';

const TOOLS: { id: ToolId; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'select', label: 'Select', icon: MousePointer2 },
    { id: 'color', label: 'Colors', icon: Palette },
    { id: 'logo', label: 'Logo', icon: ImageIcon },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'pattern', label: 'Pattern', icon: Layers },
    { id: 'preset', label: 'Presets', icon: Sparkles },
    { id: 'save', label: 'Save', icon: Save },
    { id: 'export', label: 'Export', icon: Download },
];

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function Design2D() {
    const {
        templateId, templateName, partNames, partColors, selectedPartId,
        activeTool, setActiveTool, setTemplate, setPartColor,
        selectPart, resetDesign, pendingPlacement, setPendingPlacement,
        isRasterMode, rasterParts, rasterPartColors, setRasterTemplate, setRasterPartColor,
    } = useDesign2DStore();

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [textFont, setTextFont] = useState('Barlow Condensed');
    const [textSize, setTextSize] = useState(24);
    const [textColor, setTextColor] = useState('#ffffff');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Pattern upload & scale ─────────────────────────────────────────────────
    const [patternScale, setPatternScale] = useState(1);
    const [customPatterns, setCustomPatterns] = useState<{ id: string; name: string; preview: string }[]>([]);

    // ── Annotation modal state ────────────────────────────────────────────────
    const [showAnnotationModal, setShowAnnotationModal] = useState(false);
    const [annotationNote, setAnnotationNote] = useState('');
    const [annotationTargetObj, setAnnotationTargetObj] = useState<any>(null);
    // Tracks actively selected placed element for the floating "Add Note" button
    const [selectedForNote, setSelectedForNote] = useState<{ obj: any; br: { left: number; top: number; width: number; height: number } } | null>(null);

    // Load all Google Fonts for the text tool
    useGoogleFonts();

    // Poll for a just-placed object from Canvas2D
    useEffect(() => {
        const interval = setInterval(() => {
            const getPlaced = (window as any).__d2d_getJustPlaced;
            const clearPlaced = (window as any).__d2d_clearJustPlaced;
            if (!getPlaced) return;
            const obj = getPlaced();
            if (obj) {
                clearPlaced?.();
                setSelectedForNote(null); // hide floating btn while modal is open
                setAnnotationTargetObj(obj);
                setAnnotationNote('');
                setShowAnnotationModal(true);
            }
        }, 200);
        return () => clearInterval(interval);
    }, []);

    // Poll for an actively selected element to show the floating "Add Note" button
    useEffect(() => {
        const interval = setInterval(() => {
            if (showAnnotationModal) return; // don't fight with the modal
            const sel = (window as any).__d2d_selectedForNote;
            setSelectedForNote(sel ?? null);
        }, 120);
        return () => clearInterval(interval);
    }, [showAnnotationModal]);

    const handleAddAnnotation = () => {
        const addFn = (window as any).__d2d_addAnnotation;
        if (addFn && annotationTargetObj && annotationNote.trim()) {
            addFn(annotationTargetObj, annotationNote.trim());
        }
        setShowAnnotationModal(false);
        setAnnotationNote('');
        setAnnotationTargetObj(null);
    };

    const handleSkipAnnotation = () => {
        setShowAnnotationModal(false);
        setAnnotationNote('');
        setAnnotationTargetObj(null);
    };

    // Auto-load demo template if nothing is selected
    if (!templateId) {
        const demo = DEMO_TEMPLATES[0];
        setTemplate(demo.id, demo.slug, demo.name, demo.svgData, demo.partNames);
    }

    const handleToolClick = (toolId: ToolId) => {
        setActiveTool(toolId);
        // On mobile, open drawer for tools that have panels
        if (window.innerWidth < 768 && ['color', 'logo', 'text', 'pattern', 'preset'].includes(toolId)) {
            setMobileDrawerOpen(true);
        }
    };

    const handleExport = () => {
        const exportFn = (window as any).__d2d_exportCanvas;
        if (exportFn) {
            const dataUrl = exportFn();
            const link = document.createElement('a');
            link.download = `${templateName || 'design'}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        }
    };

    const renderSidebarContent = () => {
        switch (activeTool) {
            case 'color':
                // ── Raster mode: show raster parts with hue-shift recoloring ──
                if (isRasterMode) {
                    return (
                        <div className="d2d-sidebar-section">
                            <h3>🎨 Garment Parts</h3>
                            <p style={{ fontSize: '0.7rem', color: '#555', margin: '0 0 12px', lineHeight: 1.5 }}>Select a part and pick a new color. The engine will hue-shift that area while preserving shading and texture.</p>
                            {/* Raster part selector */}
                            <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {rasterParts.map(part => (
                                    <div
                                        key={part.partId}
                                        className={`d2d-part-item ${selectedPartId === part.partId ? 'selected' : ''}`}
                                        onClick={() => selectPart(part.partId)}
                                    >
                                        <div className="d2d-part-color-dot" style={{ background: rasterPartColors[part.partId] || part.originalColor }} />
                                        <span className="d2d-part-name">{part.partName}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Color picker */}
                            {selectedPartId && (
                                <>
                                    <h3 style={{ marginTop: 12 }}>Recolor "{rasterParts.find(p => p.partId === selectedPartId)?.partName || selectedPartId}"</h3>
                                    <div className="d2d-color-grid">
                                        {COLOR_PALETTE.map(color => (
                                            <button
                                                key={color}
                                                className={`d2d-color-swatch ${rasterPartColors[selectedPartId] === color ? 'active' : ''}`}
                                                style={{ background: color }}
                                                onClick={() => setRasterPartColor(selectedPartId, color)}
                                                aria-label={`Color ${color}`}
                                            />
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 12 }}>
                                        <label style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Custom Color</label>
                                        <input
                                            type="color"
                                            value={rasterPartColors[selectedPartId] || '#1a1a2e'}
                                            onChange={e => setRasterPartColor(selectedPartId, e.target.value)}
                                            style={{ width: '100%', height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', marginTop: 4 }}
                                        />
                                    </div>
                                </>
                            )}
                            {!selectedPartId && (
                                <p style={{ color: '#666', fontSize: '0.8rem', textAlign: 'center', paddingTop: 12 }}>Select a part above to change its color</p>
                            )}
                        </div>
                    );
                }

                // ── SVG mode: existing flow ──
                return (
                    <div className="d2d-sidebar-section">
                        <h3>🎨 Part Colors</h3>
                        {/* Part selector */}
                        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {partNames.map(part => (
                                <div
                                    key={part}
                                    className={`d2d-part-item ${selectedPartId === part ? 'selected' : ''}`}
                                    onClick={() => selectPart(part)}
                                >
                                    <div className="d2d-part-color-dot" style={{ background: partColors[part] || '#1a1a2e' }} />
                                    <span className="d2d-part-name">{part.replace(/_/g, ' ')}</span>
                                </div>
                            ))}
                        </div>
                        {/* Color grid */}
                        {selectedPartId && (
                            <>
                                <h3 style={{ marginTop: 12 }}>Pick Color for "{selectedPartId.replace(/_/g, ' ')}"</h3>
                                <div className="d2d-color-grid">
                                    {COLOR_PALETTE.map(color => (
                                        <button
                                            key={color}
                                            className={`d2d-color-swatch ${partColors[selectedPartId] === color ? 'active' : ''}`}
                                            style={{ background: color }}
                                            onClick={() => setPartColor(selectedPartId, color)}
                                            aria-label={`Color ${color}`}
                                        />
                                    ))}
                                </div>
                                <div style={{ marginTop: 12 }}>
                                    <label style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
                                        Custom Color
                                    </label>
                                    <input
                                        type="color"
                                        value={partColors[selectedPartId] || '#1a1a2e'}
                                        onChange={e => setPartColor(selectedPartId, e.target.value)}
                                        style={{ width: '100%', height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', marginTop: 4 }}
                                    />
                                </div>
                            </>
                        )}
                        {!selectedPartId && (
                            <p style={{ color: '#666', fontSize: '0.8rem', textAlign: 'center', paddingTop: 12 }}>
                                Click a part name above or click directly on the garment to select it
                            </p>
                        )}
                    </div>
                );

            case 'text':
                return (
                    <div className="d2d-sidebar-section">
                        <h3>✏️ Add Text</h3>
                        {pendingPlacement?.type === 'text' && (
                            <div style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid #d4af37', borderRadius: 8, padding: '10px 12px', marginBottom: 12 }}>
                                <p style={{ fontSize: '0.8rem', color: '#d4af37', margin: 0, fontWeight: 700 }}>✦ PLACEMENT MODE ACTIVE</p>
                                <p style={{ fontSize: '0.75rem', color: '#bbb', margin: '4px 0 0' }}>Click any body part on the garment to place the text there.</p>
                                <button className="d2d-btn d2d-btn-ghost" style={{ marginTop: 8, width: '100%', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setPendingPlacement(null)}>
                                    ✕ Cancel
                                </button>
                            </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <input
                                className="d2d-input"
                                placeholder="Enter text..."
                                value={textInput}
                                onChange={e => setTextInput(e.target.value)}
                            />

                            {/* Font preview */}
                            {textInput && (
                                <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', fontFamily: textFont, fontSize: Math.min(textSize, 28), color: textColor, minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', wordBreak: 'break-word' }}>
                                    {textInput}
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: 8 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.65rem', color: '#666', textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>Font</label>
                                    <select
                                        className="d2d-input"
                                        value={textFont}
                                        onChange={e => setTextFont(e.target.value)}
                                        style={{ width: '100%', fontSize: '0.8rem' }}
                                    >
                                        <optgroup label="── Military & Tactical ──">
                                            <option value="Barlow Condensed">Barlow Condensed</option>
                                            <option value="Rajdhani">Rajdhani</option>
                                            <option value="Russo One">Russo One</option>
                                            <option value="Black Han Sans">Black Han Sans</option>
                                            <option value="Teko">Teko</option>
                                            <option value="Share Tech Mono">Share Tech Mono</option>
                                            <option value="Chakra Petch">Chakra Petch</option>
                                            <option value="Orbitron">Orbitron</option>
                                        </optgroup>
                                        <optgroup label="── Bold Display ──">
                                            <option value="Bebas Neue">Bebas Neue</option>
                                            <option value="Anton">Anton</option>
                                            <option value="Big Shoulders Display">Big Shoulders Display</option>
                                            <option value="Oswald">Oswald</option>
                                            <option value="Exo 2">Exo 2</option>
                                            <option value="Squada One">Squada One</option>
                                            <option value="Staatliches">Staatliches</option>
                                        </optgroup>
                                        <optgroup label="── Professional Sans ──">
                                            <option value="Inter">Inter</option>
                                            <option value="Roboto">Roboto</option>
                                            <option value="Roboto Condensed">Roboto Condensed</option>
                                            <option value="Lato">Lato</option>
                                            <option value="Montserrat">Montserrat</option>
                                            <option value="Source Sans 3">Source Sans 3</option>
                                            <option value="Noto Sans">Noto Sans</option>
                                        </optgroup>
                                        <optgroup label="── Serif & Classic ──">
                                            <option value="Playfair Display">Playfair Display</option>
                                            <option value="Merriweather">Merriweather</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="IM Fell English">IM Fell English</option>
                                        </optgroup>
                                        <optgroup label="── Monospace / Stencil ──">
                                            <option value="Courier New">Courier New</option>
                                            <option value="JetBrains Mono">JetBrains Mono</option>
                                            <option value="Special Elite">Special Elite</option>
                                        </optgroup>
                                        <optgroup label="── Impact Style ──">
                                            <option value="Impact">Impact</option>
                                            <option value="Black Ops One">Black Ops One</option>
                                            <option value="Permanent Marker">Permanent Marker</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div style={{ width: 72 }}>
                                    <label style={{ fontSize: '0.65rem', color: '#666', textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>Size</label>
                                    <input
                                        type="number"
                                        className="d2d-input"
                                        value={textSize}
                                        onChange={e => setTextSize(Number(e.target.value))}
                                        min={8}
                                        max={120}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.65rem', color: '#666', textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>Color</label>
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={e => setTextColor(e.target.value)}
                                        style={{ width: '100%', height: 38, border: 'none', cursor: 'pointer', borderRadius: 8, background: 'transparent' }}
                                    />
                                </div>
                                {/* Quick color swatches */}
                                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' as const, maxWidth: 130 }}>
                                    {['#ffffff', '#000000', '#d4af37', '#ff4444', '#2196f3', '#4caf50', '#ff9800', '#9c27b0'].map(c => (
                                        <button key={c} onClick={() => setTextColor(c)} style={{ width: 22, height: 22, borderRadius: 4, background: c, border: textColor === c ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }} />
                                    ))}
                                </div>
                            </div>
                            <button
                                className="d2d-btn d2d-btn-primary"
                                disabled={!textInput.trim()}
                                style={{ width: '100%' }}
                                onClick={() => {
                                    if (!textInput.trim()) return;
                                    setPendingPlacement({ type: 'text', text: textInput, fontFamily: textFont, fontSize: textSize, fill: textColor });
                                    setTextInput('');
                                }}
                            >
                                <Type style={{ width: 16, height: 16 }} /> Place Text on Garment
                            </button>
                        </div>
                    </div>
                );

            case 'logo':
                return (
                    <div className="d2d-sidebar-section">
                        <h3>🖼️ Add Logo</h3>
                        {pendingPlacement?.type === 'logo' ? (
                            <div style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid #d4af37', borderRadius: 8, padding: '10px 12px', marginBottom: 12 }}>
                                <p style={{ fontSize: '0.8rem', color: '#d4af37', margin: 0, fontWeight: 700 }}>✦ PLACEMENT MODE ACTIVE</p>
                                <p style={{ fontSize: '0.75rem', color: '#bbb', margin: '4px 0 0' }}>Click any body part on the garment to place the logo there.</p>
                                <button className="d2d-btn d2d-btn-ghost" style={{ marginTop: 8, width: '100%', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setPendingPlacement(null)}>
                                    ✕ Cancel
                                </button>
                            </div>
                        ) : (
                            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 12 }}>Upload a logo image (PNG, JPG, SVG). You'll then click a body part to place it there.</p>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    // Enter placement mode with this logo
                                    setPendingPlacement({ type: 'logo', imageUrl: url });
                                }
                                if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                        />
                        <button
                            className="d2d-btn d2d-btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImageIcon style={{ width: 16, height: 16 }} /> Upload Logo
                        </button>
                        <button
                            className="d2d-btn d2d-btn-outline"
                            style={{ width: '100%', marginTop: 4 }}
                            onClick={() => { const del = (window as any).__d2d_deleteSelected; if (del) del(); }}
                        >
                            <Trash2 style={{ width: 16, height: 16 }} /> Delete Selected
                        </button>
                        <p style={{ fontSize: '0.7rem', color: '#555', marginTop: 8, textAlign: 'center' }}>Drag, resize, and rotate after placing</p>
                    </div>
                );

            case 'pattern':
                return (
                    <div className="d2d-sidebar-section">
                        <h3>🎭 Patterns &amp; Textures</h3>
                        {pendingPlacement?.type === 'pattern' && (
                            <div style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid #d4af37', borderRadius: 8, padding: '10px 12px', marginBottom: 12 }}>
                                <p style={{ fontSize: '0.8rem', color: '#d4af37', margin: 0, fontWeight: 700 }}>✦ PLACEMENT MODE ACTIVE</p>
                                <p style={{ fontSize: '0.75rem', color: '#bbb', margin: '4px 0 0' }}>Click any body part on the garment to apply this pattern there.</p>
                                <button className="d2d-btn d2d-btn-ghost" style={{ marginTop: 8, width: '100%', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setPendingPlacement(null)}>
                                    ✕ Cancel
                                </button>
                            </div>
                        )}
                        {!pendingPlacement && (
                            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: 10 }}>Click a pattern, then click a body part on the garment to apply it there.</p>
                        )}

                        {/* ── Pattern Scale Slider ── */}
                        <div style={{ marginBottom: 14 }}>
                            <label style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
                                Tile Scale: {patternScale.toFixed(1)}x
                            </label>
                            <input
                                type="range"
                                min="0.3"
                                max="4"
                                step="0.1"
                                value={patternScale}
                                onChange={e => setPatternScale(parseFloat(e.target.value))}
                                style={{ width: '100%', accentColor: '#d4af37', marginTop: 4 }}
                            />
                        </div>

                        {/* ── Upload Custom Pattern ── */}
                        <div style={{ marginBottom: 14 }}>
                            <label
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    background: 'rgba(212,175,55,0.08)', border: '1px dashed rgba(212,175,55,0.4)',
                                    borderRadius: 10, padding: '12px 10px', cursor: 'pointer',
                                    color: '#d4af37', fontSize: '0.8rem', fontWeight: 600,
                                    transition: 'all 0.2s',
                                }}
                            >
                                📤 Upload Custom Pattern
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={e => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            const url = reader.result as string;
                                            setCustomPatterns(prev => [...prev, { id: `custom-${Date.now()}`, name: file.name.replace(/\.[^.]+$/, ''), preview: url }]);
                                        };
                                        reader.readAsDataURL(file);
                                        e.target.value = '';
                                    }}
                                />
                            </label>
                        </div>

                        {/* ── Pattern Grid ── */}
                        <div className="d2d-pattern-grid">
                            {PATTERNS.filter(p => p.id !== 'none').map(pat => (
                                <div
                                    key={pat.id}
                                    className={`d2d-pattern-card ${pendingPlacement?.type === 'pattern' && (pendingPlacement as any).patternId === pat.id ? 'active' : ''}`}
                                    onClick={() => setPendingPlacement({ type: 'pattern', patternId: pat.id, patternUrl: pat.preview, patternScale })}
                                >
                                    {pat.preview ? (
                                        <img src={pat.preview} alt={pat.name} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#888' }}>Solid</div>
                                    )}
                                    <div className="d2d-pattern-card-label">{pat.name}</div>
                                </div>
                            ))}
                            {/* Custom uploaded patterns */}
                            {customPatterns.map(pat => (
                                <div
                                    key={pat.id}
                                    className={`d2d-pattern-card ${pendingPlacement?.type === 'pattern' && (pendingPlacement as any).patternId === pat.id ? 'active' : ''}`}
                                    onClick={() => setPendingPlacement({ type: 'pattern', patternId: pat.id, patternUrl: pat.preview, patternScale })}
                                >
                                    <img src={pat.preview} alt={pat.name} style={{ objectFit: 'cover' }} />
                                    <div className="d2d-pattern-card-label">{pat.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'preset':
                return (
                    <div className="d2d-sidebar-section">
                        <h3>✨ Pre-built Designs</h3>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 12 }}>
                            Load admin-created designs as starting points. Presets will appear here once uploaded via the admin panel.
                        </p>
                        <div style={{ textAlign: 'center', padding: '24px 0', color: '#555' }}>
                            <Sparkles style={{ width: 32, height: 32, marginBottom: 8, opacity: 0.3 }} />
                            <p style={{ fontSize: '0.8rem' }}>No presets yet</p>
                        </div>
                    </div>
                );

            case 'save':
                return (
                    <div className="d2d-sidebar-section">
                        <h3>💾 Save Design</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <input className="d2d-input" placeholder="Design name..." />
                            <button className="d2d-btn d2d-btn-primary" style={{ width: '100%' }}>
                                <Save style={{ width: 16, height: 16 }} /> Save to My Designs
                            </button>
                            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
                            <h3>My Saved Designs</h3>
                            <div style={{ textAlign: 'center', padding: '16px 0', color: '#555' }}>
                                <p style={{ fontSize: '0.8rem' }}>No saved designs yet</p>
                            </div>
                        </div>
                    </div>
                );

            case 'export':
                return (
                    <div className="d2d-sidebar-section">
                        <h3>📤 Export</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <button className="d2d-btn d2d-btn-primary" style={{ width: '100%' }} onClick={handleExport}>
                                <Download style={{ width: 16, height: 16 }} /> Download PNG
                            </button>
                            <Link href="/rfq">
                                <button className="d2d-btn d2d-btn-outline" style={{ width: '100%' }}>
                                    Send with RFQ Quote
                                </button>
                            </Link>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="d2d-sidebar-section">
                        <h3>🎯 Getting Started</h3>
                        <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.6 }}>
                            Select a tool from the panel to start customizing your garment.
                            Click on any part of the garment to select it, then use the Colors tool to change its color.
                        </p>
                        <div style={{ marginTop: 16 }}>
                            <h3>Template</h3>
                            <div className="d2d-template-grid">
                                {DEMO_TEMPLATES.map(t => (
                                    <div
                                        key={t.id}
                                        className={`d2d-template-card ${templateId === t.id ? 'selected' : ''}`}
                                        onClick={() => setTemplate(t.id, t.slug, t.name, t.svgData, t.partNames)}
                                    >
                                        <div style={{ width: 48, height: 56, margin: '0 auto', opacity: 0.5 }}>
                                            <svg viewBox="0 0 400 500" width="100%" height="100%">
                                                <path d="M120 80 L280 80 L300 200 L310 480 L90 480 L100 200 Z" fill="#333" />
                                            </svg>
                                        </div>
                                        <div className="d2d-template-card-name">{t.name}</div>
                                    </div>
                                ))}
                            </div>

                            {/* ── Raster Photo Templates ── */}
                            {RASTER_TEMPLATES.length > 0 && (
                                <div style={{ marginTop: 20 }}>
                                    <h3>📸 Photo Templates</h3>
                                    <p style={{ fontSize: '0.7rem', color: '#555', margin: '4px 0 12px', lineHeight: 1.5 }}>Real garment images with pixel-level color editing</p>
                                    <div className="d2d-template-grid">
                                        {RASTER_TEMPLATES.map(t => (
                                            <div
                                                key={t.id}
                                                className={`d2d-template-card ${templateId === t.id ? 'selected' : ''}`}
                                                onClick={() => setRasterTemplate(t.id, t.name, t.imageUrl, t.parts)}
                                            >
                                                <div style={{ width: 48, height: 56, margin: '0 auto', overflow: 'hidden', borderRadius: 4 }}>
                                                    <img src={t.imageUrl} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                </div>
                                                <div className="d2d-template-card-name">{t.name}</div>
                                                {t.description && <div style={{ fontSize: '0.6rem', color: '#555', textAlign: 'center' }}>{t.description}</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="d2d-root">
            {/* ── Top Bar ── */}
            <div className="d2d-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Link href="/">
                        <button className="d2d-btn d2d-btn-ghost" style={{ padding: '6px 8px', minHeight: 40 }}>
                            <ArrowLeft style={{ width: 18, height: 18 }} />
                        </button>
                    </Link>
                    <span className="d2d-topbar-title">{templateName || '2D Designer'}</span>
                </div>
                <div className="d2d-topbar-actions">
                    {/* Desktop: text buttons */}
                    <button className="d2d-btn d2d-btn-ghost d2d-desktop-only" onClick={resetDesign}>
                        <RotateCcw style={{ width: 16, height: 16 }} /> Reset
                    </button>
                    <button className="d2d-btn d2d-btn-primary d2d-desktop-only" onClick={handleExport}>
                        <Download style={{ width: 16, height: 16 }} /> Export
                    </button>
                    {/* Mobile: icon-only buttons */}
                    <button className="d2d-btn d2d-btn-ghost d2d-mobile-only" onClick={resetDesign} style={{ padding: '6px 8px', minHeight: 40 }} title="Reset">
                        <RotateCcw style={{ width: 18, height: 18 }} />
                    </button>
                    <button className="d2d-btn d2d-btn-primary d2d-mobile-only" onClick={handleExport} style={{ padding: '6px 10px', minHeight: 40 }} title="Export">
                        <Download style={{ width: 18, height: 18 }} />
                    </button>
                </div>
            </div>

            {/* ── Main Body ── */}
            <div className="d2d-body">
                {/* Desktop Sidebar */}
                <div className="d2d-sidebar">
                    {/* Tool nav — vertical list on desktop */}
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        {TOOLS.map(tool => (
                            <button
                                key={tool.id}
                                className={`d2d-tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                                onClick={() => handleToolClick(tool.id)}
                            >
                                <tool.icon />
                                {tool.label}
                            </button>
                        ))}
                    </div>
                    {renderSidebarContent()}
                </div>

                {/* Canvas */}
                <div className="d2d-canvas-area">
                    <Canvas2D />

                    {/* ── Floating "Add Note" button on element selection ── */}
                    {selectedForNote && !showAnnotationModal && (() => {
                        const { obj, br } = selectedForNote;
                        // Position the button horizontally centred above the selection box
                        const btnW = 148;
                        const left = Math.max(8, br.left + br.width / 2 - btnW / 2);
                        const top = Math.max(8, br.top - 42);
                        return (
                            <button
                                onClick={() => {
                                    setAnnotationTargetObj(obj);
                                    setAnnotationNote('');
                                    setShowAnnotationModal(true);
                                    setSelectedForNote(null);
                                }}
                                style={{
                                    position: 'absolute',
                                    left,
                                    top,
                                    width: btnW,
                                    zIndex: 60,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    background: 'rgba(10,10,18,0.92)',
                                    border: '1px solid rgba(212,175,55,0.6)',
                                    borderRadius: 24,
                                    padding: '5px 14px',
                                    color: '#d4af37',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.06em',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.12)',
                                    pointerEvents: 'auto',
                                    animation: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                📋 Add Note
                            </button>
                        );
                    })()}

                    {/* ── Annotation Note Modal ── */}
                    {showAnnotationModal && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 80,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                        }}>
                            <div style={{
                                background: '#13131f', border: '1px solid rgba(212,175,55,0.4)',
                                borderRadius: 16, padding: 24, width: 340, maxWidth: 'calc(100vw - 32px)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08)',
                            }}>
                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📋</div>
                                    <div>
                                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Add Manufacturer Note</p>
                                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#555' }}>Tech pack callout — optional</p>
                                    </div>
                                </div>

                                {/* Quick-fill chips */}
                                <p style={{ margin: '0 0 8px', fontSize: '0.68rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Quick suggestions</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                                    {[
                                        'Screen print, 4 color',
                                        'Embroidery, flat stitch',
                                        'Heat transfer vinyl',
                                        'Woven label, 50×50mm',
                                        'Rubber patch',
                                        'Width: 80mm',
                                    ].map(chip => (
                                        <button key={chip}
                                            onClick={() => setAnnotationNote(prev => prev ? prev + '\n' + chip : chip)}
                                            style={{
                                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 20, padding: '3px 10px', fontSize: '0.68rem',
                                                color: '#999', cursor: 'pointer',
                                            }}>
                                            + {chip}
                                        </button>
                                    ))}
                                </div>

                                {/* Textarea */}
                                <textarea
                                    value={annotationNote}
                                    onChange={e => setAnnotationNote(e.target.value)}
                                    placeholder={'e.g. Screen print, PANTONE 7548C\nSize: 80mm × 80mm\nPlacement: 20mm from neckline'}
                                    autoFocus
                                    rows={4}
                                    style={{
                                        width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#e5e5e5',
                                        fontSize: '0.82rem', padding: '10px 12px', resize: 'vertical', outline: 'none',
                                        fontFamily: 'monospace', lineHeight: 1.6,
                                    }}
                                    onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleAddAnnotation(); }}
                                />
                                <p style={{ margin: '4px 0 16px', fontSize: '0.65rem', color: '#444' }}>Ctrl+Enter to confirm</p>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={handleSkipAnnotation}
                                        style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#888', cursor: 'pointer', padding: '10px 0', fontSize: '0.8rem' }}>
                                        Skip
                                    </button>
                                    <button onClick={handleAddAnnotation}
                                        disabled={!annotationNote.trim()}
                                        style={{ flex: 2, background: annotationNote.trim() ? '#d4af37' : 'rgba(212,175,55,0.15)', border: 'none', borderRadius: 10, color: annotationNote.trim() ? '#0a0a12' : '#555', cursor: annotationNote.trim() ? 'pointer' : 'default', padding: '10px 0', fontSize: '0.8rem', fontWeight: 700 }}>
                                        📋 Add Note & Connect
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placement-mode overlay banner */}
                    {pendingPlacement && (
                        <div style={{
                            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
                            zIndex: 50, background: 'rgba(10,10,18,0.94)', border: '1px solid #d4af37',
                            borderRadius: 14, padding: '10px 16px', display: 'flex', alignItems: 'center',
                            gap: 12, boxShadow: '0 0 30px rgba(212,175,55,0.25)', backdropFilter: 'blur(10px)',
                            pointerEvents: 'auto', maxWidth: 'calc(100vw - 32px)',
                        }}>
                            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
                                {pendingPlacement.type === 'logo' ? '🖼️' : pendingPlacement.type === 'text' ? '✏️' : '🎭'}
                            </span>
                            <div style={{ minWidth: 0 }}>
                                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    Tap a body part to place
                                </p>
                                <p style={{ margin: '2px 0 0', fontSize: '0.68rem', color: '#888' }}>
                                    {pendingPlacement.type} will be clipped to that area
                                </p>
                            </div>
                            <button onClick={() => setPendingPlacement(null)}
                                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#aaa', cursor: 'pointer', padding: '6px 10px', fontSize: '0.75rem', flexShrink: 0, minHeight: 36 }}>
                                ✕
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Mobile Bottom Tab Bar ── */}
            <div className="d2d-bottom-toolbar">
                <div className="d2d-bottom-toolbar-inner">
                    {TOOLS.map(tool => (
                        <button
                            key={tool.id}
                            className={`d2d-tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                            onClick={() => handleToolClick(tool.id)}
                        >
                            <tool.icon />
                            {tool.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Mobile Bottom Sheet ── */}
            <div
                className={`d2d-sheet-overlay ${mobileDrawerOpen ? 'open' : ''}`}
                onClick={() => setMobileDrawerOpen(false)}
            />
            <div className={`d2d-sheet ${mobileDrawerOpen ? 'open' : ''}`}>
                <div className="d2d-sheet-handle-area" onClick={() => setMobileDrawerOpen(false)}>
                    <div className="d2d-sheet-handle" />
                    <span className="d2d-sheet-title">
                        {TOOLS.find(t => t.id === activeTool)?.label ?? 'Options'}
                    </span>
                </div>
                <div className="d2d-sheet-body">
                    {renderSidebarContent()}
                </div>
            </div>
        </div>
    );
}
