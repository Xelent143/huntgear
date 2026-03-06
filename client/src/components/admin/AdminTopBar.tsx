import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminTopBar({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-card border-b border-border sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4 flex-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-muted-foreground"
                    onClick={() => setMobileOpen(true)}
                >
                    <Menu className="w-5 h-5" />
                </Button>

                <div className="max-w-md w-full hidden sm:flex relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search products, orders, customers..."
                        className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-background focus-visible:border-gold h-9 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
                </Button>

                <div className="h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center font-bold text-sm text-foreground">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
            </div>
        </header>
    );
}
