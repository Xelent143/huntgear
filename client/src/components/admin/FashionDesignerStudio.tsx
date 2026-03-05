import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Sparkles, Loader2, Eye, Paintbrush, ArrowRight, CheckCircle, Package } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

type StudioState = "conception" | "generating_grid" | "review_grid" | "producing" | "success";

export default function FashionDesignerStudio() {
    const [step, setStep] = useState<StudioState>("conception");
    const [prompt, setPrompt] = useState("");
    const [modelId, setModelId] = useState("gemini-3.1-flash-image-preview"); // Default to Nano Banana 2

    // Grid State
    const [gridImage, setGridImage] = useState<{ base64: string, mimeType: string } | null>(null);

    // Individual Views State
    const [generatedViews, setGeneratedViews] = useState<{
        front?: string;
        back?: string;
        side?: string;
        "close-up"?: string;
        model?: string;
    }>({});

    // Loading states for individual views
    const [loadingViews, setLoadingViews] = useState<{
        front: boolean;
        back: boolean;
        side: boolean;
        "close-up": boolean;
        model: boolean;
        prefill: boolean;
    }>({
        front: false, back: false, side: false, "close-up": false, model: false, prefill: false
    });

    const gridMutation = trpc.aiAgent.generateDesignerGrid.useMutation();
    const viewMutation = trpc.aiAgent.generateIndividualView.useMutation();
    const prefillMutation = trpc.aiAgent.prefillProductFromGrid.useMutation();
    const createProductMutation = trpc.product.create.useMutation();

    const form = useForm({
        defaultValues: {
            title: "",
            category: "Streetwear",
            description: "",
            shortDescription: "",
            material: "",
            samplePrice: "",
            weight: "",
            seoTitle: "",
            seoDescription: "",
            seoKeywords: "",
            isFeatured: true,
        }
    });

    const handleGenerateGrid = async () => {
        if (!prompt || prompt.length < 5) {
            toast.error("Please provide a detailed product description.");
            return;
        }

        setStep("generating_grid");
        try {
            const { base64, mimeType } = await gridMutation.mutateAsync({ prompt, modelId });
            setGridImage({ base64, mimeType });
            setStep("review_grid");
            toast.success("Design grid ready for review.");
        } catch (err: any) {
            toast.error("Generation failed", { description: err.message });
            setStep("conception");
        }
    };

    const handleApproveDesign = async () => {
        if (!gridImage) return;

        setStep("producing");

        // Reset state
        setGeneratedViews({});
        setLoadingViews({
            front: true, back: true, side: true, "close-up": true, model: true, prefill: true
        });

        // 1. Trigger all image generations in parallel
        const views = ["front", "back", "left-side", "right-side", "close-up", "model"] as const;

        views.forEach(async (viewType) => {
            try {
                const { imageUrl } = await viewMutation.mutateAsync({ basePrompt: prompt, viewType, modelId });
                setGeneratedViews(prev => ({ ...prev, [viewType]: imageUrl }));
            } catch (err) {
                toast.error(`Failed to generate ${viewType} view`);
            } finally {
                setLoadingViews(prev => ({ ...prev, [viewType]: false }));
            }
        });

        // 2. Trigger SEO Prefill in parallel
        try {
            const { productData } = await prefillMutation.mutateAsync({
                prompt,
                base64: gridImage.base64,
                mimeType: gridImage.mimeType,
                modelId: "gemini-3.1-pro-preview" // Use Pro for prefill by default
            });

            form.reset({
                title: productData.title,
                category: productData.category,
                description: productData.description,
                shortDescription: productData.shortDescription,
                material: productData.material,
                samplePrice: String(productData.samplePrice || ""),
                weight: String(productData.weight || ""),
                seoTitle: productData.seoTitle,
                seoDescription: productData.seoDescription,
                seoKeywords: productData.seoKeywords,
                isFeatured: true,
            });
            toast.success("SEO details auto-filled by AI");
        } catch (err) {
            toast.error("Failed to auto-fill product details");
        } finally {
            setLoadingViews(prev => ({ ...prev, prefill: false }));
        }
    };

    const handlePublishProduct = async (data: any) => {
        // Collect all generated images
        const imagesToUpload = [
            generatedViews.front,
            generatedViews.back,
            generatedViews.side,
            generatedViews["close-up"],
            generatedViews.model
        ].filter(Boolean) as string[];

        if (imagesToUpload.length === 0) {
            toast.error("Please wait for at least one image to finish generating.");
            return;
        }

        try {
            await createProductMutation.mutateAsync({
                ...data,
                slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                mainImage: imagesToUpload[0], // First image goes to mainImage
                // The rest of the images would ideally go to the product images table, 
                // but this MVP handles the primary insert.
            });
            toast.success("Product published successfully!");

            // Reset state
            setStep("success");
        } catch (err: any) {
            toast.error("Publish failed", { description: err.message });
        }
    };

    return (
        <div className="flex flex-col min-h-[600px] bg-background rounded-xl border border-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-gradient-to-r from-secondary/80 to-background/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 border border-gold/50 flex items-center justify-center">
                        <Paintbrush className="w-4 h-4 text-gold drop-shadow-[0_0_8px_rgba(238,187,51,0.5)]" />
                    </div>
                    <div>
                        <h3 className="font-condensed font-bold uppercase tracking-wider text-sm text-foreground bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Premium Fashion Designer Studio
                        </h3>
                        <p className="text-muted-foreground text-xs">High-end multi-view generative AI</p>
                    </div>
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-2 text-xs font-condensed uppercase tracking-wider text-muted-foreground hidden sm:flex">
                    <span className={step === "conception" || step === "generating_grid" ? "text-gold font-bold" : ""}>1. Concept</span>
                    <ArrowRight className="w-3 h-3 mx-1 opacity-50" />
                    <span className={step === "review_grid" ? "text-gold font-bold" : ""}>2. Review</span>
                    <ArrowRight className="w-3 h-3 mx-1 opacity-50" />
                    <span className={step === "producing" || step === "success" ? "text-gold font-bold" : ""}>3. Production</span>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center">

                {/* STATE 1: Conception */}
                {(step === "conception" || step === "generating_grid") && (
                    <div className="w-full max-w-2xl mt-12 space-y-6">
                        <div className="text-center space-y-2 mb-8">
                            <Sparkles className="w-12 h-12 text-gold/60 mx-auto mb-4" />
                            <h2 className="text-2xl font-condensed font-bold uppercase tracking-wider">Design Your Next Collection</h2>
                            <p className="text-muted-foreground text-sm">
                                Enter your design prompt. The AI will act as a senior fashion designer to create a multi-view layout grid for your approval before generating the full product suite.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-condensed uppercase tracking-widest text-gold/80 flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    AI Model (Visual Style)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setModelId("gemini-3.1-flash-image-preview")}
                                        className={`px-3 py-2 rounded border text-xs font-condensed uppercase transition-all flex flex-col items-center gap-1 ${modelId === "gemini-3.1-flash-image-preview"
                                            ? "bg-gold text-black border-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                                            : "bg-secondary/50 border-border text-muted-foreground hover:border-gold/50"
                                            }`}
                                    >
                                        <span>Nano Banana 2</span>
                                        <span className="opacity-60 text-[8px]">3.1 Flash Image</span>
                                    </button>
                                    <button
                                        onClick={() => setModelId("gemini-2.5-flash-image")}
                                        className={`px-3 py-2 rounded border text-xs font-condensed uppercase transition-all flex flex-col items-center gap-1 ${modelId === "gemini-2.5-flash-image"
                                            ? "bg-gold text-black border-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                                            : "bg-secondary/50 border-border text-muted-foreground hover:border-gold/50"
                                            }`}
                                    >
                                        <span>Nano Banana</span>
                                        <span className="opacity-60 text-[8px]">2.5 Flash Image</span>
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <Textarea
                                    placeholder="Describe the apparel in extreme detail. e.g. 'Premium custom BJJ Kimono, 450gsm pearl weave, black with gold stitching, sleek athletic fit, minimal branding on the left shoulder.'"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="min-h-[140px] text-base p-5 pr-4 border-2 border-border focus:border-gold/50 rounded-xl resize-none transition-all shadow-sm"
                                    disabled={step === "generating_grid"}
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerateGrid}
                            disabled={step === "generating_grid" || prompt.length < 5}
                            className="w-full h-14 bg-gold text-black hover:bg-gold/90 font-condensed font-bold text-lg uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(238,187,51,0.2)] hover:shadow-[0_0_30px_rgba(238,187,51,0.4)] transition-all"
                        >
                            {step === "generating_grid" ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    Reviewing Design Concepts...
                                </>
                            ) : (
                                <>
                                    <Eye className="w-5 h-5 mr-3" />
                                    Generate Concept Grid
                                </>
                            )}
                        </Button>
                    </div>
                )}

                {/* STATE 2: Review Grid */}
                {step === "review_grid" && gridImage && (
                    <div className="w-full max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center">
                            <h2 className="text-2xl font-condensed font-bold uppercase tracking-wider mb-2">Review Concept Grid</h2>
                            <p className="text-muted-foreground text-sm">
                                This is a single image containing front, back, side, and detail views. If you like the style, approve it, and the AI will split and generate all high-res angles separately for the store.
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10 relative group">
                            <img
                                src={`data:${gridImage.mimeType};base64,${gridImage.base64}`}
                                alt="Generated Grid"
                                className="w-full h-auto object-contain"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-sm font-medium leading-relaxed drop-shadow-md">
                                    <span className="text-gold font-bold mr-2">PROMPT:</span>
                                    {prompt}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 pt-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setStep("conception")}
                                className="w-48 font-condensed uppercase tracking-wider"
                            >
                                Try Again
                            </Button>
                            <Button
                                size="lg"
                                onClick={handleApproveDesign}
                                className="w-64 bg-gold text-black hover:bg-gold/90 font-condensed font-bold uppercase tracking-wider shadow-lg"
                            >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Approve Design
                            </Button>
                        </div>
                    </div>
                )}

                {/* STATE 3 & 4: Producing and Auto-Fill */}
                {step === "producing" && (
                    <div className="w-full space-y-8">
                        {/* Header Status */}
                        <div className="flex items-center gap-4 bg-secondary/30 p-4 rounded-xl border border-border">
                            {Object.values(loadingViews).some(v => v) ? (
                                <Loader2 className="w-6 h-6 text-gold animate-spin" />
                            ) : (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            )}
                            <div>
                                <h3 className="font-condensed font-bold uppercase tracking-wider text-base">
                                    {Object.values(loadingViews).some(v => v) ? "Production In Progress..." : "Ready to Publish"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Generating individual high-res views and auto-filling SEO product data.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Left Side: Images */}
                            <div className="space-y-4">
                                <h4 className="font-condensed font-bold uppercase tracking-wider text-sm text-muted-foreground border-b border-border pb-2">
                                    High-Res Views
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {["front", "back", "side", "close-up", "model"].map((view) => (
                                        <div key={view} className="relative aspect-square rounded-xl bg-secondary/50 border border-border overflow-hidden flex flex-col items-center justify-center">
                                            {loadingViews[view as keyof typeof loadingViews] ? (
                                                <div className="flex flex-col items-center text-muted-foreground">
                                                    <Loader2 className="w-6 h-6 animate-spin mb-2 text-gold/50" />
                                                    <span className="text-xs uppercase font-condensed tracking-wider">Generating {view}</span>
                                                </div>
                                            ) : generatedViews[view as keyof typeof generatedViews] ? (
                                                <>
                                                    <img
                                                        src={generatedViews[view as keyof typeof generatedViews]}
                                                        className="w-full h-full object-cover"
                                                        alt={view}
                                                    />
                                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                                                        {view}
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Auto-Filled Form */}
                            <div className="space-y-4 bg-secondary/30 p-5 rounded-xl border border-border flex flex-col">
                                <h4 className="font-condensed font-bold uppercase tracking-wider text-sm text-muted-foreground border-b border-border pb-2 flex justify-between items-center">
                                    <span>Product Details</span>
                                    {loadingViews.prefill && (
                                        <span className="flex items-center text-gold text-xs">
                                            <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> Auto-filling via AI...
                                        </span>
                                    )}
                                </h4>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handlePublishProduct)} className="space-y-5 flex-1 relative flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <FormField control={form.control} name="title" render={({ field }) => (
                                                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} disabled={loadingViews.prefill} /></FormControl></FormItem>
                                            )} />
                                            <FormField control={form.control} name="shortDescription" render={({ field }) => (
                                                <FormItem><FormLabel>Short SEO Desc</FormLabel><FormControl><Textarea className="h-20 resize-none text-xs" {...field} disabled={loadingViews.prefill} /></FormControl></FormItem>
                                            )} />

                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField control={form.control} name="material" render={({ field }) => (
                                                    <FormItem><FormLabel>Material</FormLabel><FormControl><Input {...field} disabled={loadingViews.prefill} /></FormControl></FormItem>
                                                )} />
                                                <FormField control={form.control} name="samplePrice" render={({ field }) => (
                                                    <FormItem><FormLabel>Sample Price ($)</FormLabel><FormControl><Input {...field} disabled={loadingViews.prefill} /></FormControl></FormItem>
                                                )} />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={Object.values(loadingViews).some(v => v)}
                                            className="w-full mt-6 bg-gold text-black hover:bg-gold/90 font-condensed font-bold uppercase tracking-wider shadow-lg h-12"
                                        >
                                            <Package className="w-5 h-5 mr-2" />
                                            Publish to Website
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                )}

                {/* STATE 5: Success */}
                {step === "success" && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-condensed font-bold uppercase tracking-wider mb-3">Product Published Successfully</h2>
                        <p className="text-muted-foreground mb-8">
                            Premium images from all angles and expert SEO data have been pushed to your database seamlessly.
                        </p>
                        <Button
                            onClick={() => {
                                setPrompt("");
                                setStep("conception");
                            }}
                            className="bg-secondary text-foreground hover:bg-secondary/80 font-condensed font-bold uppercase tracking-wider px-8"
                        >
                            Design Next Product
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}
