import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Auto-generate breadcrumbs based on current path
export function AutoBreadcrumb({ className = "" }: { className?: string }) {
  const [location] = useLocation();
  
  const pathMap: Record<string, string> = {
    "/": "Home",
    "/products": "Products",
    "/about": "About Us",
    "/services": "Services",
    "/shop": "Shop",
    "/contact": "Contact",
    "/rfq": "Request Quote",
    "/portfolio": "Portfolio",
    "/blog": "Blog",
    "/customize": "3D Design",
    "/branding-studio": "Brand Studio",
    "/tech-pack": "Tech Pack Creator",
    "/checkout": "Checkout",
  };

  // Build breadcrumb items from path
  const items: BreadcrumbItem[] = [{ name: "Home", href: "/" }];
  
  const pathSegments = location.split("/").filter(Boolean);
  let currentPath = "";
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    // Check if it's a product detail page
    if (segment.startsWith("product-") || location.includes("/shop/")) {
      if (isLast) {
        items.push({ name: "Product Details" });
      } else {
        items.push({ name: pathMap[currentPath] || segment, href: currentPath });
      }
    } else {
      const name = pathMap[currentPath] || segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      if (isLast) {
        items.push({ name });
      } else {
        items.push({ name, href: currentPath });
      }
    }
  });

  return <Breadcrumb items={items} className={className} />;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  if (!items || items.length <= 1) return null;

  // Generate JSON-LD schema
  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href ? `https://xelenthuntgear.com${item.href}` : undefined,
    })),
  });

  return (
    <>
      {/* JSON-LD Schema */}
      <script type="application/ld+json">{schemaJson}</script>
      
      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className={`py-4 ${className}`}>
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-white/30 mx-2" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span 
                    className="text-white/60 font-medium"
                    aria-current="page"
                  >
                    {isFirst && <Home className="w-4 h-4 inline mr-1" />}
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.href || "/"}
                    className="text-white/50 hover:text-[#ff6b00] transition-colors font-medium flex items-center"
                  >
                    {isFirst && <Home className="w-4 h-4 mr-1" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// Predefined breadcrumbs for specific pages
export const predefinedBreadcrumbs = {
  products: [
    { name: "Home", href: "/" },
    { name: "Products" },
  ],
  about: [
    { name: "Home", href: "/" },
    { name: "About Us" },
  ],
  services: [
    { name: "Home", href: "/" },
    { name: "Services" },
  ],
  shop: [
    { name: "Home", href: "/" },
    { name: "Shop" },
  ],
  contact: [
    { name: "Home", href: "/" },
    { name: "Contact Us" },
  ],
  rfq: [
    { name: "Home", href: "/" },
    { name: "Request Quote" },
  ],
  portfolio: [
    { name: "Home", href: "/" },
    { name: "Portfolio" },
  ],
  blog: [
    { name: "Home", href: "/" },
    { name: "Blog" },
  ],
};

export default Breadcrumb;
