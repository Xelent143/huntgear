import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
  noIndex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  hreflangs?: Array<{ rel: string; href: string }>;
  product?: {
    brand?: string;
    availability?: string; // "in stock", "out of stock", "preorder", "available for order", "discontinued"
    condition?: string; // "new", "refurbished", "used"
    priceAmount?: string;
    priceCurrency?: string;
    retailerItemId?: string;
    itemGroupId?: string; // useful for variants
  };
}

const SITE_NAME = "Sialkot Sample Masters - Custom Apparel Manufacturer Pakistan";
const DEFAULT_DESCRIPTION =
  "Sialkot Sample Masters is Pakistan's leading custom apparel manufacturer based in Sialkot. We specialize in Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear, and Martial Arts Wear (BJJ Kimonos & Rashguards). Private label, low MOQ from 50 pcs, bulk export for global brands in USA, UAE & Europe.";
const DEFAULT_KEYWORDS =
  "custom apparel manufacturer Pakistan, hunting wear manufacturer Sialkot, sports wear manufacturer Pakistan, ski wear manufacturer Pakistan, tech wear manufacturer Sialkot, streetwear manufacturer Pakistan, martial arts wear manufacturer Pakistan, bulk BJJ kimonos manufacturer, custom rashguards supplier, private label clothing Pakistan, B2B clothing manufacturer Sialkot, OEM apparel manufacturer Pakistan, wholesale hunting clothing supplier, custom ski jacket manufacturer Pakistan";
const DEFAULT_OG_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/RfANkMVkQHIazGrh.jpg";
const SITE_URL = "https://sialkotsamplementasters.com";

export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema,
  noIndex = false,
  breadcrumbs,
  hreflangs,
  product,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | Sialkot Sample Masters Pakistan` : SITE_NAME;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set/update meta tags
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.includes("[name=") ? "name" : "property";
        const val = selector.match(/["']([^"']+)["']/)?.[1] || "";
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string, extras?: Record<string, string>) => {
      let selector = `link[rel="${rel}"]`;
      if (extras?.hreflang) selector += `[hreflang="${extras.hreflang}"]`;

      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        if (extras) {
          Object.entries(extras).forEach(([k, v]) => el?.setAttribute(k, v));
        }
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Standard meta
    setMeta('[name="description"]', description);
    setMeta('[name="keywords"]', keywords);
    setMeta('[name="author"]', "Sialkot Sample Masters, Sialkot, Pakistan");
    setMeta('[name="robots"]', noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1");
    setMeta('[name="geo.region"]', "PK-PB");
    setMeta('[name="geo.placename"]', "Sialkot, Punjab, Pakistan");
    setMeta('[name="geo.position"]', "32.4945;74.5229");
    setMeta('[name="ICBM"]', "32.4945, 74.5229");

    // Open Graph
    setMeta('[property="og:title"]', fullTitle);
    setMeta('[property="og:description"]', description);
    setMeta('[property="og:type"]', ogType);
    setMeta('[property="og:image"]', ogImage);
    setMeta('[property="og:site_name"]', "Sialkot Sample Masters");
    setMeta('[property="og:locale"]', "en_US");
    setMeta('[property="og:url"]', canonical ? `${SITE_URL}${canonical}` : SITE_URL);

    // Twitter Card
    setMeta('[name="twitter:card"]', "summary_large_image");
    setMeta('[name="twitter:title"]', fullTitle);
    setMeta('[name="twitter:description"]', description);
    setMeta('[name="twitter:image"]', ogImage);

    // Facebook / Instagram Catalog Product Tags
    if (product) {
      if (product.brand) setMeta('[property="product:brand"]', product.brand);
      if (product.availability) setMeta('[property="product:availability"]', product.availability);
      if (product.condition) setMeta('[property="product:condition"]', product.condition);
      if (product.priceAmount) setMeta('[property="product:price:amount"]', product.priceAmount);
      if (product.priceCurrency) setMeta('[property="product:price:currency"]', product.priceCurrency);
      if (product.retailerItemId) setMeta('[property="product:retailer_item_id"]', product.retailerItemId);
      if (product.itemGroupId) setMeta('[property="product:item_group_id"]', product.itemGroupId);
    }

    // Canonical
    if (canonical) setLink("canonical", `${SITE_URL}${canonical}`);

    // Hreflang
    if (hreflangs) {
      hreflangs.forEach((hl) => setLink("alternate", hl.href, { hreflang: hl.rel }));
    }

    // JSON-LD Schema
    const schemaId = "xelent-schema";
    let schemaEl = document.getElementById(schemaId);
    if (!schemaEl) {
      schemaEl = document.createElement("script");
      schemaEl.id = schemaId;
      schemaEl.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaEl);
    }

    const defaultSchemaGraph: any[] = [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Sialkot Sample Masters",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: DEFAULT_DESCRIPTION,
        foundingDate: "2010",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sialkot Industrial Zone",
          addressLocality: "Sialkot",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+92-300-123-4567",
          contactType: "sales",
          availableLanguage: ["English", "Urdu"],
        },
        sameAs: [
          "https://instagram.com/sialkotsamplementasters",
          "https://linkedin.com/company/sialkot-sample-masters",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "Sialkot Sample Masters",
        image: DEFAULT_OG_IMAGE,
        url: SITE_URL,
        telephone: "+92-300-123-4567",
        email: "info@sialkotsamplementasters.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sialkot Industrial Zone",
          addressLocality: "Sialkot",
          addressRegion: "Punjab",
          postalCode: "51310",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 32.4945,
          longitude: 74.5229,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        priceRange: "$$",
        currenciesAccepted: "USD, EUR, GBP, PKR",
        paymentAccepted: "Wire Transfer, PayPal, LC",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Sialkot Sample Masters",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Speakable",
        "cssSelector": [".speakable-title", ".speakable-description"]
      }
    ];

    if (breadcrumbs) {
      defaultSchemaGraph.push({
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.item.startsWith('http') ? crumb.item : `${SITE_URL}${crumb.item}`
        }))
      });
    }

    if (schema) {
      if (Array.isArray(schema)) {
        defaultSchemaGraph.push(...schema);
      } else {
        defaultSchemaGraph.push(schema);
      }
    }

    schemaEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": defaultSchemaGraph,
    });
  }, [fullTitle, description, keywords, canonical, ogImage, ogType, schema, noIndex, breadcrumbs, hreflangs, product]);

  return null;
}
