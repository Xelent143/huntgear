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
import GeoLanding from "./pages/GeoLanding";
import BlogCMTGuide from "./pages/blog/BlogCMTGuide";
import BlogSublimationGuide from "./pages/blog/BlogSublimationGuide";
import BlogCADvsManual from "./pages/blog/BlogCADvsManual";
import BlogQCChecklist from "./pages/blog/BlogQCChecklist";
import BlogOutsourcingBenefits from "./pages/blog/BlogOutsourcingBenefits";
import BlogSublimationRedFlags from "./pages/blog/BlogSublimationRedFlags";
import BlogPuffEmbroidery from "./pages/blog/BlogPuffEmbroidery";
import BlogCADGrading from "./pages/blog/BlogCADGrading";
import BlogCMTCosting from "./pages/blog/BlogCMTCosting";
import BlogPatchMistakes from "./pages/blog/BlogPatchMistakes";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminInquiryDetail from "./pages/admin/AdminInquiryDetail";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAIStudio from "./pages/admin/AdminAIStudio";
import AdminContent from "./pages/admin/AdminContent";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminNewProduct from "./pages/AdminNewProduct";
import Customize from "./pages/Customize";
import BrandingStudio from "./pages/BrandingStudio";
import TechPackCreator from "./pages/TechPackCreator";

// Pages that should NOT show the main Navbar/Footer (admin, checkout confirmation)
// Pages that should NOT show the main Navbar/Footer (admin, checkout confirmation)
const BARE_ROUTES = ["/admin-saad", "/customize", "/branding-studio"];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/products" component={Products} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/cmt-outsourcing-guide-sialkot" component={BlogCMTGuide} />
      <Route path="/blog/sublimation-printing-guide-sportswear" component={BlogSublimationGuide} />
      <Route path="/blog/cad-vs-manual-pattern-drafting-guide" component={BlogCADvsManual} />
      <Route path="/blog/apparel-manufacturing-qc-checklist" component={BlogQCChecklist} />
      <Route path="/blog/why-sportswear-brands-outsource-cmt-sialkot" component={BlogOutsourcingBenefits} />
      <Route path="/blog/5-signs-change-sublimation-vendor" component={BlogSublimationRedFlags} />
      <Route path="/blog/3d-puff-embroidery-streetwear-impact" component={BlogPuffEmbroidery} />
      <Route path="/blog/cad-grading-international-sizing-importance" component={BlogCADGrading} />
      <Route path="/blog/calculate-cmt-costs-export-shipment" component={BlogCMTCosting} />
      <Route path="/blog/3-mistakes-ordering-custom-patches-badges" component={BlogPatchMistakes} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/rfq" component={RFQ} />
      <Route path="/contact" component={Contact} />
      {/* E-Commerce */}
      <Route path="/shop" component={Shop} />
      <Route path="/shop/:slug" component={ProductDetail} />
      <Route path="/manufacturing/:region" component={GeoLanding} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/checkout/cancel" component={CheckoutCancel} />
      {/* 3D Customizer & Tools */}
      <Route path="/customize" component={Customize} />
      <Route path="/branding-studio" component={BrandingStudio} />
      <Route path="/tech-pack" component={TechPackCreator} />
      {/* Admin */}
      <Route path="/admin-saad" component={AdminDashboard} />
      <Route path="/admin-saad/login" component={AdminLogin} />
      <Route path="/admin-saad/orders" component={AdminOrders} />
      <Route path="/admin-saad/orders/:id" component={AdminOrderDetail} />
      <Route path="/admin-saad/inquiries" component={AdminInquiries} />
      <Route path="/admin-saad/inquiries/:id" component={AdminInquiryDetail} />
      <Route path="/admin-saad/products" component={AdminProducts} />
      <Route path="/admin-saad/ai-studio" component={AdminAIStudio} />
      <Route path="/admin-saad/content" component={AdminContent} />
      <Route path="/admin-saad/settings" component={AdminSettings} />
      <Route path="/admin-saad/categories" component={AdminCategories} />

      <Route path="/admin-saad/product/new" component={AdminNewProduct} />
      <Route path="/admin-saad/product/edit/:id" component={AdminNewProduct} />
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
