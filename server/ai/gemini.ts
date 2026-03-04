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
): Promise<string> {
    const client = getClient(apiKey);
    const model = client.getGenerativeModel({
        model: "gemini-2.0-flash",
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
): Promise<GeneratedProductData> {
    const client = getClient(apiKey);
    const model = client.getGenerativeModel({
        model: "gemini-2.0-flash",
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
): Promise<{ base64: string; mimeType: string }> {
    const client = getClient(apiKey);

    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

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
