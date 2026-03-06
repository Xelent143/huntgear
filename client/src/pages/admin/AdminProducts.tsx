import { useState } from "react";
import AdminLayout from "@/pages/layouts/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Loader2, Image as ImageIcon, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
    const [, setLocation] = useLocation();
    const { data: products, isLoading } = trpc.product.adminList.useQuery();
    const utils = trpc.useUtils();
    const [searchTerm, setSearchTerm] = useState("");

    const deleteMutation = trpc.product.delete.useMutation({
        onSuccess: () => { utils.product.adminList.invalidate(); toast.success("Product deleted"); },
    });

    const toggleStatus = trpc.product.update.useMutation({
        onSuccess: () => { utils.product.adminList.invalidate(); toast.success("Status updated"); },
    });

    const filtered = products?.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                        <h1 className="font-serif text-2xl font-bold text-foreground">Products</h1>
                        <p className="text-sm text-muted-foreground mt-1">{products?.length || 0} products in catalog</p>
                    </div>
                    <Button onClick={() => setLocation("/admin/product/new")} className="bg-gold text-black hover:bg-gold-light">
                        <Plus className="w-4 h-4 mr-2" /> Add Product
                    </Button>
                </div>

                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-border bg-secondary/30">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-background h-9"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-sm">
                            <thead className="bg-secondary/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 text-left font-condensed font-bold uppercase tracking-wider text-xs text-muted-foreground">Product</th>
                                    <th className="px-6 py-3 text-left font-condensed font-bold uppercase tracking-wider text-xs text-muted-foreground w-48">Status</th>
                                    <th className="px-6 py-3 text-left font-condensed font-bold uppercase tracking-wider text-xs text-muted-foreground w-48">Inventory</th>
                                    <th className="px-6 py-3 text-left font-condensed font-bold uppercase tracking-wider text-xs text-muted-foreground w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Loading products...
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                            No products found. Add some to get started.
                                        </td>
                                    </tr>
                                ) : filtered.map(product => (
                                    <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-md bg-secondary border border-border overflow-hidden shrink-0 flex items-center justify-center">
                                                    {product.mainImage ? (
                                                        <img src={product.mainImage} alt={product.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="w-5 h-5 text-muted-foreground opacity-50" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-foreground hover:text-gold cursor-pointer transition-colors" onClick={() => setLocation(`/admin/product/edit/${product.id}`)}>
                                                        {product.title}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-0.5">{product.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                variant="outline"
                                                className={`cursor-pointer transition-colors ${product.isActive ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                                                onClick={() => toggleStatus.mutate({ id: product.id, isActive: !product.isActive, title: product.title, category: product.category, slug: product.slug })}
                                            >
                                                {product.isActive ? 'Active' : 'Draft'}
                                            </Badge>
                                            {product.isFeatured && (
                                                <Badge variant="outline" className="ml-2 bg-gold/10 text-gold border-gold/20">Featured</Badge>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {product.samplePrice ? `$${product.samplePrice}` : 'Needs pricing'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="ghost" onClick={() => window.open(`/shop/${product.slug}`, '_blank')} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={() => setLocation(`/admin/product/edit/${product.id}`)} className="h-8 w-8 text-muted-foreground hover:text-gold">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={() => { if (confirm('Delete product?')) deleteMutation.mutate({ id: product.id }) }} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
