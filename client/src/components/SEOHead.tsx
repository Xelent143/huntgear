import { Helmet } from "react-helmet-async";

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

const SITE_NAME = "Xelent Huntgear | Custom Hunting Apparel Manufacturer Pakistan";
const DEFAULT_DESCRIPTION =
  "Xelent Huntgear is Pakistan's premier custom hunting apparel manufacturer based in Sialkot. We specialize in OEM/ODM hunting jackets, camo pants, base layers & tactical gear with Realtree/Mossy Oak licensing. Low MOQ 50pcs. Export to USA, Canada, Europe & Australia. 7-day samples.";
const DEFAULT_KEYWORDS =
  "custom hunting apparel manufacturer Pakistan, hunting jacket manufacturer, camo pants supplier, Realtree licensed manufacturer, Mossy Oak apparel manufacturer, hunting gear OEM, private label hunting clothing, hunting apparel factory Sialkot, scent control hunting clothes, waterproof hunting jacket manufacturer, hunting base layer supplier, upland vest manufacturer, custom hunting wear Pakistan, low MOQ hunting apparel, hunting clothing exporter USA Europe";
const DEFAULT_OG_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/RfANkMVkQHIazGrh.jpg";
const SITE_URL = "https://xelenthuntgear.com";

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
  const fullTitle = title ? `${title} | Xelent Huntgear Pakistan` : SITE_NAME;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  // JSON-LD Schema
  const defaultSchemaGraph: any[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Xelent Huntgear",
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
        telephone: "+92-302-292-2242",
        contactType: "sales",
        availableLanguage: ["English", "Urdu"],
      },
      sameAs: [
        "https://instagram.com/sialkotsamplemasters",
        "https://linkedin.com/company/sialkot-sample-masters",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Xelent Huntgear",
      image: DEFAULT_OG_IMAGE,
      url: SITE_URL,
      telephone: "+92-302-292-2242",
      email: "info@sialkotsamplemasters.com",
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
      name: "Xelent Huntgear",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Speakable",
      cssSelector: [".speakable-title", ".speakable-description"]
    }
  ];

  if (breadcrumbs) {
    defaultSchemaGraph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.item.startsWith("http") ? crumb.item : `${SITE_URL}${crumb.item}`,
      })),
    });
  }

  if (schema) {
    if (Array.isArray(schema)) {
      defaultSchemaGraph.push(...schema);
    } else {
      defaultSchemaGraph.push(schema);
    }
  }

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": defaultSchemaGraph,
  });

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Xelent Huntgear, Sialkot, Pakistan" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1"} />

      {/* GEO Meta Tags */}
      <meta name="geo.region" content="PK-PB" />
      <meta name="geo.placename" content="Sialkot, Punjab, Pakistan" />
      <meta name="geo.position" content="32.4945;74.5229" />
      <meta name="ICBM" content="32.4945, 74.5229" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Xelent Huntgear" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="en_AE" />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Hreflang Tags */}
      {hreflangs?.map((hl, index) => (
        <link key={index} rel="alternate" href={hl.href} hrefLang={hl.rel} />
      ))}

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">{schemaJson}</script>

      {/* Conditionally Rendered Product Meta Tags */}
      {product && product.brand && <meta property="product:brand" content={product.brand} />}
      {product && product.availability && <meta property="product:availability" content={product.availability} />}
      {product && product.condition && <meta property="product:condition" content={product.condition} />}
      {product && product.priceAmount && <meta property="product:price:amount" content={product.priceAmount} />}
      {product && product.priceCurrency && <meta property="product:price:currency" content={product.priceCurrency} />}
      {product && product.retailerItemId && <meta property="product:retailer_item_id" content={product.retailerItemId} />}
      {product && product.itemGroupId && <meta property="product:item_group_id" content={product.itemGroupId} />}
      {/* Verification & GEO Signals */}
      <meta name="author" content="Xelent Huntgear Technical Team" />
      <meta name="last-modified" content={new Date().toISOString().split('T')[0]} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Xelent Huntgear",
          "url": SITE_URL,
          "logo": "https://xelenthuntgear.com/logo.png",
          "description": DEFAULT_DESCRIPTION,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sialkot",
            "addressCountry": "PK"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "B2B Sales",
            "areaServed": "Worldwide",
            "availableLanguage": ["English"]
          },
          "knowsAbout": [
            "Custom Hunting Apparel Manufacturing",
            "Realtree & Mossy Oak Licensed Production",
            "Scent-Control Technology Integration",
            "Waterproof Hunting Outerwear (10K-20K)",
            "Camouflage Pattern Design",
            "OEM/ODM Hunting Gear Production"
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the minimum order quantity for custom hunting jackets?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our MOQ is 50 pieces per style/color for custom hunting jackets, pants, and base layers. This applies to all camouflage patterns including licensed Realtree and Mossy Oak designs. We offer flexible sampling for startup hunting brands."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer Realtree and Mossy Oak licensed patterns?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we are licensed to manufacture hunting apparel with Realtree EDGE, Realtree Timber, Mossy Oak Break-Up Country, and Mossy Oak Bottomland patterns. We also offer Kryptek and custom-designed camouflage options."
              }
            },
            {
              "@type": "Question",
              "name": "What waterproof rating do your hunting jackets have?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our hunting jackets range from 10,000mm to 20,000mm waterproof rating (hydrostatic head) with fully taped seams. Breathability ranges from 10,000g to 15,000g/m²/24hr MVTR, suitable for active hunting in wet conditions."
              }
            },
            {
              "@type": "Question",
              "name": "Do you manufacture scent-control hunting apparel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we integrate scent-control technology including silver-ion antimicrobial treatments and carbon-based odor absorption into our base layers and hunting apparel. This helps hunters remain undetected in the field."
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
}
