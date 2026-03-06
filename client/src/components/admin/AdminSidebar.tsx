import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
    Home, ShoppingBag, Package, Users, Settings,
    Image as ImageIcon, Wand2, Plus, LogOut, ChevronRight
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

const NAVIGATION = [
    { name: "Dashboard", href: "/admin", icon: Home, exact: true },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Content", href: "/admin/content", icon: ImageIcon },
    { name: "AI Studio", href: "/admin/ai-studio", icon: Wand2 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ isMobileOpen, setMobileOpen }: { isMobileOpen: boolean, setMobileOpen: (v: boolean) => void }) {
    const [location] = useLocation();
    const { logout } = useAuth();

    const isActive = (href: string, exact: boolean = false) => {
        if (exact) return location === href || location === href + "/";
        return location.startsWith(href);
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
                {/* Header */}
                <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
                    <Link href="/">
                        <div className="font-serif text-xl font-bold text-foreground cursor-pointer flex items-center gap-2">
                            <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-black">
                                S
                            </div>
                            <span>Sialkot Admin</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-none">
                    {NAVIGATION.map((item) => {
                        const active = isActive(item.href, item.exact);
                        return (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-colors group
                    ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}
                  `}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <item.icon className={`w-5 h-5 shrink-0 ${active ? "text-gold" : "text-muted-foreground group-hover:text-foreground"}`} />
                                    <span className="flex-1">{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-border shrink-0">
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
