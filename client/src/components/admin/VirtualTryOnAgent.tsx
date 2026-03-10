import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Upload, X, ImagePlus, Loader2, Sparkles, CheckCircle, Wand2, ArrowRight
} from "lucide-react";
import { fileToBase64 } from "@/lib/utils";

interface ImageData {
    base64: string;
    mimeType: string;
    preview: string;
}

export default function VirtualTryOnAgent({ onUseImage }: { onUseImage?: (url: string, base64: string, mimeType: string) => void }) {
    // ─── API Hooks ─────────────────────────────────────────────────────────────
    const utils = trpc.useUtils();

    const { data: savedModel, isLoading: isLoadingModel } = trpc.adminSettings.getModelImage.useQuery();

    const saveModelMutation = trpc.adminSettings.saveModelImage.useMutation({
        onSuccess: () => {
            utils.adminSettings.getModelImage.invalidate();
            toast.success("Model image saved successfully!");
            setHasUnsavedModel(false);
        },
        onError: (err) => toast.error(err.message),
    });

    const generateMutation = trpc.aiAgent.generateTryOnImage.useMutation({
        onSuccess: (data) => {
            setGeneratedImageUrl(data.imageUrl);
            toast.success("Virtual Try-On successful!");
        },
        onError: (err) => toast.error(err.message),
    });

    // ─── State ─────────────────────────────────────────────────────────────────
    const [modelImage, setModelImage] = useState<ImageData | null>(null);
    const [hasUnsavedModel, setHasUnsavedModel] = useState(false);

    const [referenceImages, setReferenceImages] = useState<ImageData[]>([]);
    const [logoImage, setLogoImage] = useState<ImageData | null>(null);
    const [prompt, setPrompt] = useState("Place the extracted garment on the model naturally.");

    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

    // Refs for file inputs
    const modelInputRef = useRef<HTMLInputElement>(null);
    const refInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);

    // Load saved model on mount
    useEffect(() => {
        if (savedModel && !hasUnsavedModel) {
            setModelImage({
                base64: savedModel.base64,
                mimeType: savedModel.mimeType,
                preview: `data:${savedModel.mimeType};base64,${savedModel.base64}`
            });
        }
    }, [savedModel, hasUnsavedModel]);

    // ─── Handlers ──────────────────────────────────────────────────────────────
    const handleModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        setModelImage({ base64: base64.split(",")[1], mimeType: file.type, preview: base64 });
        setHasUnsavedModel(true);
    };

    const handleReferenceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const newRefs = await Promise.all(
            files.map(async (file) => {
                const base64 = await fileToBase64(file);
                return { base64: base64.split(",")[1], mimeType: file.type, preview: base64 };
            })
        );
        setReferenceImages(prev => [...prev, ...newRefs]);
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        setLogoImage({ base64: base64.split(",")[1], mimeType: file.type, preview: base64 });
    };

    const handleGenerate = () => {
        if (!modelImage) return toast.error("Please upload or save a base model image first.");
        if (referenceImages.length === 0) return toast.error("Please upload at least one reference garment image.");

        generateMutation.mutate({
            prompt,
            modelImage: { base64: modelImage.base64, mimeType: modelImage.mimeType },
            referenceImages: referenceImages.map(img => ({ base64: img.base64, mimeType: img.mimeType })),
            logoImage: logoImage ? { base64: logoImage.base64, mimeType: logoImage.mimeType } : undefined,
        });
    };

    // ─── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in fade-in duration-500">
            {/* Left Column: Configuration */}
            <div className="space-y-6">

                {/* 1. Base Model Section */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-gold" /> Base Model
                        </h2>
                        {hasUnsavedModel && modelImage && (
                            <Button
                                size="sm"
                                className="h-7 text-xs bg-gold hover:bg-gold/90 text-black font-bold"
                                disabled={saveModelMutation.isPending}
                                onClick={() => saveModelMutation.mutate({ base64: modelImage.base64, mimeType: modelImage.mimeType })}
                            >
                                {saveModelMutation.isPending ? "Saving..." : "Save as Default Model"}
                            </Button>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                        Upload the core photo. The AI will preserve this person's pose, face, skin tone, and background, and only change their clothes.
                    </p>

                    {isLoadingModel ? (
                        <div className="h-32 flex items-center justify-center bg-secondary/30 rounded-lg animate-pulse">Loading saved model...</div>
                    ) : (
                        <div className="flex gap-4">
                            {modelImage ? (
                                <div className="relative group w-32 h-40 shrink-0">
                                    <img src={modelImage.preview} alt="Base model" className="w-full h-full object-cover rounded-lg border border-border" />
                                    <button
                                        onClick={() => { setModelImage(null); setHasUnsavedModel(false); }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="w-32 h-40 border-2 border-dashed border-border hover:border-gold/50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-secondary/10"
                                    onClick={() => modelInputRef.current?.click()}
                                >
                                    <Upload className="w-5 h-5 text-muted-foreground" />
                                    <span className="text-xs font-medium text-muted-foreground">Upload Model</span>
                                </div>
                            )}
                            <input type="file" ref={modelInputRef} className="hidden" accept="image/*" onChange={handleModelUpload} />
                        </div>
                    )}
                </div>

                {/* 2. Reference Garments Section */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2 mb-2">
                        <ClothesIcon className="w-4 h-4 text-gold" /> Reference Garment
                    </h2>
                    <p className="text-xs text-muted-foreground mb-4">
                        Upload 1-3 clear photos of the garment (flat lays or supplier photos). The AI will extract it to dress the model.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {referenceImages.map((img, i) => (
                            <div key={i} className="relative group w-24 h-24 shrink-0">
                                <img src={img.preview} alt={`Reference ${i}`} className="w-full h-full object-cover rounded-lg border border-border" />
                                <button
                                    onClick={() => setReferenceImages(prev => prev.filter((_, idx) => idx !== i))}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        {referenceImages.length < 3 && (
                            <div
                                className="w-24 h-24 border-2 border-dashed border-border hover:border-gold/50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-secondary/10"
                                onClick={() => refInputRef.current?.click()}
                            >
                                <ImagePlus className="w-5 h-5 text-muted-foreground" />
                            </div>
                        )}
                        <input type="file" ref={refInputRef} multiple className="hidden" accept="image/*" onChange={handleReferenceUpload} />
                    </div>
                </div>

                {/* 3. Logo Injection Section */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-gold" /> Apply Custom Logo (Optional)
                    </h2>
                    <p className="text-xs text-muted-foreground mb-4">
                        Upload your logo (PNG transparent is best). The AI will map it naturally onto the generated garment.
                    </p>

                    <div className="flex gap-4">
                        {logoImage ? (
                            <div className="relative group w-24 h-24 shrink-0 bg-secondary/50 rounded-lg flex items-center justify-center p-2 border border-border">
                                <img src={logoImage.preview} alt="Logo" className="w-full h-full object-contain" />
                                <button
                                    onClick={() => setLogoImage(null)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <div
                                className="w-24 h-24 border-2 border-dashed border-border hover:border-gold/50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-secondary/10"
                                onClick={() => logoInputRef.current?.click()}
                            >
                                <Upload className="w-5 h-5 text-muted-foreground" />
                            </div>
                        )}
                        <input type="file" ref={logoInputRef} className="hidden" accept="image/png, image/jpeg" onChange={handleLogoUpload} />
                    </div>
                </div>

            </div>

            {/* Right Column: Generation Workspace */}
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2 mb-4">
                    <Wand2 className="w-4 h-4 text-gold" /> Try-On Studio
                </h2>

                <div className="flex-1 bg-secondary/20 rounded-xl border border-border/50 flex flex-col items-center justify-center p-4 min-h-[400px] mb-4 overflow-hidden relative">
                    {generateMutation.isPending && (
                        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
                            <p className="text-sm font-medium text-foreground">Extracting garment and rendering try-on...</p>
                            <p className="text-xs text-muted-foreground">This may take up to 20 seconds</p>
                        </div>
                    )}

                    {generatedImageUrl ? (
                        <img src={generatedImageUrl} alt="Generated Try On" className="max-w-full max-h-full object-contain rounded-lg shadow-lg" />
                    ) : (
                        <div className="text-center max-w-sm">
                            <Wand2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-muted-foreground font-medium mb-1">Workspace Empty</h3>
                            <p className="text-xs text-muted-foreground/70">
                                Configure your model, garment, and logo on the left, then click Generate to see the photorealistic result here.
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <Input
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        placeholder="e.g. Put the garment on the model. Make the logo visible on the left chest."
                        className="bg-secondary/30"
                    />

                    <div className="flex gap-3">
                        <Button
                            className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold"
                            onClick={handleGenerate}
                            disabled={generateMutation.isPending || !modelImage || referenceImages.length === 0}
                        >
                            {generateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                            Generate Try-On
                        </Button>

                        {generatedImageUrl && (
                            <Button
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6"
                                onClick={() => {
                                    if (onUseImage && generatedImageUrl) {
                                        toast.info("Sending to Listing Agent...");
                                        onUseImage(generatedImageUrl, "", "");
                                    }
                                }}
                            >
                                <CheckCircle className="w-4 h-4 mr-2" /> Use & Create Listing
                            </Button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

// Minimal Icons
function UserIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
function ClothesIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg> }
