import { useState, useRef, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import AdminLayout from "@/pages/layouts/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
    Upload, Trash2, Wand2, Loader2, Plus, X, Eye, Star, Truck, ArrowLeft, ImagePlus, Save, Sparkles
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SlabRow { minQty: number; maxQty: number | null; pricePerUnit: string; label: string; sortOrder: number; }
interface SizeRow { [key: string]: string; }

const CATEGORIES = ["Hunting Wear", "Sports Wear", "Ski Wear", "Tech Wear", "Streetwear", "Martial Arts Wear"];

// ─── Shared Components (SlabEditor & SizeChartEditor) ─────────────────────────

function SlabEditor({ slabs, onChange }: { slabs: SlabRow[]; onChange: (slabs: SlabRow[]) => void; }) {
    const add = () => onChange([...slabs, { minQty: 1, maxQty: null, pricePerUnit: "0.00", label: "", sortOrder: slabs.length }]);
    const remove = (i: number) => onChange(slabs.filter((_, idx) => idx !== i));
    const update = (i: number, field: keyof SlabRow, value: string | number | null) =>
        onChange(slabs.map((s, idx) => idx === i ? { ...s, [field]: value } : s));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mt-2">
                <Label className="text-sm font-semibold uppercase tracking-wider text-foreground">MOQ Slab Pricing</Label>
                <Button type="button" size="sm" variant="outline" onClick={add} className="h-8">
                    <Plus className="w-4 h-4 mr-1" /> Add Tier
                </Button>
            </div>
            {slabs.length === 0 && (
                <p className="text-sm text-muted-foreground italic">No pricing tiers defined. Add at least one.</p>
            )}
            <div className="space-y-3">
                {slabs.map((slab, i) => (
                    <div key={i} className="grid grid-cols-12 gap-3 items-end bg-secondary/30 rounded-lg p-3 border border-border">
                        <div className="col-span-2">
                            <Label className="text-xs text-muted-foreground mb-1 block">Min Qty</Label>
                            <Input type="number" value={slab.minQty} min={1} onChange={e => update(i, "minQty", parseInt(e.target.value) || 1)} className="bg-background" />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-xs text-muted-foreground mb-1 block">Max Qty (Leave blank for ∞)</Label>
                            <Input type="number" value={slab.maxQty ?? ""} placeholder="∞" onChange={e => update(i, "maxQty", e.target.value ? parseInt(e.target.value) : null)} className="bg-background" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs text-muted-foreground mb-1 block">Price / Unit ($)</Label>
                            <Input value={slab.pricePerUnit} onChange={e => update(i, "pricePerUnit", e.target.value)} placeholder="0.00" className="bg-background" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs text-muted-foreground mb-1 block">Label</Label>
                            <Input value={slab.label} onChange={e => update(i, "label", e.target.value)} placeholder="e.g. Popular" className="bg-background" />
                        </div>
                        <div className="col-span-1 pb-1">
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive w-full">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SizeChartEditor({ value, onChange }: {
    value: { chartData: string; unit: "inches" | "cm"; notes: string };
    onChange: (v: { chartData: string; unit: "inches" | "cm"; notes: string }) => void;
}) {
    let rows: SizeRow[] = [];
    try { rows = JSON.parse(value.chartData); } catch { rows = []; }
    const columns = rows.length > 0 ? Object.keys(rows[0]) : ["size", "chest", "waist", "length"];

    const updateRows = (newRows: SizeRow[]) => onChange({ ...value, chartData: JSON.stringify(newRows) });
    const addRow = () => updateRows([...rows, Object.fromEntries(columns.map(c => [c, ""]))]);
    const removeRow = (i: number) => updateRows(rows.filter((_, idx) => idx !== i));
    const updateCell = (rowIdx: number, col: string, val: string) =>
        updateRows(rows.map((r, i) => i === rowIdx ? { ...r, [col]: val } : r));

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Label className="text-sm font-semibold uppercase tracking-wider text-foreground">Unit</Label>
                <Select value={value.unit} onValueChange={(v: "inches" | "cm") => onChange({ ...value, unit: v })}>
                    <SelectTrigger className="w-32 bg-secondary border-border">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                        <SelectItem value="inches">Inches</SelectItem>
                        <SelectItem value="cm">Centimeters</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full text-sm">
                    <thead className="bg-secondary/50">
                        <tr>
                            {columns.map(col => (
                                <th key={col} className="px-4 py-3 text-left font-condensed font-bold uppercase tracking-wider text-gold">{col}</th>
                            ))}
                            <th className="px-4 py-3 w-12"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {rows.map((row, i) => (
                            <tr key={i} className="hover:bg-secondary/20 transition-colors">
                                {columns.map(col => (
                                    <td key={col} className="px-2 py-2">
                                        <Input value={row[col] ?? ""} onChange={e => updateCell(i, col, e.target.value)} className="bg-background border-border" />
                                    </td>
                                ))}
                                <td className="px-2 py-2 text-center">
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeRow(i)} className="text-muted-foreground hover:text-destructive">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center">
                <Button type="button" size="sm" variant="outline" onClick={addRow}>
                    <Plus className="w-4 h-4 mr-1" /> Add Size Row
                </Button>
            </div>
            <div className="mt-4">
                <Label className="text-sm text-muted-foreground uppercase tracking-wider mb-2 block">Size Chart Notes</Label>
                <Input value={value.notes} onChange={e => onChange({ ...value, notes: e.target.value })} placeholder="e.g. Measurements are approximate." className="bg-secondary border-border" />
            </div>
        </div>
    );
}

const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function AdminNewProduct() {
    const [, setLocation] = useLocation();
    const [matchEdit, paramsEdit] = useRoute("/admin-saad/product/edit/:id");
    const isEdit = matchEdit;
    const productId = isEdit ? Number(paramsEdit?.id) : null;

    const utils = trpc.useUtils();

    // Fetch existing product if editing
    // Fetch single product details if editing
    const { data: editProduct } = trpc.product.byId.useQuery(
        { id: productId! },
        { enabled: isEdit && !!productId }
    );

    const [isAiLoading, setIsAiLoading] = useState(false);
    const aiGenerateMutation = trpc.aiAgent.generateProduct.useMutation();
    const aiAnalyzeImageMutation = trpc.aiAgent.analyzeUploadedProductImage.useMutation();
    const generateInfographicMutation = trpc.aiAgent.generateInfographic.useMutation();
    const uploadImageMutation = trpc.product.uploadImage.useMutation();
    const mainImagePatchMutation = trpc.product.update.useMutation();
    const deleteImageMutation = trpc.product.deleteImage.useMutation({
        onSuccess: () => {
            utils.product.byId.invalidate({ id: productId! });
            toast.success("Image deleted");
        },
        onError: (e) => toast.error("Failed to delete image", { description: e.message }),
    });

    const [pendingImages, setPendingImages] = useState<{ file: File; preview: string; altText: string; sortOrder: number }[]>([]);
    const [pendingMainImageIndex, setPendingMainImageIndex] = useState<number>(0);
    const [uploadingImages, setUploadingImages] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        category: "Streetwear",
        shortDescription: "",
        description: "",
        manufacturingStory: "",
        manufacturingInfographic: "",
        mainImage: "",
        samplePrice: "",
        weight: "",
        material: "",
        availableSizes: JSON.stringify(["S", "M", "L", "XL", "2XL"]),
        availableColors: JSON.stringify(["Black", "White", "Navy"]),
        isFeatured: false,
        isActive: true,
        freeShipping: false,
        sortOrder: 0,
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
    });
    const [initialForm, setInitialForm] = useState(form);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setIsDirty(JSON.stringify(form) !== JSON.stringify(initialForm));
    }, [form, initialForm]);

    const [slabs, setSlabs] = useState<SlabRow[]>([]);
    const [sizeChart, setSizeChart] = useState({
        chartData: JSON.stringify([
            { size: "S", chest: "36-38", waist: "28-30", length: "27" },
            { size: "M", chest: "38-40", waist: "30-32", length: "28" },
            { size: "L", chest: "40-42", waist: "32-34", length: "29" },
        ]),
        unit: "inches" as "inches" | "cm",
        notes: "",
    });

    // Populate form when edit data loads
    useEffect(() => {
        if (isEdit && editProduct) {
            const data = {
                title: editProduct.title ?? "",
                slug: editProduct.slug ?? "",
                category: editProduct.category ?? "Streetwear",
                shortDescription: editProduct.shortDescription ?? "",
                description: editProduct.description ?? "",
                manufacturingStory: (editProduct as any).manufacturingStory ?? "",
                manufacturingInfographic: (editProduct as any).manufacturingInfographic ?? "",
                mainImage: editProduct.mainImage ?? "",
                samplePrice: editProduct.samplePrice ?? "",
                weight: editProduct.weight ?? "",
                material: editProduct.material ?? "",
                availableSizes: editProduct.availableSizes ?? '["S", "M", "L", "XL", "2XL"]',
                availableColors: editProduct.availableColors ?? '["Black", "White", "Navy"]',
                isFeatured: !!editProduct.isFeatured,
                isActive: !!editProduct.isActive,
                freeShipping: !!editProduct.freeShipping,
                sortOrder: editProduct.sortOrder ?? 0,
                seoTitle: editProduct.seoTitle ?? "",
                seoDescription: editProduct.seoDescription ?? "",
                seoKeywords: editProduct.seoKeywords ?? "",
            };
            setForm(data);
            setInitialForm(data);

            if (editProduct.slabs) {
                setSlabs(editProduct.slabs.map((s: any) => ({
                    minQty: s.minQty, maxQty: s.maxQtyRow ? s.maxQtyRow : s.maxQty, pricePerUnit: s.pricePerUnit, label: s.label ?? "", sortOrder: s.sortOrder,
                })));
            }

            if (editProduct.sizeChart) {
                setSizeChart({
                    chartData: editProduct.sizeChart.chartData ?? JSON.stringify([]),
                    unit: editProduct.sizeChart.unit as "inches" | "cm" ?? "inches",
                    notes: editProduct.sizeChart.notes ?? "",
                });
            }
        }
    }, [isEdit, editProduct]);

    const handleImagesUpload = async (savedProductId: number) => {
        if (pendingImages.length === 0) return form.mainImage;

        setUploadingImages(true);
        let selectedUploadedUrl = form.mainImage;

        try {
            for (let i = 0; i < pendingImages.length; i++) {
                const p = pendingImages[i];
                const base64 = await fileToBase64(p.file);
                const { url } = await uploadImageMutation.mutateAsync({
                    productId: savedProductId,
                    imageBase64: base64,
                    mimeType: p.file.type || "image/jpeg",
                    altText: p.altText || form.title,
                    sortOrder: p.sortOrder,
                });
                if (i === pendingMainImageIndex) {
                    selectedUploadedUrl = url;
                }
            }
        } finally {
            setUploadingImages(false);
        }
        return selectedUploadedUrl;
    };

    const createMutation = trpc.product.create.useMutation({
        onSuccess: async (product) => {
            const newMainImage = await handleImagesUpload(product.id);
            if (newMainImage && newMainImage !== product.mainImage) {
                await mainImagePatchMutation.mutateAsync({ id: product.id, mainImage: newMainImage });
            }
            utils.product.adminList.invalidate();
            toast.success("Product created successfully!");
            setLocation("/admin-saad");
        },
        onError: (e) => toast.error("Failed to create product", { description: e.message }),
    });

    const updateMutation = trpc.product.update.useMutation({
        onSuccess: async (_, variables) => {
            const newMainImage = await handleImagesUpload(variables.id);
            if (newMainImage && newMainImage !== variables.mainImage && newMainImage !== form.mainImage) {
                await mainImagePatchMutation.mutateAsync({ id: variables.id, mainImage: newMainImage });
            }
            utils.product.adminList.invalidate();
            toast.success("Product updated successfully!");
            setLocation("/admin-saad");
        },
        onError: (e) => toast.error("Failed to update product", { description: e.message }),
    });

    const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const handleAiFill = async () => {
        if (pendingImages.length > 0) {
            setIsAiLoading(true);
            toast.info("AI is analyzing your product image...", { id: "ai-fill" });
            try {
                const firstImage = pendingImages[0].file;
                const base64 = await fileToBase64(firstImage);

                const { product } = await aiAnalyzeImageMutation.mutateAsync({ base64, mimeType: firstImage.type || "image/jpeg" });

                let infographicUrl = "";
                if (product.infographicPrompt) {
                    toast.info("Generating manufacturing infographic...", { id: "ai-fill" });
                    try {
                        const infoRes = await generateInfographicMutation.mutateAsync({ prompt: product.infographicPrompt });
                        infographicUrl = infoRes.imageUrl;
                    } catch (err) { console.warn("Failed to generate infographic during auto-fill", err); }
                }

                const sanitizePrice = (p: string | undefined) => {
                    if (!p) return "";
                    const n = parseFloat(String(p).replace(/[^0-9.]/g, ""));
                    return isNaN(n) ? "" : n.toFixed(2);
                };

                setForm(prev => ({
                    ...prev,
                    title: product.title || prev.title,
                    slug: autoSlug(product.slug || product.title || prev.slug).substring(0, 250),
                    category: product.category || prev.category,
                    shortDescription: product.shortDescription || prev.shortDescription,
                    description: product.description || prev.description,
                    manufacturingStory: product.manufacturingStory || prev.manufacturingStory,
                    manufacturingInfographic: infographicUrl || prev.manufacturingInfographic,
                    material: product.material || prev.material,
                    weight: product.weight || prev.weight,
                    availableSizes: JSON.stringify(product.availableSizes || ["S", "M", "L", "XL"]),
                    availableColors: JSON.stringify(product.availableColors || []),
                    samplePrice: sanitizePrice(product.samplePrice) || prev.samplePrice,
                    seoTitle: product.seoTitle || prev.seoTitle,
                    seoDescription: product.seoDescription || prev.seoDescription,
                    seoKeywords: product.seoKeywords || prev.seoKeywords,
                }));

                if (product.moqSlabs && product.moqSlabs.length > 0) {
                    setSlabs(product.moqSlabs.map((s: any, idx: number) => ({
                        minQty: Number(s.minQty) || 1,
                        maxQty: s.maxQty != null ? Number(s.maxQty) : null,
                        pricePerUnit: sanitizePrice(s.pricePerUnit) || "0.00",
                        sortOrder: idx,
                        label: s.label || "",
                    })));
                }

                toast.success("Image analyzed! All fields are pre-filled below.", { id: "ai-fill" });
                window.scrollBy({ top: 400, behavior: 'smooth' });
            } catch (e: any) {
                toast.error(e.message || "Failed to analyze image", { id: "ai-fill" });
            } finally {
                setIsAiLoading(false);
            }
            return;
        }

        if (!form.title.trim()) {
            toast.error("Please provide a Title or upload an Image first to use AI generation");
            return;
        }
        setIsAiLoading(true);
        toast.info("AI is researching your product...", { id: "ai-fill" });
        try {
            const { product } = await aiGenerateMutation.mutateAsync({ description: form.title });

            let infographicUrl = "";
            if (product.infographicPrompt) {
                toast.info("Generating manufacturing infographic...", { id: "ai-fill" });
                try {
                    const infoRes = await generateInfographicMutation.mutateAsync({ prompt: product.infographicPrompt });
                    infographicUrl = infoRes.imageUrl;
                } catch (err) { console.warn("Failed to generate infographic during auto-fill", err); }
            }

            const sanitizePrice = (p: string | undefined) => {
                if (!p) return "";
                const n = parseFloat(String(p).replace(/[^0-9.]/g, ""));
                return isNaN(n) ? "" : n.toFixed(2);
            };
            setForm(f => ({
                ...f,
                slug: autoSlug(product.slug || product.title).substring(0, 250),
                category: (product.category || f.category).substring(0, 100),
                shortDescription: (product.shortDescription || f.shortDescription).substring(0, 500),
                description: product.description || f.description,
                manufacturingStory: product.manufacturingStory || f.manufacturingStory,
                manufacturingInfographic: infographicUrl || f.manufacturingInfographic,
                material: (product.material || f.material).substring(0, 250),
                availableSizes: Array.isArray(product.availableSizes) ? JSON.stringify(product.availableSizes) : f.availableSizes,
                availableColors: Array.isArray(product.availableColors) ? JSON.stringify(product.availableColors) : f.availableColors,
                samplePrice: sanitizePrice(product.samplePrice) || f.samplePrice,
                weight: sanitizePrice(product.weight) || f.weight,
                seoTitle: (product.seoTitle || f.seoTitle).substring(0, 250),
                seoDescription: product.seoDescription || f.seoDescription,
                seoKeywords: (product.seoKeywords || f.seoKeywords).substring(0, 250),
            }));
            if (product.moqSlabs?.length) {
                setSlabs(product.moqSlabs.map((s: any, i: number) => ({
                    minQty: Number(s.minQty) || 1,
                    maxQty: s.maxQty != null ? Number(s.maxQty) : null,
                    pricePerUnit: sanitizePrice(s.pricePerUnit) || "0.00",
                    label: s.label || "",
                    sortOrder: i,
                })));
            }
            toast.success("AI filled all fields!", { id: "ai-fill", description: "Review and adjust before saving" });
            window.scrollBy({ top: 400, behavior: 'smooth' });
        } catch (err: any) {
            toast.error("AI fill failed", { id: "ai-fill", description: err.message });
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleSubmit = () => {
        if (!form.title || !form.slug || !form.category) {
            toast.error("Title, slug, and category are required");
            return;
        }
        const payload = {
            ...form,
            slabs,
            sizeChart,
            samplePrice: form.samplePrice === "" ? undefined : form.samplePrice,
            weight: form.weight === "" ? undefined : form.weight
        };
        if (isEdit && productId) {
            updateMutation.mutate({ id: productId, ...payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((f, i) => ({
                file: f,
                preview: URL.createObjectURL(f),
                altText: "",
                sortOrder: pendingImages.length + i,
            }));
            setPendingImages(prev => [...prev, ...newFiles]);
        }
    };

    const removePendingImage = (index: number) => {
        setPendingImages(prev => prev.filter((_, i) => i !== index));
        if (pendingMainImageIndex === index) {
            setPendingMainImageIndex(0);
        } else if (pendingMainImageIndex > index) {
            setPendingMainImageIndex(prev => prev - 1);
        }
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const isPending = createMutation.isPending || updateMutation.isPending || uploadingImages;

    return (
        <AdminLayout>
            {/* Floating Save Bar (Shopify Style) */}
            <div className={`fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md border-b border-border shadow-2xl transition-all duration-300 transform ${isDirty ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
                <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                        <span className="text-sm font-bold text-background uppercase tracking-widest hidden sm:inline">Unsaved Changes</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" className="text-background hover:bg-background/10 hover:text-background font-condensed uppercase tracking-wider text-xs" onClick={() => { setForm(initialForm); setIsDirty(false); }}>
                            Discard
                        </Button>
                        <Button onClick={handleSubmit} disabled={isPending} className="bg-gold text-black hover:bg-white font-condensed font-bold uppercase tracking-widest px-8">
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            {isEdit ? "Save Changes" : "Publish Product"}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-8 pb-20">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-2xl font-bold text-foreground">
                            {isEdit ? "Edit Product" : "Add New Product"}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
                            {isEdit ? "Modify your existing listing" : "Create a new product listing from scratch or using AI"}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {form.slug && (
                            <Button variant="secondary" onClick={() => window.open(`/shop/${form.slug}`, '_blank')} disabled={isPending} title="Save changes first before previewing if you made edits." className="hidden sm:inline-flex">
                                <Eye className="w-4 h-4 mr-2" /> Preview
                            </Button>
                        )}
                        <Button variant="outline" onClick={() => setLocation("/admin-saad/products")} disabled={isPending}>
                            Discard
                        </Button>
                        <Button onClick={handleSubmit} disabled={isPending} className="bg-gold text-black hover:bg-gold-light">
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            {uploadingImages ? "Uploading..." : isEdit ? "Save Changes" : "Create Product"}
                        </Button>
                    </div>
                </div>

                {/* Step 1: AI Visual Uploader (Prominent!) */}
                <section className="bg-gradient-to-br from-card to-card/50 border border-gold/30 rounded-2xl overflow-hidden shadow-lg shadow-gold/5">
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                            <Wand2 className="w-8 h-8 text-gold" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Step 1: AI Generation</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                            Upload your product photos first. Our advanced AI will analyze the styling, fabric, and features to automatically write your entire product listing, including SEO and pricing slabs.
                        </p>

                        <div className="w-full max-w-2xl bg-secondary/50 border-2 border-dashed border-border rounded-xl p-8 hover:border-gold/50 transition-colors cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                            <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
                            <div className="flex flex-col items-center">
                                <ImagePlus className="w-12 h-12 text-muted-foreground group-hover:text-gold transition-colors mb-3" />
                                <h3 className="text-lg font-bold text-foreground">Click to Upload Images</h3>
                                <p className="text-sm text-muted-foreground mt-1 text-center">
                                    Drag and drop or browse. First image is used as the main display. Valid formats: JPG, PNG, WEBP.
                                </p>
                            </div>
                        </div>

                        {pendingImages.length > 0 && (
                            <div className="w-full max-w-3xl mt-8">
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    {pendingImages.map((img, i) => (
                                        <div key={i} className="relative group rounded-lg border border-border overflow-hidden bg-background aspect-[2/3] shadow-md">
                                            <img src={img.preview} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                {pendingMainImageIndex !== i && (
                                                    <Button type="button" size="sm" variant="secondary" className="h-8 text-xs font-condensed" onClick={(e) => { e.stopPropagation(); setPendingMainImageIndex(i); }}>
                                                        Set Main
                                                    </Button>
                                                )}
                                                <Button type="button" size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); removePendingImage(i); }}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            {pendingMainImageIndex === i && <span className="absolute top-2 left-2 bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">MAIN</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button
                            size="lg"
                            onClick={handleAiFill}
                            disabled={isAiLoading || (pendingImages.length === 0 && !form.title.trim())}
                            className="mt-8 bg-foreground text-background hover:bg-foreground/90 font-condensed tracking-widest text-base shadow-xl h-14 px-8 min-w-[300px]"
                        >
                            {isAiLoading ? (
                                <><Loader2 className="w-5 h-5 animate-spin mr-3" /> Analyzing...</>
                            ) : pendingImages.length > 0 ? (
                                <><Sparkles className="w-5 h-5 mr-3" /> Auto-Fill Listing from Image</>
                            ) : (
                                <><Sparkles className="w-5 h-5 mr-3" /> Generate using Title Text</>
                            )}
                        </Button>
                    </div>
                </section>

                {/* Existing Images (if Edit) */}
                {isEdit && (editProduct as any)?.images?.length > 0 && (
                    <div className="space-y-2 mt-4 pt-4 border-t border-border">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Current Images</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {(editProduct as any)?.images.map((img: any) => (
                                <div key={img.id} className="relative group rounded border border-border overflow-hidden bg-background aspect-[2/3] shadow-sm hover:shadow-md transition-all">
                                    <img src={img.imageUrl} alt={img.altText || "Product Image"} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        {form.mainImage !== img.imageUrl && (
                                            <Button type="button" size="sm" variant="secondary" className="h-8 text-xs font-condensed" onClick={(e) => { e.stopPropagation(); setForm(f => ({ ...f, mainImage: img.imageUrl })); setPendingMainImageIndex(-1); }}>
                                                Set Main
                                            </Button>
                                        )}
                                        <Button type="button" size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); if (confirm('Delete this image?')) deleteImageMutation.mutate({ id: img.id }); }}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    {form.mainImage === img.imageUrl && pendingMainImageIndex === -1 && <span className="absolute top-2 left-2 bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">MAIN</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <hr className="border-border" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Basic Details & Text */}
                    <div className="lg:col-span-8 space-y-8">
                        <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-secondary/40 px-6 py-4 border-b border-border">
                                <h3 className="font-serif text-lg font-bold text-foreground">Basic Information</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Product Title <span className="text-red-500">*</span></Label>
                                    <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: autoSlug(e.target.value) }))} placeholder="e.g. Custom Waterproof Ski Jacket" className="bg-background h-12 text-lg font-serif" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Category <span className="text-red-500">*</span></Label>
                                        <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                                            <SelectTrigger className="bg-background h-12">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-card">
                                                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">URL Slug <span className="text-red-500">*</span></Label>
                                        <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="bg-background h-12 font-mono" />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Short Description</Label>
                                    <Input value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} placeholder="Brief product summary for cards..." className="bg-background h-12" />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Full Description</Label>
                                    <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={6} className="bg-background leading-relaxed" />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Manufacturing Story</Label>
                                    <Textarea value={form.manufacturingStory} onChange={e => setForm(f => ({ ...f, manufacturingStory: e.target.value }))} rows={4} className="bg-background leading-relaxed" />
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Manufacturing Infographic URL</Label>
                                    <Input value={form.manufacturingInfographic} onChange={e => setForm(f => ({ ...f, manufacturingInfographic: e.target.value }))} placeholder="https://..." className="bg-background h-12" />
                                    {form.manufacturingInfographic && (
                                        <div className="mt-2">
                                            <img src={form.manufacturingInfographic} alt="Infographic" className="max-h-32 rounded border border-border" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-secondary/40 px-6 py-4 border-b border-border">
                                <h3 className="font-serif text-lg font-bold text-foreground">Specs & Variations</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Material</Label>
                                    <Input value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} placeholder="100% Cotton" className="bg-background" />
                                </div>
                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Weight (kg)</Label>
                                    <Input value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} placeholder="0.5" type="number" step="0.01" className="bg-background" />
                                </div>
                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Colors (JSON Array)</Label>
                                    <Input value={form.availableColors} onChange={e => setForm(f => ({ ...f, availableColors: e.target.value }))} className="bg-background font-mono text-sm" />
                                </div>
                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Sizes (JSON Array)</Label>
                                    <Input value={form.availableSizes} onChange={e => setForm(f => ({ ...f, availableSizes: e.target.value }))} className="bg-background font-mono text-sm" />
                                </div>
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-secondary/40 px-6 py-4 border-b border-border">
                                <h3 className="font-serif text-lg font-bold text-foreground">Size Chart</h3>
                            </div>
                            <div className="p-6">
                                <SizeChartEditor value={sizeChart} onChange={setSizeChart} />
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Pricing, SEO, State */}
                    <div className="lg:col-span-4 space-y-8">
                        <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-secondary/40 px-6 py-4 border-b border-border">
                                <h3 className="font-serif text-lg font-bold text-foreground">Pricing & MOQ</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Sample Price (USD)</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                                        <Input value={form.samplePrice} onChange={e => setForm(f => ({ ...f, samplePrice: e.target.value }))} placeholder="25.00" className="bg-background h-12 pl-8 text-lg font-semibold" />
                                    </div>
                                </div>
                                <SlabEditor slabs={slabs} onChange={setSlabs} />
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-secondary/40 px-6 py-4 border-b border-border">
                                <h3 className="font-serif text-lg font-bold text-foreground">Visibility</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                {[
                                    { key: "isActive", label: "Active Status", desc: "Visible to customers", icon: Eye },
                                    { key: "isFeatured", label: "Featured Product", desc: "Highlight on homepage", icon: Star },
                                    { key: "freeShipping", label: "Free Shipping", desc: "Exempt from shipping costs", icon: Truck },
                                ].map(({ key, label, desc, icon: Icon }) => (
                                    <div key={key} className="flex items-start justify-between bg-background rounded-lg p-4 border border-border">
                                        <div className="flex gap-3">
                                            <div className="mt-1"><Icon className="w-5 h-5 text-gold" /></div>
                                            <div>
                                                <Label className="text-sm font-bold text-foreground">{label}</Label>
                                                <p className="text-xs text-muted-foreground leading-tight mt-1">{desc}</p>
                                            </div>
                                        </div>
                                        <Switch checked={form[key as keyof typeof form] as boolean} onCheckedChange={v => setForm(f => ({ ...f, [key]: v }))} className="mt-1" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-secondary/40 px-6 py-4 border-b border-border">
                                <h3 className="font-serif text-lg font-bold text-foreground">Search Engine (SEO)</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Meta Title</Label>
                                    <Input value={form.seoTitle} onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))} className="bg-background" />
                                    <p className={`text-[10px] mt-1 ${form.seoTitle.length > 60 ? "text-red-400" : "text-muted-foreground"}`}>{form.seoTitle.length}/60 chars</p>
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Meta Keywords</Label>
                                    <Input value={form.seoKeywords} onChange={e => setForm(f => ({ ...f, seoKeywords: e.target.value }))} className="bg-background" />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Meta Description</Label>
                                    <Textarea value={form.seoDescription} onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))} rows={4} className="bg-background resize-none text-xs" />
                                    <p className={`text-[10px] mt-1 ${form.seoDescription.length > 160 ? "text-red-400" : "text-muted-foreground"}`}>{form.seoDescription.length}/160 chars</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
