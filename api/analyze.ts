import Anthropic from '@anthropic-ai/sdk'

interface StockResult {
  ticker: string
  company: string
  signal: 'BUY' | 'HOLD' | 'SELL'
  confidence: 'Low' | 'Medium' | 'High'
  keyReasons: string[]
  riskFactors: string[]
  newsSummary: string
  ytdChange?: number
  price?: number
  sector?: string
}

interface AnalysisResponse {
  date: string
  market: {
    summary: string
    fedRate: string
    inflation: string
    oil: string
  }
  stocks: StockResult[]
  news: {
    title: string
    category: string
    impact: string
    summary: string
  }[]
}

const SYSTEM_PROMPT = `You are a stock market analyst AI. Given a list of stock tickers, provide a comprehensive analysis based on current market conditions.

You MUST respond with ONLY valid JSON matching this exact structure (no markdown, no code fences):
{
  "date": "YYYY-MM-DD",
  "market": {
    "summary": "2-3 sentence market overview",
    "fedRate": "current fed rate range",
    "inflation": "current inflation metric",
    "oil": "current oil price"
  },
  "stocks": [
    {
      "ticker": "SYMBOL",
      "company": "Full Company Name",
      "signal": "BUY|HOLD|SELL",
      "confidence": "Low|Medium|High",
      "keyReasons": ["reason 1", "reason 2", "reason 3"],
      "riskFactors": ["risk 1", "risk 2"],
      "newsSummary": "Brief analysis summary",
      "ytdChange": 15.5,
      "price": 150.00,
      "sector": "Sector Name"
    }
  ],
  "news": [
    {
      "title": "News headline",
      "category": "AI|Market|Geopolitical|Sector|Economy",
      "impact": "Bullish|Bearish|Neutral",
      "summary": "Brief summary"
    }
  ]
}

Guidelines:
- Provide honest, balanced analysis based on your knowledge
- Include 5-8 key news items driving markets
- For each stock: 3 key reasons, 2-3 risk factors
- Signal should be BUY (strong upside), HOLD (wait/neutral), or SELL (downside risk)
- Confidence reflects how certain you are: High (strong conviction), Medium (moderate), Low (uncertain)
- Always include the disclaimer that this is AI-generated and not financial advice
- Base analysis on recent market trends, earnings, macro conditions, geopolitics`

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })
  }

  try {
    const { tickers } = req.body
    if (!tickers || !Array.isArray(tickers) || tickers.length === 0) {
      return res.status(400).json({ error: 'tickers array is required' })
    }

    const client = new Anthropic({ apiKey })

    const userPrompt = `Analyze these stocks: ${tickers.join(', ')}

Provide current market analysis and buy/hold/sell recommendations for each stock. Consider:
1. Recent AI and technology developments
2. US stock market conditions (S&P 500, Nasdaq, Dow)
3. Geopolitical tensions (wars, trade, sanctions)
4. Federal Reserve policy and inflation
5. Sector-specific news for each stock
6. Recent earnings and company-specific developments

Today's date context: provide your best analysis based on your latest knowledge.`

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return res.status(500).json({ error: 'Unexpected response type' })
    }

    const analysis: AnalysisResponse = JSON.parse(content.text)

    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json(analysis)
  } catch (error: any) {
    console.error('Analysis error:', error)
    return res.status(500).json({
      error: 'Analysis failed',
      message: error.message,
    })
  }
}
