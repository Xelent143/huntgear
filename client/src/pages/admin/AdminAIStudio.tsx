import AdminLayout from "@/pages/layouts/AdminLayout";
import AIProductAgent from "@/components/admin/AIProductAgent";
import AIImageOptimizer from "@/components/admin/AIImageOptimizer";
import FashionDesignerStudio from "@/components/admin/FashionDesignerStudio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Image as ImageIcon, Shirt } from "lucide-react";

export default function AdminAIStudio() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="font-serif text-2xl font-bold text-foreground">AI Studio</h1>
                    <p className="text-sm text-muted-foreground mt-1">Accelerate your workflow with specialized AI tools.</p>
                </div>

                <Tabs defaultValue="designer" className="w-full">
                    <TabsList className="bg-secondary/50 border-border p-1">
                        <TabsTrigger value="designer" className="data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground">
                            <Shirt className="w-4 h-4 mr-2" /> Quick Designer
                        </TabsTrigger>
                        <TabsTrigger value="agent" className="data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground">
                            <Wand2 className="w-4 h-4 mr-2" /> SEO Listing Agent
                        </TabsTrigger>
                        <TabsTrigger value="optimizer" className="data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground">
                            <ImageIcon className="w-4 h-4 mr-2" /> Image Optimizer
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="designer" className="mt-6 border-none p-0 outline-none">
                        <FashionDesignerStudio />
                    </TabsContent>

                    <TabsContent value="agent" className="mt-6 border-none p-0 outline-none">
                        <AIProductAgent />
                    </TabsContent>

                    <TabsContent value="optimizer" className="mt-6 border-none p-0 outline-none">
                        <AIImageOptimizer />
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
