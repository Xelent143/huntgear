import { createProduct } from "./server/db";

async function run() {
    try {
        await createProduct({
            slug: "premium-bjj-gi-eco-friendly-wholesale-martial-arts-wear",
            title: "BJJ GI",
            category: "Martial Arts Wear",
            description: "Discover the superior craftsmanship of Sialkot Sample Masters' BJJ GI... ",
            shortDescription: "Elevate your brand with Sialkot Sample Masters' premium...",
            mainImage: "",
            samplePrice: "35.00",
            availableSizes: "[\"XS\",\"S\",\"M\",\"L\",\"XL\",\"2XL\",\"3XL\"]",
            availableColors: "[\"Black\",\"Navy\",\"White\",\"Olive\"]",
            material: "450 GSM Pre-Shrunk Pearl Weave 100% Eco-Friendly Cotton",
            isFeatured: false,
            isActive: true,
            freeShipping: false,
            seoTitle: "BJJ GI Wholesale | Sialkot Sample Masters Pakistan Manufacturer",
            seoDescription: "Source premium...",
            seoKeywords: "BJJ GI, Brazilian Jiu-Jitsu GI, wholesale BJJ GI, custom BJJ GI, private label BJJ GI, martial arts uniform, eco-friendly GI, Sialkot Sample Masters, Pakistan manufacturer, Sialkot wholesale, B2B apparel, martial arts wear supplier, uniform manufacturer, grappling GI, judo GI",
            sortOrder: 0
        });
        console.log("Success");
    } catch (err: any) {
        console.error("DB Error:", err.message);
    }
}

run().then(() => process.exit(0));
