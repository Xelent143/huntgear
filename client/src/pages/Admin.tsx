import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import {
  Plus, Trash2, Edit, Eye, EyeOff, Star, Truck, Package, Bot, Sparkles,
  ChevronDown, Globe, ShoppingBag, Loader2, RefreshCw, Images, ImagePlus, GripVertical, Tag, MapPin, Crown, X, Upload
} from "lucide-react";
import AIProductAgent from "@/components/admin/AIProductAgent";
import AIImageOptimizer from "@/components/admin/AIImageOptimizer";
import FashionDesignerStudio from "@/components/admin/FashionDesignerStudio";

// ─── Shared Types handled in AdminNewProduct.tsx ──────────────────────────────

// ─── Shipping Zone Manager ────────────────────────────────────────────────────

function ShippingZoneManager() {
  const utils = trpc.useUtils();
  const { data: zones, isLoading } = trpc.shipping.adminZones.useQuery();
  const [editZone, setEditZone] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);

  const deleteMutation = trpc.shipping.deleteZone.useMutation({
    onSuccess: () => { utils.shipping.adminZones.invalidate(); toast.success("Zone deleted"); },
  });

  const createMutation = trpc.shipping.createZone.useMutation({
    onSuccess: () => { utils.shipping.adminZones.invalidate(); toast.success("Zone created"); setShowAdd(false); },
    onError: (e) => toast.error("Failed", { description: e.message }),
  });

  const updateMutation = trpc.shipping.updateZone.useMutation({
    onSuccess: () => { utils.shipping.adminZones.invalidate(); toast.success("Zone updated"); setEditZone(null); },
    onError: (e) => toast.error("Failed", { description: e.message }),
  });

  const [newZone, setNewZone] = useState({
    zoneName: "", countries: "", baseRate: "0.00",
    perUnitRate: "0.00", perKgRate: "0.00",
    minDays: 7, maxDays: 21, currency: "USD", isActive: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-condensed font-bold uppercase tracking-wider text-foreground">Shipping Zones</h3>
        <Button size="sm" onClick={() => setShowAdd(true)} className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider h-8">
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Zone
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading zones...
        </div>
      ) : (
        <div className="space-y-2">
          {(zones ?? []).length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Globe className="w-8 h-8 mx-auto mb-2 opacity-40" />
              No shipping zones yet. Add zones to enable checkout shipping calculation.
            </div>
          )}
          {(zones ?? []).map(zone => (
            <div key={zone.id} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3 border border-border">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-condensed font-semibold text-foreground text-sm">{zone.zoneName}</span>
                  <Badge variant={zone.isActive ? "default" : "secondary"} className={`text-xs ${zone.isActive ? "bg-green-600/20 text-green-400 border-green-600/30" : ""}`}>
                    {zone.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Base: ${zone.baseRate} · {zone.minDays}–{zone.maxDays} days · {zone.currency}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => setEditZone(zone)} className="h-7 w-7 text-muted-foreground hover:text-gold">
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate({ id: zone.id })} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Zone Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg text-foreground">Add Shipping Zone</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Zone Name</Label>
              <Input value={newZone.zoneName} onChange={e => setNewZone(z => ({ ...z, zoneName: e.target.value }))} placeholder="North America" className="bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Countries (JSON array of ISO codes)</Label>
              <Input value={newZone.countries} onChange={e => setNewZone(z => ({ ...z, countries: e.target.value }))} placeholder='["US","CA","MX"]' className="bg-secondary border-border font-mono text-xs" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Base Rate ($)</Label>
                <Input value={newZone.baseRate} onChange={e => setNewZone(z => ({ ...z, baseRate: e.target.value }))} className="bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Per Unit ($)</Label>
                <Input value={newZone.perUnitRate} onChange={e => setNewZone(z => ({ ...z, perUnitRate: e.target.value }))} className="bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Per Kg ($)</Label>
                <Input value={newZone.perKgRate} onChange={e => setNewZone(z => ({ ...z, perKgRate: e.target.value }))} className="bg-secondary border-border" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Min Days</Label>
                <Input type="number" value={newZone.minDays} onChange={e => setNewZone(z => ({ ...z, minDays: parseInt(e.target.value) || 7 }))} className="bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Max Days</Label>
                <Input type="number" value={newZone.maxDays} onChange={e => setNewZone(z => ({ ...z, maxDays: parseInt(e.target.value) || 21 }))} className="bg-secondary border-border" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => createMutation.mutate(newZone)} disabled={createMutation.isPending} className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider">
              {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Orders Table ─────────────────────────────────────────────────────────────

function OrdersTable() {
  const { data: orders, isLoading, refetch } = trpc.order.adminList.useQuery();
  const utils = trpc.useUtils();

  const updateStatus = trpc.order.updateStatus.useMutation({
    onSuccess: () => { utils.order.adminList.invalidate(); toast.success("Status updated"); },
  });

  const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    paid: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    processing: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    shipped: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    delivered: "bg-green-500/20 text-green-400 border-green-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    refunded: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-condensed font-bold uppercase tracking-wider text-foreground">Orders</h3>
        <Button size="sm" variant="outline" onClick={() => refetch()} className="h-8 text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading orders...
        </div>
      ) : (orders ?? []).length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
          No orders yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                {["Order #", "Customer", "Country", "Total", "Status", "Date", "Actions"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-condensed font-bold uppercase tracking-wider text-xs text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(orders ?? []).map(order => (
                <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gold font-bold">{order.orderNumber}</td>
                  <td className="px-4 py-3">
                    <p className="text-foreground text-xs font-semibold">{order.customerName}</p>
                    <p className="text-muted-foreground text-xs">{order.customerEmail}</p>
                    {order.companyName && <p className="text-muted-foreground text-xs">{order.companyName}</p>}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{order.country}</td>
                  <td className="px-4 py-3 font-condensed font-bold text-foreground">${order.totalAmount}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs border ${STATUS_COLORS[order.status] ?? ""}`}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      value={order.status}
                      onValueChange={(v) => updateStatus.mutate({ id: order.id, status: v as any })}
                    >
                      <SelectTrigger className="h-7 w-32 text-xs bg-secondary border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"].map(s => (
                          <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Portfolio Admin Tab ─────────────────────────────────────────────────────

const PORTFOLIO_CATEGORIES = [
  "Hunting Wear", "Sports Wear", "Ski Wear", "Tech Wear", "Streetwear", "Martial Arts Wear",
];

interface PortfolioFormState {
  title: string;
  category: string;
  description: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  geoTarget: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

const BLANK_PORTFOLIO_FORM: PortfolioFormState = {
  title: "", category: "Streetwear", description: "", tags: "",
  seoTitle: "", seoDescription: "", seoKeywords: "", geoTarget: "",
  isFeatured: false, isActive: true, sortOrder: 0,
};

function PortfolioItemDialog({ open, onClose, editItem }: {
  open: boolean;
  onClose: () => void;
  editItem?: any;
}) {
  const utils = trpc.useUtils();
  const isEdit = !!editItem;
  const [form, setForm] = useState<PortfolioFormState>(
    editItem ? {
      title: editItem.title ?? "",
      category: editItem.category ?? "Streetwear",
      description: editItem.description ?? "",
      tags: (() => { try { return (JSON.parse(editItem.tags ?? "[]") as string[]).join(", "); } catch { return ""; } })(),
      seoTitle: editItem.seoTitle ?? "",
      seoDescription: editItem.seoDescription ?? "",
      seoKeywords: editItem.seoKeywords ?? "",
      geoTarget: editItem.geoTarget ?? "",
      isFeatured: editItem.isFeatured ?? false,
      isActive: editItem.isActive ?? true,
      sortOrder: editItem.sortOrder ?? 0,
    } : BLANK_PORTFOLIO_FORM
  );

  const [pendingImages, setPendingImages] = useState<{ file: File; preview: string; altText: string; caption: string }[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = trpc.portfolio.create.useMutation({
    onSuccess: async (item) => {
      // Upload pending images
      if (pendingImages.length > 0) {
        setUploadingImages(true);
        for (let i = 0; i < pendingImages.length; i++) {
          const p = pendingImages[i];
          const base64 = await fileToBase64(p.file);
          await uploadImageMutation.mutateAsync({
            portfolioItemId: item.id,
            imageBase64: base64,
            mimeType: p.file.type || "image/jpeg",
            altText: p.altText || form.title,
            caption: p.caption,
            sortOrder: i,
          });
        }
        setUploadingImages(false);
      }
      utils.portfolio.list.invalidate();
      toast.success("Portfolio item created!");
      onClose();
    },
    onError: (e) => toast.error("Failed to create", { description: e.message }),
  });

  const updateMutation = trpc.portfolio.update.useMutation({
    onSuccess: () => {
      utils.portfolio.list.invalidate();
      utils.portfolio.byId.invalidate({ id: editItem?.id });
      toast.success("Portfolio item updated!");
      onClose();
    },
    onError: (e) => toast.error("Failed to update", { description: e.message }),
  });

  const uploadImageMutation = trpc.portfolio.uploadImage.useMutation();
  const deleteImageMutation = trpc.portfolio.deleteImage.useMutation({
    onSuccess: () => utils.portfolio.byId.invalidate({ id: editItem?.id }),
  });

  const { data: itemWithImages } = trpc.portfolio.byId.useQuery(
    { id: editItem?.id ?? 0 },
    { enabled: isEdit && !!editItem?.id }
  );

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newPending = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      altText: "",
      caption: "",
    }));
    setPendingImages(prev => [...prev, ...newPending]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePending = (i: number) => {
    setPendingImages(prev => {
      URL.revokeObjectURL(prev[i].preview);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  const handleUploadToExisting = async () => {
    if (!editItem?.id || pendingImages.length === 0) return;
    setUploadingImages(true);
    const startOrder = (itemWithImages?.images?.length ?? 0);
    for (let i = 0; i < pendingImages.length; i++) {
      const p = pendingImages[i];
      const base64 = await fileToBase64(p.file);
      await uploadImageMutation.mutateAsync({
        portfolioItemId: editItem.id,
        imageBase64: base64,
        mimeType: p.file.type || "image/jpeg",
        altText: p.altText || form.title,
        caption: p.caption,
        sortOrder: startOrder + i,
      });
    }
    setPendingImages([]);
    setUploadingImages(false);
    utils.portfolio.byId.invalidate({ id: editItem.id });
    toast.success(`${pendingImages.length} image(s) uploaded!`);
  };

  const tagsToJson = (raw: string) =>
    JSON.stringify(raw.split(",").map(t => t.trim()).filter(Boolean));

  const handleSubmit = () => {
    if (!form.title || !form.category) {
      toast.error("Title and category are required");
      return;
    }
    const payload = {
      ...form,
      tags: form.tags ? tagsToJson(form.tags) : undefined,
      seoTitle: form.seoTitle || undefined,
      seoDescription: form.seoDescription || undefined,
      seoKeywords: form.seoKeywords || undefined,
      geoTarget: form.geoTarget || undefined,
    };
    if (isEdit) {
      updateMutation.mutate({ id: editItem.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending || uploadingImages;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-foreground">
            {isEdit ? "Edit Portfolio Item" : "Add Portfolio Item"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Title *</Label>
              <Input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Camo Hunting Jacket Set"
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Category *</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {PORTFOLIO_CATEGORIES.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-6 pt-5">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.isFeatured}
                  onCheckedChange={v => setForm(f => ({ ...f, isFeatured: v }))}
                />
                <Label className="text-sm text-foreground">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={v => setForm(f => ({ ...f, isActive: v }))}
                />
                <Label className="text-sm text-foreground">Active</Label>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Description</Label>
            <Textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Short description of this portfolio item..."
              className="bg-secondary border-border resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                <Tag className="w-3 h-3 inline mr-1" />Tags (comma-separated)
              </Label>
              <Input
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="e.g. camo, waterproof, fleece"
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">
                <MapPin className="w-3 h-3 inline mr-1" />Geo Target
              </Label>
              <Input
                value={form.geoTarget}
                onChange={e => setForm(f => ({ ...f, geoTarget: e.target.value }))}
                placeholder="e.g. USA, UK, Europe"
                className="bg-secondary border-border"
              />
            </div>
          </div>

          {/* SEO Section */}
          <div className="border border-border rounded-lg p-4 space-y-3">
            <h4 className="text-xs font-condensed font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> SEO Metadata
            </h4>
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Meta Title</Label>
              <Input
                value={form.seoTitle}
                onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))}
                placeholder="Custom SEO title (leave blank to auto-generate)"
                className="bg-secondary border-border text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Meta Description</Label>
              <Textarea
                value={form.seoDescription}
                onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))}
                placeholder="SEO meta description (150-160 chars recommended)"
                className="bg-secondary border-border resize-none text-sm"
                rows={2}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Keywords</Label>
              <Input
                value={form.seoKeywords}
                onChange={e => setForm(f => ({ ...f, seoKeywords: e.target.value }))}
                placeholder="keyword1, keyword2, keyword3"
                className="bg-secondary border-border text-sm"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="border border-border rounded-lg p-4 space-y-3">
            <h4 className="text-xs font-condensed font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
              <ImagePlus className="w-3.5 h-3.5" /> Images
            </h4>

            {/* Existing images (edit mode) */}
            {isEdit && itemWithImages?.images && itemWithImages.images.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Uploaded images ({itemWithImages.images.length})</p>
                <div className="grid grid-cols-4 gap-2">
                  {itemWithImages.images.map((img) => (
                    <div key={img.id} className="relative group aspect-square rounded-md overflow-hidden bg-secondary">
                      <img src={img.imageUrl} alt={img.altText ?? ""} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => deleteImageMutation.mutate({ imageId: img.id })}
                        className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1 py-0.5 truncate">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending new images */}
            {pendingImages.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Pending upload ({pendingImages.length})</p>
                <div className="grid grid-cols-4 gap-2">
                  {pendingImages.map((p, i) => (
                    <div key={i} className="relative group aspect-square rounded-md overflow-hidden bg-secondary border border-dashed border-gold/40">
                      <img src={p.preview} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePending(i)}
                        className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drop zone */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border hover:border-gold/50 rounded-lg p-6 text-center transition-colors group"
            >
              <Upload className="w-6 h-6 text-muted-foreground group-hover:text-gold mx-auto mb-2 transition-colors" />
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Click to add images
              </p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP — multiple files supported</p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Upload to existing item button */}
            {isEdit && pendingImages.length > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadToExisting}
                disabled={uploadingImages}
                className="w-full border-gold/40 text-gold hover:bg-gold/10"
              >
                {uploadingImages ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" /> Upload {pendingImages.length} image(s) now</>
                )}
              </Button>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-border text-foreground">Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider"
          >
            {isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
            ) : isEdit ? "Update Item" : "Create Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PortfolioTab() {
  const utils = trpc.useUtils();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: items = [], isLoading } = trpc.portfolio.list.useQuery(
    { category: activeCategory === "All" ? undefined : activeCategory },
    { staleTime: 10_000 }
  );

  const deleteMutation = trpc.portfolio.delete.useMutation({
    onSuccess: () => { utils.portfolio.list.invalidate(); toast.success("Portfolio item deleted"); },
    onError: (e) => toast.error("Failed to delete", { description: e.message }),
  });

  const toggleActive = trpc.portfolio.update.useMutation({
    onSuccess: () => utils.portfolio.list.invalidate(),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-condensed font-bold text-xl uppercase tracking-wider text-foreground">Portfolio</h2>
          <p className="text-muted-foreground text-sm">{items.length} item{items.length !== 1 ? "s" : ""} in gallery</p>
        </div>
        <Button
          onClick={() => { setEditItem(null); setDialogOpen(true); }}
          className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {["All", ...PORTFOLIO_CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeCategory === cat
              ? "bg-gold text-black"
              : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground py-8">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading portfolio...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <Images className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <h3 className="font-serif text-xl text-foreground mb-2">No portfolio items yet</h3>
          <p className="text-muted-foreground text-sm mb-4">Add your first portfolio item to showcase your work</p>
          <Button
            onClick={() => { setEditItem(null); setDialogOpen(true); }}
            className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider"
          >
            <Plus className="w-4 h-4 mr-2" /> Add First Item
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(items as any[]).map(item => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden border border-border bg-secondary">
              {/* Cover image */}
              <div className="aspect-square bg-background overflow-hidden">
                {item.coverImage ? (
                  <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Images className="w-8 h-8 text-muted-foreground opacity-40" />
                  </div>
                )}
              </div>
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="icon" variant="ghost"
                  onClick={() => { setEditItem(item); setDialogOpen(true); }}
                  className="h-8 w-8 bg-white/10 hover:bg-gold hover:text-black text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon" variant="ghost"
                  onClick={() => toggleActive.mutate({ id: item.id, isActive: !item.isActive })}
                  className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white"
                  title={item.isActive ? "Deactivate" : "Activate"}
                >
                  {item.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="icon" variant="ghost"
                  onClick={() => { if (confirm("Delete this portfolio item and all its images?")) deleteMutation.mutate({ id: item.id }); }}
                  className="h-8 w-8 bg-white/10 hover:bg-red-600 text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {/* Info */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <p className="text-foreground text-xs font-semibold line-clamp-1">{item.title}</p>
                  {item.isFeatured && <Star className="w-3 h-3 text-gold shrink-0" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded font-condensed uppercase tracking-wide">
                    {item.category}
                  </span>
                  <Badge className={`text-[10px] border ${item.isActive
                    ? "bg-green-600/20 text-green-400 border-green-600/30"
                    : "bg-secondary text-muted-foreground border-border"
                    }`}>
                    {item.isActive ? "Live" : "Hidden"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <PortfolioItemDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditItem(null); }}
        editItem={editItem}
      />
    </div>
  );
}

// ─── RFQ Admin Tab ──────────────────────────────────────────────────────────

function RfqAdminTab() {
  const { data: submissions, isLoading } = trpc.rfq.list.useQuery();

  // Extract view URLs from the description field (stored as "--- Design Views ---\nFront: url\n...")
  const parseViews = (notes: string | null | undefined): { label: string; url: string }[] => {
    if (!notes) return [];
    const match = notes.match(/--- Design Views ---\n([\s\S]*?)(?:\n\n|$)/);
    if (!match) return [];
    return match[1].split('\n').filter(Boolean).map(line => {
      const [label, ...rest] = line.split(': ');
      return { label: label.trim(), url: rest.join(': ').trim() };
    }).filter(v => v.url.startsWith('http'));
  };

  const statusColors: Record<string, string> = {
    new: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    reviewed: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
    quoted: 'bg-green-600/20 text-green-400 border-green-600/30',
    closed: 'bg-secondary text-muted-foreground border-border',
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-condensed font-bold text-xl uppercase tracking-wider text-foreground">Quote Requests</h2>
        <p className="text-muted-foreground text-sm">{submissions?.length ?? 0} total submissions</p>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground py-8">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading quotes...
        </div>
      ) : (submissions ?? []).length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <h3 className="font-serif text-xl text-foreground mb-2">No quote requests yet</h3>
          <p className="text-muted-foreground text-sm">Quote submissions will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(submissions ?? []).map((sub) => {
            const views = parseViews(sub.additionalNotes);
            return (
              <div key={sub.id} className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="p-4 flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Left: contact info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">{sub.companyName}</span>
                      <Badge className={`text-xs border ${statusColors[sub.status] ?? statusColors.new}`}>
                        {sub.status}
                      </Badge>
                      {sub.garmentType && (
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5">
                          🧥 {sub.garmentType}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{sub.contactName} · {sub.email}{sub.phone ? ` · ${sub.phone}` : ''}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span><strong className="text-foreground">Product:</strong> {sub.productType}</span>
                      <span><strong className="text-foreground">Qty:</strong> {sub.quantity}</span>
                      {sub.timeline && <span><strong className="text-foreground">Timeline:</strong> {sub.timeline}</span>}
                      {sub.budget && <span><strong className="text-foreground">Budget:</strong> {sub.budget}</span>}
                      {sub.country && <span><strong className="text-foreground">Country:</strong> {sub.country}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(sub.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Right: primary design image */}
                  {sub.designImageUrl && (
                    <a href={sub.designImageUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                      <img
                        src={sub.designImageUrl}
                        alt="Design"
                        className="w-20 h-20 object-cover rounded-lg border border-border hover:opacity-80 transition-opacity"
                      />
                    </a>
                  )}
                </div>

                {/* 4-View thumbnails */}
                {views.length > 0 && (
                  <div className="px-4 pb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Design Views</p>
                    <div className="flex gap-2 flex-wrap">
                      {views.map((view) => (
                        <a key={view.label} href={view.url} target="_blank" rel="noopener noreferrer"
                          className="relative group">
                          <img
                            src={view.url}
                            alt={view.label}
                            className="w-24 h-24 object-cover rounded-lg border border-border group-hover:border-gold transition-colors"
                          />
                          <span className="absolute bottom-1 left-0 right-0 text-center text-[10px] font-bold text-white uppercase tracking-wider drop-shadow">
                            {view.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {sub.additionalNotes && (
                  <details className="px-4 pb-4">
                    <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      View full notes
                    </summary>
                    <pre className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap font-mono bg-secondary/50 rounded p-2 max-h-40 overflow-y-auto">
                      {sub.additionalNotes}
                    </pre>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const { data: products, isLoading: productsLoading } = trpc.product.adminList.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  const deleteMutation = trpc.product.delete.useMutation({
    onSuccess: () => { utils.product.adminList.invalidate(); toast.success("Product deleted"); },
    onError: (e) => toast.error("Failed to delete", { description: e.message }),
  });

  const toggleActive = trpc.product.update.useMutation({
    onSuccess: () => utils.product.adminList.invalidate(),
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-foreground mb-4">Admin Access Required</h2>
          <a href={getLoginUrl()}>
            <Button className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider">
              Sign In
            </Button>
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Admin header */}
      <div className="border-b border-border bg-secondary/30 py-4">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm">Sialkot Sample Masters Store Management</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline-block">
              Logged in as <strong className="text-foreground">{user.name}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/";
              }}
              className="text-xs h-8"
            >
              Sign Out
            </Button>
            <a href="/" className="text-xs text-gold hover:text-gold-light transition-colors ml-2 hidden sm:inline-block">← Back to Site</a>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="products">
          <TabsList className="bg-secondary mb-6">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Orders
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Truck className="w-4 h-4" /> Shipping
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Images className="w-4 h-4" /> Portfolio
            </TabsTrigger>
            <TabsTrigger value="rfq" className="flex items-center gap-2">
              <Tag className="w-4 h-4" /> Quotes
            </TabsTrigger>
            <TabsTrigger value="ai-agent" className="flex items-center gap-2 text-gold">
              <Bot className="w-4 h-4" /> AI Agent
            </TabsTrigger>
          </TabsList>

          {/* ── Products Tab ── */}
          <TabsContent value="products">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-condensed font-bold text-xl uppercase tracking-wider text-foreground">Products</h2>
                <p className="text-muted-foreground text-sm">{products?.length ?? 0} products in catalog</p>
              </div>
              <Button
                onClick={() => setLocation("/admin/product/new")}
                className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </div>

            {productsLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground py-8">
                <Loader2 className="w-5 h-5 animate-spin" /> Loading products...
              </div>
            ) : (products ?? []).length === 0 ? (
              <div className="text-center py-16 border border-dashed border-border rounded-xl">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <h3 className="font-serif text-xl text-foreground mb-2">No products yet</h3>
                <p className="text-muted-foreground text-sm mb-4">Add your first product to start selling</p>
                <Button
                  onClick={() => setLocation("/admin/product/new")}
                  className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add First Product
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      {["Product", "Category", "Pricing", "Status", "Actions"].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-condensed font-bold uppercase tracking-wider text-xs text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {(products ?? []).map(product => (
                      <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.mainImage || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=60&q=70"}
                              alt={product.title}
                              className="w-10 h-10 object-cover rounded shrink-0"
                            />
                            <div>
                              <p className="text-foreground font-semibold text-sm">{product.title}</p>
                              <p className="text-muted-foreground text-xs font-mono">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded font-condensed font-semibold uppercase tracking-wider">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {product.samplePrice && <p>Sample: ${product.samplePrice}</p>}
                          {product.freeShipping && (
                            <span className="text-green-400 flex items-center gap-1"><Truck className="w-3 h-3" /> Free ship</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            <Badge className={`text-xs w-fit border ${product.isActive ? "bg-green-600/20 text-green-400 border-green-600/30" : "bg-secondary text-muted-foreground border-border"}`}>
                              {product.isActive ? "Active" : "Inactive"}
                            </Badge>
                            {product.isFeatured && (
                              <Badge className="text-xs w-fit bg-gold/20 text-gold border-gold/30 border">Featured</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon" variant="ghost"
                              onClick={() => toggleActive.mutate({ id: product.id, isActive: !product.isActive })}
                              className="h-7 w-7 text-muted-foreground hover:text-gold"
                              title={product.isActive ? "Deactivate" : "Activate"}
                            >
                              {product.isActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </Button>
                            <Button
                              size="icon" variant="ghost"
                              onClick={() => setLocation(`/admin/product/edit/${product.id}`)}
                              className="h-7 w-7 text-muted-foreground hover:text-gold"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="icon" variant="ghost"
                              onClick={() => { if (confirm("Delete this product?")) deleteMutation.mutate({ id: product.id }); }}
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* ── Orders Tab ── */}
          <TabsContent value="orders">
            <OrdersTable />
          </TabsContent>

          {/* ── Shipping Tab ── */}
          <TabsContent value="shipping">
            <ShippingZoneManager />
          </TabsContent>

          {/* ── Portfolio Tab ── */}
          <TabsContent value="portfolio">
            <PortfolioTab />
          </TabsContent>

          {/* ── RFQ / Quotes Tab ── */}
          <TabsContent value="rfq">
            <RfqAdminTab />
          </TabsContent>

          {/* ── AI Agent Tab ── */}
          <TabsContent value="ai-agent" className="mt-0">
            <Tabs defaultValue="generator" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-condensed font-bold text-xl uppercase tracking-wider text-foreground flex items-center gap-2">
                    <Bot className="w-5 h-5 text-gold" />
                    AI Assistant
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Generate product listings or optimize images for SEO using Gemini AI.
                  </p>
                </div>

                <TabsList className="bg-secondary/50 border border-border">
                  <TabsTrigger value="studio" className="text-xs font-condensed uppercase tracking-wider gap-1.5 flex transition-colors data-[state=active]:bg-gold data-[state=active]:text-black relative overflow-hidden group">
                    <Crown className="w-3.5 h-3.5 text-gold group-data-[state=active]:text-black" />
                    Premium Studio
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </TabsTrigger>
                  <TabsTrigger value="generator" className="text-xs font-condensed uppercase tracking-wider gap-1.5 flex transition-colors data-[state=active]:bg-gold data-[state=active]:text-black">
                    <Sparkles className="w-3.5 h-3.5" /> Product Generator
                  </TabsTrigger>
                  <TabsTrigger value="optimizer" className="text-xs font-condensed uppercase tracking-wider gap-1.5 flex transition-colors data-[state=active]:bg-gold data-[state=active]:text-black">
                    <ImagePlus className="w-3.5 h-3.5" /> Image Optimizer
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="studio" className="mt-0 outline-none">
                <FashionDesignerStudio />
              </TabsContent>

              <TabsContent value="generator" className="mt-0 outline-none">
                <AIProductAgent />
              </TabsContent>

              <TabsContent value="optimizer" className="mt-0 outline-none">
                <AIImageOptimizer />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

    </main>
  );
}
