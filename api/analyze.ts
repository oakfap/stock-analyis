import Anthropic from '@anthropic-ai/sdk'

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

    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay() + 1)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 4)
    const fmt = (d: Date) => d.toISOString().slice(0, 10)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: `Stock analyst doing WEEKLY analysis. Reply ONLY raw JSON, no markdown/fences. Schema:
{"weekOf":"${fmt(weekStart)} to ${fmt(weekEnd)}","market":{"summary":"1-2 sentences","fedRate":"X%","inflation":"X%","oil":"$X"},"stocks":[{"ticker":"SYM","company":"Name","signal":"BUY|HOLD|SELL","confidence":"Low|Medium|High","keyReasons":["r1","r2"],"riskFactors":["r1","r2"],"newsSummary":"1 sentence","sector":"Sector"}],"previousWeek":[{"title":"headline","category":"AI|Market|Geopolitical|Sector|Economy","impact":"Bullish|Bearish|Neutral","summary":"1 sentence"}],"currentWeek":[{"title":"headline","category":"AI|Market|Geopolitical|Sector|Economy","impact":"Bullish|Bearish|Neutral","summary":"1 sentence"}],"nextWeek":[{"title":"upcoming event/earnings/data","category":"AI|Market|Geopolitical|Sector|Economy","impact":"Bullish|Bearish|Neutral","summary":"1 sentence on what to watch"}]}
Rules: under 12 words per reason/summary. 2 keyReasons, 2 riskFactors per stock. 3 items per news section. Be extremely concise.`,
      messages: [{
        role: 'user',
        content: `Weekly analysis for: ${tickers.join(',')}`,
      }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return res.status(500).json({ error: 'Unexpected response type' })
    }

    let text = content.text.trim()
    if (text.startsWith('```')) {
      text = text.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
    }

    let analysis
    try {
      analysis = JSON.parse(text)
    } catch (parseError: any) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      return res.status(500).json({
        error: 'JSON parse failed',
        message: parseError.message,
        rawResponse: text,
        stopReason: message.stop_reason,
      })
    }

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
