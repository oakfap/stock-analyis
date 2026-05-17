import type { StockAnalysis, NewsItem, MarketOverview } from '../types'

export const marketOverview: MarketOverview = {
  weekOf: '2026-05-12 to 2026-05-16',
  summary:
    'Markets pulled back after the Trump-Xi summit ended without policy breakthroughs. Rising Treasury yields and inflation concerns weighed on tech stocks.',
  fedRate: '3.50-3.75%',
  inflation: '3.5% PCE YoY',
  oil: '$109/barrel',
}

export const stockAnalyses: StockAnalysis[] = [
  {
    date: '2026-05-17',
    ticker: 'NVDA',
    company: 'NVIDIA Corporation',
    signal: 'HOLD',
    confidence: 'Medium',
    keyReasons: ['81% AI chip market share', '$1T Blackwell/Vera Rubin order pipeline'],
    riskFactors: ['Wall Street rotation to AMD/Intel', 'BTIG warns 25-30% sector correction'],
    newsSummary: 'Dominates AI chips but rotation risk rising.',
    sector: 'Semiconductors',
  },
  {
    date: '2026-05-17',
    ticker: 'AMD',
    company: 'Advanced Micro Devices',
    signal: 'HOLD',
    confidence: 'Medium',
    keyReasons: ['38% Q1 revenue growth', 'OpenAI and Meta 12GW contracts'],
    riskFactors: ['Already doubled — profit-taking risk', 'Sector correction warning'],
    newsSummary: 'Strong AI momentum but stretched after massive gains.',
    sector: 'Semiconductors',
  },
  {
    date: '2026-05-17',
    ticker: 'MSFT',
    company: 'Microsoft Corporation',
    signal: 'BUY',
    confidence: 'High',
    keyReasons: ['Azure 34% growth', '20M+ Copilot paid seats', 'Strong Buy consensus ~35% upside'],
    riskFactors: ['$190B capex concerns', 'Rate uncertainty'],
    newsSummary: 'Best AI monetization story in big tech.',
    sector: 'Cloud / Software',
  },
  {
    date: '2026-05-17',
    ticker: 'GOOGL',
    company: 'Alphabet Inc',
    signal: 'BUY',
    confidence: 'Medium',
    keyReasons: ['$180-190B AI capex commitment', 'Reasonable 9.56x P/S'],
    riskFactors: ['Capex may pressure margins', 'AI search competition'],
    newsSummary: 'Aggressive AI investment at attractive valuation.',
    sector: 'Cloud / Advertising',
  },
]

export const previousWeekNews: NewsItem[] = [
  {
    title: 'Cerebras IPO raises $5.55B — largest tech IPO since Uber',
    category: 'AI',
    impact: 'Bullish',
    summary: 'Stock soared 68% on debut, then fell 10% next day.',
  },
  {
    title: 'Fed holds rates at 3.50-3.75% with 4 dissenters',
    category: 'Economy',
    impact: 'Neutral',
    summary: 'Rare dissent since 1992. One cut still expected this year.',
  },
]

export const currentWeekNews: NewsItem[] = [
  {
    title: 'Trump-Xi summit ends without breakthroughs',
    category: 'Geopolitical',
    impact: 'Bearish',
    summary: 'Markets sold off on lack of trade policy progress.',
  },
  {
    title: 'Iran War pushes oil to $109',
    category: 'Geopolitical',
    impact: 'Bearish',
    summary: 'Energy sector +40% YTD, weighing on broader market.',
  },
  {
    title: 'AI chip rotation accelerates: AMD/Intel double, NVDA lags',
    category: 'Sector',
    impact: 'Neutral',
    summary: 'Wall Street shifting AI bets to cheaper alternatives.',
  },
]

export const nextWeekNews: NewsItem[] = [
  {
    title: 'NVIDIA earnings report expected',
    category: 'AI',
    impact: 'Bullish',
    summary: 'Key catalyst for semiconductor sector direction.',
  },
  {
    title: 'Fed minutes release',
    category: 'Economy',
    impact: 'Neutral',
    summary: 'Watch for rate cut timing signals.',
  },
]
