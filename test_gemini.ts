import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
dotenv.config();

async function run() {
    try {
        const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = client.getGenerativeModel({ model: "gemini-3.1-flash-image-preview" });
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: "Draw a green apple." }] }],
            generationConfig: { responseModalities: ["image", "text"] } as any,
        });
        console.log("SUCCESS!", result.response.text());
    } catch (err: any) {
        console.error("FAIL:", err.message);
    }
}
run();
