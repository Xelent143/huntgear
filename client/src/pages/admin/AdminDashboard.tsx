import AdminLayout from "@/pages/layouts/AdminLayout";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminDashboard() {
    const { data: stats } = trpc.order.adminStats.useQuery();

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="font-serif text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-1">Overview of your store's performance.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">${stats?.totalRevenue ?? "0.00"}</div>
                            <p className="text-xs text-muted-foreground mt-1">Lifetime revenue</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">+{stats?.orderCount ?? 0}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total orders placed</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">--</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <Link href="/admin/products" className="text-gold hover:underline cursor-pointer">Manage catalog</Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
