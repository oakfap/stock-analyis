import type { StockAnalysis, NewsItem, MarketOverview } from '../types'

export const marketOverview: MarketOverview = {
  date: '2026-05-17',
  summary:
    'Markets pulled back after the Trump-Xi summit ended without policy breakthroughs. Rising Treasury yields and inflation concerns weighed on tech stocks. The Iran War continues to push oil prices higher.',
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
    keyReasons: [
      'Market leader with 81% AI chip share',
      '$1T order pipeline for Blackwell/Vera Rubin processors',
      'Wall Street rotation shifting to AMD/Intel',
    ],
    riskFactors: [
      '25-30% sector correction warning from BTIG',
      'Geopolitical risk from Iran conflict',
    ],
    newsSummary: 'Nvidia dominates AI chips but Wall Street love is shifting to Intel/AMD.',
    sector: 'Semiconductors',
  },
  {
    date: '2026-05-17',
    ticker: 'AMD',
    company: 'Advanced Micro Devices',
    signal: 'HOLD',
    confidence: 'Medium',
    keyReasons: [
      '38% revenue growth in Q1 2026',
      'Major contracts with OpenAI and Meta for 12GW of AI data center chips',
      'Strong momentum in AI chip market',
    ],
    riskFactors: [
      'Already doubled — elevated profit-taking risk',
      'BTIG warns of 25-30% semiconductor correction',
    ],
    newsSummary: 'AMD surging on AI momentum with major contracts but correction risk is high.',
    sector: 'Semiconductors',
  },
  {
    date: '2026-05-17',
    ticker: 'MSFT',
    company: 'Microsoft Corporation',
    signal: 'BUY',
    confidence: 'High',
    keyReasons: [
      'Azure cloud growth accelerating at 34%',
      '20M+ paid Copilot seats — real AI monetization',
      'Strong Buy consensus with ~35% upside target',
    ],
    riskFactors: [
      '$190B capex raising cost concerns',
      'Inflation and rate uncertainty',
    ],
    newsSummary: 'Strong Q3 with 18% revenue growth. AI monetization via Copilot accelerating.',
    sector: 'Cloud / Software',
  },
  {
    date: '2026-05-17',
    ticker: 'GOOGL',
    company: 'Alphabet Inc',
    signal: 'BUY',
    confidence: 'Medium',
    keyReasons: [
      '$35.7B Q1 capex for AI infrastructure',
      'Raised full-year capex to $180-190B',
      'Reasonable valuation at 9.56x forward P/S',
    ],
    riskFactors: [
      'Massive capex could pressure margins',
      'Competition in AI search from OpenAI',
    ],
    newsSummary: 'Alphabet aggressively investing in AI infrastructure at reasonable valuation.',
    sector: 'Cloud / Advertising',
  },
  {
    date: '2026-05-17',
    ticker: 'META',
    company: 'Meta Platforms',
    signal: 'HOLD',
    confidence: 'Medium',
    keyReasons: [
      'Major AI infrastructure spender in $700B big tech buildout',
      'Contributing to S&P 500 earnings growth above 27%',
      'Strong advertising revenue base',
    ],
    riskFactors: [
      'High capex commitments for AI/metaverse',
      'Regulatory scrutiny globally',
    ],
    newsSummary: 'Solid earnings contributor but limited near-term upside catalyst.',
    sector: 'Social / Advertising',
  },
  {
    date: '2026-05-17',
    ticker: 'PLTR',
    company: 'Palantir Technologies',
    signal: 'HOLD',
    confidence: 'High',
    keyReasons: [
      '85% YoY revenue growth in Q1',
      '57% free cash flow margin',
      'Raised full-year guidance to 71% growth',
    ],
    riskFactors: [
      'Extremely high valuation after massive run',
      'Legal challenges and government scrutiny',
    ],
    newsSummary: 'Exceptional growth metrics but valuation stretched.',
    sector: 'AI / Government Tech',
  },
  {
    date: '2026-05-17',
    ticker: 'SMCI',
    company: 'Super Micro Computer',
    signal: 'SELL',
    confidence: 'Medium',
    keyReasons: [
      'Hold rating from Wall Street',
      'Weaker competitive moat vs Dell/HPE in AI servers',
      'Historical accounting concerns',
    ],
    riskFactors: [
      'Competitive pressure from Dell and HPE',
      '25-30% sector correction risk',
    ],
    newsSummary: 'Analysts cautious. Less differentiated in AI server space.',
    sector: 'AI Servers',
  },
]

export const newsItems: NewsItem[] = [
  {
    title: 'Iran War pushes oil to $109 — energy sector +40% YTD',
    category: 'Geopolitical',
    impact: 'Bearish',
    summary: 'Surging oil prices from the Iran conflict are causing long-term problems in financial markets.',
  },
  {
    title: 'Wall Street AI chip rotation: AMD/Intel surge while NVDA lags',
    category: 'Sector',
    impact: 'Neutral',
    summary: 'Intel, AMD, and Micron have more than doubled in 2026, while Nvidia gained only 15%.',
  },
  {
    title: 'Big Tech spending $700B on AI infrastructure in 2026',
    category: 'AI',
    impact: 'Bullish',
    summary: 'Amazon, Alphabet, Microsoft, and Meta plan massive AI infrastructure spending.',
  },
  {
    title: 'BTIG warns of 25-30% semiconductor correction risk',
    category: 'Sector',
    impact: 'Bearish',
    summary: 'PHLX Semiconductor Index is up 66% YTD. Analyst warns the rally may be overextended.',
  },
  {
    title: 'Fed holds rates at 3.50-3.75% — 4 dissenters (rare since 1992)',
    category: 'Economy',
    impact: 'Neutral',
    summary: 'The Fed kept rates unchanged for the third meeting. Core PCE at 3.5% remains elevated.',
  },
]
