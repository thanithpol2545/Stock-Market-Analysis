/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeBusinessQuality(companyName: string, ticker: string, description: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a brief qualitative assessment for ${companyName} (${ticker}). 
      Description: ${description}
      
      Focus on the following dimensions:
      1. Business Quality & Competitive Position
      2. Industry Dynamics
      3. Management & Governance (if known)
      4. Key Risks
      
      Output format: JSON with fields:
      - businessQuality: string (1 sentence)
      - competitiveMoat: string (strength: None/Narrow/Wide)
      - primaryRisks: string[]
      - qualityScore: number (0 to 5)`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
}

export async function getStockData(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search target: "${query}".
      
      You represent a high-frequency financial intelligence system.
      Current Date: May 2026.
      
      TASK: 
      1. Perform an exhaustive real-time search for the ABSOLUTE LATEST financial status.
      2. You MUST find the current stock price (Live Market Quote from today).
      3. Retrieve the most recent public financial statements (FY2025, FY2024, or the latest Quarterly report TTM).
      4. Precisely identify the timestamp of the price data.
      
      Output format: Strictly valid JSON matching the StockAnalysis interface:
      {
        "id": string,
        "ticker": string,
        "companyName": string,
        "sector": string,
        "currentPrice": number,
        "lastUpdated": string (ISO timestamp for the current price),
        "history": [
          {
            "year": number,
            "revenue": number, (in millions)
            "operatingIncome": number,
            "netIncome": number,
            "depreciationAmortization": number,
            "capex": number,
            "changeInNWC": number,
            "totalAssets": number,
            "totalEquity": number,
            "totalDebt": number,
            "cashAndEquivalents": number,
            "sharesOutstanding": number,
            "dividends": number
          }
        ],
        "inputs": {
           "beta": number,
           "riskFreeRate": number,
           "equityRiskPremium": number,
           "preTaxCostOfDebt": number,
           "marginalTaxRate": number,
           "terminalGrowthRate": number,
           "targetDebtToEquity": number
        },
        "riskScore": {
          "business": number (1-5),
          "financial": number,
          "management": number,
          "governance": number,
          "macro": number,
          "regulatory": number
        }
      }
      
      Provide at least 3-5 years of history ending with the current TTM/FY2025 period if possible. All numeric values must be in Millions (USD) where applicable. Use the googleSearch tool to guarantee real-time accuracy.`,
      config: {
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }]
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Fetch Error:", error);
    return null;
  }
}
