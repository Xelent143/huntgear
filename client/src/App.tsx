import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import RFQ from "./pages/RFQ";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAIStudio from "./pages/admin/AdminAIStudio";
import AdminContent from "./pages/admin/AdminContent";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNewProduct from "./pages/AdminNewProduct";
import Customize from "./pages/Customize";
import BrandingStudio from "./pages/BrandingStudio";

// Pages that should NOT show the main Navbar/Footer (admin, checkout confirmation)
// Pages that should NOT show the main Navbar/Footer (admin, checkout confirmation)
const BARE_ROUTES = ["/admin", "/customize", "/branding-studio"];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/products" component={Products} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/rfq" component={RFQ} />
      <Route path="/contact" component={Contact} />
      {/* E-Commerce */}
      <Route path="/shop" component={Shop} />
      <Route path="/shop/:slug" component={ProductDetail} />
      <Route path="/checkout" component={Checkout} />
      {/* 3D Customizer */}
      <Route path="/customize" component={Customize} />
      <Route path="/branding-studio" component={BrandingStudio} />
      {/* Admin */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/ai-studio" component={AdminAIStudio} />
      <Route path="/admin/content" component={AdminContent} />
      <Route path="/admin/settings" component={AdminSettings} />

      <Route path="/admin/product/new" component={AdminNewProduct} />
      <Route path="/admin/product/edit/:id" component={AdminNewProduct} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  const [location] = useLocation();
  const isBare = BARE_ROUTES.some(r => location.startsWith(r));

  if (isBare) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Router />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Layout />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
