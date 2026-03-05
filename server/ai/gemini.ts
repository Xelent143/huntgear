import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { ENV } from "../_core/env";

// ─── Gemini Client ────────────────────────────────────────────────────────────

// Cache clients by API key to avoid re-creating on every call
const _clientCache = new Map<string, GoogleGenerativeAI>();

function getClient(apiKey?: string): GoogleGenerativeAI {
    const key = apiKey || ENV.geminiApiKey;
    if (!key || key === "your_gemini_api_key_here") {
        throw new Error("GEMINI_API_KEY is not configured. Please set your Gemini API key in the AI Agent settings.");
    }
    if (!_clientCache.has(key)) {
        _clientCache.set(key, new GoogleGenerativeAI(key));
    }
    return _clientCache.get(key)!;
}

// ─── Safety Settings ──────────────────────────────────────────────────────────

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

// ─── Chat Function ────────────────────────────────────────────────────────────

export interface ChatMessage {
    role: "user" | "model";
    text: string;
}

export async function chatWithProductAgent(
    conversationHistory: ChatMessage[],
    userMessage: string,
    systemPrompt: string,
    apiKey?: string,
    modelId: string = "gemini-2.5-flash",
): Promise<string> {
    const client = getClient(apiKey);
    const model = client.getGenerativeModel({
        model: modelId,
        systemInstruction: systemPrompt,
        safetySettings,
    });

    const chat = model.startChat({
        history: conversationHistory.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
        })),
    });

    const result = await chat.sendMessage(userMessage);
    return result.response.text();
}

// ─── Product Generation ───────────────────────────────────────────────────────

export interface GeneratedProductData {
    title: string;
    slug: string;
    category: string;
    shortDescription: string;
    description: string;
    material: string;
    availableSizes: string[];
    availableColors: string[];
    samplePrice: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    moqSlabs: Array<{
        minQty: number;
        maxQty: number | null;
        pricePerUnit: string;
        label: string;
    }>;
    imagePrompt: string;
}

export async function generateProductData(
    userDescription: string,
    brandContext: string = "Sialkot Sample Masters, a premium B2B eco-friendly apparel manufacturer from Pakistan",
    apiKey?: string,
    modelId: string = "gemini-2.5-flash",
): Promise<GeneratedProductData> {
    const client = getClient(apiKey);
    const model = client.getGenerativeModel({
        model: modelId,
        safetySettings,
        generationConfig: {
            responseMimeType: "application/json",
        },
    });

    const prompt = `You are an expert B2B apparel product listing consultant. Generate a complete, SEO and GEO-optimized product listing for: "${userDescription}"

Brand context: ${brandContext}

Return a JSON object with exactly these fields:
{
  "title": "Professional product title (under 70 chars)",
  "slug": "url-safe-slug-lowercase-hyphens",
  "category": "One of: Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear, Martial Arts Wear",
  "shortDescription": "Compelling 1-2 sentence summary for product cards (under 160 chars)",
  "description": "Full detailed 3-5 paragraph product description covering features, materials, customization options, and B2B benefits. Rich and keyword-focused.",
  "material": "Specific fabric/material description (e.g. '280GSM Ring-Spun Cotton / Polyester Blend')",
  "availableSizes": ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  "availableColors": ["Black", "Navy", "White", "Olive"],
  "samplePrice": "Price as string e.g. '25.00'",
  "seoTitle": "SEO title under 60 chars, include brand and main keyword",
  "seoDescription": "Meta description 120-155 chars, compelling, include CTA",
  "seoKeywords": "10-15 comma-separated keywords including GEO targets like 'Pakistan manufacturer', 'Sialkot wholesale', etc.",
  "moqSlabs": [
    { "minQty": 50, "maxQty": 99, "pricePerUnit": "18.00", "label": "Starter" },
    { "minQty": 100, "maxQty": 299, "pricePerUnit": "15.00", "label": "Popular" },
    { "minQty": 300, "maxQty": null, "pricePerUnit": "12.00", "label": "Wholesale" }
  ],
  "imagePrompt": "A detailed prompt to generate a professional product photo of this item, suitable for e-commerce, on a clean background, high quality"
}

Important: Return ONLY valid JSON, no markdown, no explanation.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Strip markdown code fences if present
    const jsonText = text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();

    return JSON.parse(jsonText) as GeneratedProductData;
}

// ─── Product Image Generation ─────────────────────────────────────────────────

export async function generateProductImageBase64(
    imagePrompt: string,
    logoBase64?: string,
    logoMimeType?: string,
    apiKey?: string,
    modelId: string = "gemini-2.5-flash",
): Promise<{ base64: string; mimeType: string }> {
    const client = getClient(apiKey);

    const model = client.getGenerativeModel({ model: modelId });

    const parts: any[] = [
        {
            text: `Generate a professional, high-quality e-commerce product photo. ${imagePrompt}. 
      Studio lighting, clean white or dark background, professional photography style, 
      ultra-realistic, 4K quality. The image should look like it belongs on a premium B2B apparel website.
      ${logoBase64 ? "Incorporate the provided logo prominently but tastefully on the garment." : ""}`,
        },
    ];

    if (logoBase64 && logoMimeType) {
        parts.push({
            inlineData: {
                mimeType: logoMimeType,
                data: logoBase64,
            },
        });
    }

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig: {
                responseModalities: ["image", "text"],
            } as any,
        });

        const response = result.response;
        for (const candidate of response.candidates ?? []) {
            for (const part of candidate.content?.parts ?? []) {
                if ((part as any).inlineData) {
                    return {
                        base64: (part as any).inlineData.data,
                        mimeType: (part as any).inlineData.mimeType ?? "image/png",
                    };
                }
            }
        }
        throw new Error("No image data in Gemini response");
    } catch (err) {
        throw new Error(`Image generation failed: ${String(err)}`);
    }
}

// ─── Image SEO Optimization ───────────────────────────────────────────────────

export interface OptimizedImageData {
    filename: string;
    altText: string;
    caption: string;
}

export async function analyzeImageForSeo(
    base64: string,
    mimeType: string,
    apiKey?: string,
    modelId: string = "gemini-2.5-flash",
): Promise<OptimizedImageData> {
    const client = getClient(apiKey);
    const model = client.getGenerativeModel({
        model: modelId,
        generationConfig: {
            responseMimeType: "application/json",
        },
    });

    const prompt = `You are an expert SEO and B2B apparel consultant for Sialkot Sample Masters, a premium Pakistan-based manufacturer.
Analyze this raw image and return a JSON object with strictly these three properties:
1. "filename": A highly SEO-optimized, lowercase, kebab-case filename (ending in .jpg) that describes the apparel item perfectly. Include localized B2B keywords where appropriate (e.g. "wholesale-bjj-kimono-manufacturer-pakistan.jpg"). Keep it under 60 characters if possible.
2. "altText": Highly descriptive Alt Text for blind users and search bots. Describe exactly what the apparel item looks like (e.g. "White pearl weave Brazilian Jiu Jitsu Kimono jacket with custom embroidery on the shoulder").
3. "caption": A short, marketing-focused caption summarizing the product, including GEO keywords (like "Sialkot manufacturer" or "Made in Pakistan").

Important: Return ONLY valid JSON, no markdown, no explanation.`;

    try {
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType,
                    data: base64,
                },
            },
        ]);

        const text = result.response.text().trim();
        const jsonText = text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
        return JSON.parse(jsonText) as OptimizedImageData;
    } catch (err: any) {
        throw new Error(`SEO analysis failed: ${err.message}`);
    }
}

// ─── Premium Fashion Designer Studio ──────────────────────────────────────────

export async function generateDesignerGrid(
    prompt: string,
    apiKey?: string,
    modelId: string = "gemini-2.5-flash",
): Promise<{ base64: string; mimeType: string }> {
    const client = getClient(apiKey);
    const model = client.getGenerativeModel({ model: modelId });

    const parts: any[] = [
        {
            text: `Act as a senior high-end fashion designer and professional photographer.
Generate a complete multi-view fashion photography grid of a single apparel item: ${prompt}. 
The image MUST be a 2x2 or composite grid showing strictly these 4 DISTINCT views:
1. Full Front View (facing forward)
2. Full Back View (facing away)
3. Full Left Profile View (the clothing item is seen from its left side, facing left)
4. Full Right Profile View (the clothing item is seen from its right side, facing right)
CRITICAL: The Left Profile and Right Profile MUST be different. They are the two opposite sides of the garment. Ensure the orientation is correct. NO DUPLICATE VIEWS.
Studio lighting, clean solid background, ultra-realistic 4K quality, premium B2B catalog style. DO NOT include text in the image.`,
        },
    ];

    let lastError: Error = new Error("Unknown error");
    const maxRetries = 2; // Two attempts to keep it under strict proxy timeout limits

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig: {
                    responseModalities: ["image", "text"],
                } as any,
            });

            const response = result.response;
            for (const candidate of response.candidates ?? []) {
                for (const part of candidate.content?.parts ?? []) {
                    if ((part as any).inlineData) {
                        return {
                            base64: (part as any).inlineData.data,
                            mimeType: (part as any).inlineData.mimeType ?? "image/jpeg",
                        };
                    }
                }
            }
            throw new Error(`Attempt ${attempt}: No image data in Gemini response`);
        } catch (err: any) {
            console.error(`[Grid Gen] Attempt ${attempt} failed:`, err.message);
            lastError = err;
            if (attempt < maxRetries) {
                // Short wait before retry
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }
    }

    throw new Error(`Grid image generation failed after ${maxRetries} attempts: ${lastError.message}`);
}

export async function generateIndividualView(
    basePrompt: string,
    viewType: string,
    apiKey?: string,
    modelId: string = "gemini-2.5-flash",
    referenceImage?: { base64: string; mimeType: string },
): Promise<{ base64: string; mimeType: string }> {
    const client = getClient(apiKey);
    const model = client.getGenerativeModel({ model: modelId });

    const parts: any[] = [];

    if (referenceImage) {
        parts.push({
            inlineData: {
                data: referenceImage.base64,
                mimeType: referenceImage.mimeType,
            },
        });
    }

    parts.push({
        text: `Act as a senior high-end fashion designer and professional photographer.
Generate a high-resolution, professional studio photography quality image of the EXACT APPAREL shown in the reference image, but focused ONLY on the ${viewType} view. 

Product Description: ${basePrompt}
View Needed: ${viewType}

STRICT INSTRUCTIONS:
1. The design (colors, patterns, materials, construction) MUST MATCH the reference image perfectly.
2. If the view is "left-side", show the item from its left side (facing left). 
3. If the view is "right-side", show the item from its right side (facing right).
4. The background MUST be solid white.
5. No watermarks or text. High-end 4K commercial lighting.
6. CRITICAL: Generate EXACTLY ONE person/mannequin/item in the image. DO NOT generate multiple angles, split screens, reflections, or front-and-back views together. ONLY show the single requested view.`,
    });

    let lastError = new Error("Unknown error");
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig: {
                    responseModalities: ["image", "text"],
                } as any,
            });

            const response = result.response;
            for (const candidate of response.candidates ?? []) {
                for (const part of candidate.content?.parts ?? []) {
                    if ((part as any).inlineData) {
                        return {
                            base64: (part as any).inlineData.data,
                            mimeType: (part as any).inlineData.mimeType ?? "image/jpeg",
                        };
                    }
                }
            }
            throw new Error(`Attempt ${attempt}: No image data in Gemini response (model likely returned text/apology)`);
        } catch (err: any) {
            console.error(`[Individual View Gen] Attempt ${attempt} failed for ${viewType}:`, err.message);
            lastError = err;
            // Wait slightly before retrying
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }
    }

    throw new Error(`Individual view generation failed for ${viewType} after ${maxRetries} attempts: ${lastError.message}`);
}

export async function prefillProductDataFromGrid(
    imagePrompt: string,
    base64: string,
    mimeType: string,
    apiKey?: string,
    modelId: string = "gemini-2.5-flash",
): Promise<any> {
    const client = getClient(apiKey);
    const model = client.getGenerativeModel({
        model: modelId,
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
        },
    });

    const prompt = `Act as an elite SEO Expert and E-commerce Manager for Sialkot Sample Masters (a premium B2B custom apparel manufacturer in Pakistan).
I am providing you the original design prompt ("${imagePrompt}") and the generated multi-view design grid image.
Generate a complete, highly-optimized product listing based on this apparel item.
Return ONLY valid JSON matching this exact structure:
{
  "title": "A highly descriptive, SEO-optimized product title (e.g. 'Premium Custom BJJ Kimono - Wholesale')",
  "category": "The most appropriate category (e.g. 'Martial Arts', 'Activewear', 'Outerwear')",
  "description": "A long, persuasive description focusing on material quality, B2B wholesale benefits, customization options, and premium feel.",
  "shortDescription": "A 1-2 sentence quick summary for catalog views.",
  "seoTitle": "Optimal title for Google Search (under 60 chars)",
  "seoDescription": "Meta description for Google (under 160 chars)",
  "seoKeywords": "Comma-separated SEO/GEO keywords (e.g. 'custom jiu jitsu gi, bjj gear bulk, pakistan manufacturer, sialkot custom apparel')",
  "material": "Estimated premium material composition based on the image (e.g. '450gsm Pearl Weave Cotton')",
  "samplePrice": "Estimated expensive sample price (e.g. '85.00')",
  "weight": "Estimated weight in kg (e.g. '1.500')",
  "availableSizes": "JSON array of sizes like [\\"S\\", \\"M\\", \\"L\\", \\"XL\\"]",
  "availableColors": "JSON array of 2-3 most likely requested colors",
  "slabs": [
    { "minQty": 50, "pricePerUnit": "45.00", "label": "Starter Tier" },
    { "minQty": 100, "pricePerUnit": "40.00", "label": "Popular" },
    { "minQty": 500, "pricePerUnit": "35.00", "label": "Wholesale Leader" }
  ]
}`;

    try {
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType,
                    data: base64,
                },
            },
        ]);

        const text = result.response.text().trim();
        const jsonText = text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
        return JSON.parse(jsonText);
    } catch (err) {
        throw new Error(`Data prefill failed: ${String(err)}`);
    }
}
