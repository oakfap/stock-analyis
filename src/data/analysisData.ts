import type { StockAnalysis, NewsItem, MarketOverview } from '../types'

export const marketOverview: MarketOverview = {
  date: '2026-05-17',
  sp500: { value: 7408.5, change: -1.24 },
  nasdaq: { value: 26225.14, change: -1.54 },
  dow: { value: 49526.17, change: -1.07 },
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
      'Only +15% YTD — underperforming peers as rotation accelerates',
    ],
    riskFactors: [
      'Wall Street rotation to AMD/Intel',
      '25-30% sector correction warning from BTIG',
      'Geopolitical risk from Iran conflict',
    ],
    newsSummary:
      'Nvidia dominates AI chips but Wall Street love is shifting to Intel/AMD. Stock dropped 4.4% on May 15. Revenue hit $215.9B in FY2026.',
    ytdChange: 15,
    price: 178.5,
    sector: 'Semiconductors',
  },
  {
    date: '2026-05-17',
    ticker: 'AMD',
    company: 'Advanced Micro Devices',
    signal: 'HOLD',
    confidence: 'Medium',
    keyReasons: [
      '+114% YTD gain — massive momentum',
      '38% revenue growth in Q1 2026',
      'Major contracts with OpenAI and Meta for 12GW of AI data center chips',
    ],
    riskFactors: [
      'Already doubled — elevated profit-taking risk',
      'BTIG warns of 25-30% semiconductor correction',
      'Lost 5.7% on May 15 sell-off',
    ],
    newsSummary:
      'AMD surging on AI momentum with major contracts but has already run up significantly. High correction risk after massive gains.',
    ytdChange: 114,
    price: 245.3,
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
      'Strong Buy consensus with ~35% upside target to $560',
    ],
    riskFactors: [
      '$190B capex raising cost concerns',
      'Bill Gates sold entire stake',
      'Inflation and rate uncertainty',
    ],
    newsSummary:
      'Strong Q3 with 18% revenue growth. Ackman took $2.09B stake. AI monetization via Copilot accelerating. Most balanced Mag 7 bet.',
    ytdChange: 12,
    price: 415.2,
    sector: 'Cloud / Software',
  },
  {
    date: '2026-05-17',
    ticker: 'GOOGL',
    company: 'Alphabet Inc',
    signal: 'BUY',
    confidence: 'Medium',
    keyReasons: [
      '$35.7B Q1 capex for AI infrastructure — aggressive buildout',
      'Raised full-year capex to $180-190B',
      'Reasonable valuation at 9.56x forward P/S vs peers',
    ],
    riskFactors: [
      'Massive capex could pressure margins',
      'Regulatory risks in search/ads',
      'Competition in AI search from OpenAI',
    ],
    newsSummary:
      'Alphabet aggressively investing in AI infrastructure. Pushed S&P 500 earnings growth to 27%. Trading at reasonable valuation relative to big tech peers.',
    ytdChange: 18,
    price: 400.8,
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
      'Geopolitical tensions impacting ad markets',
    ],
    newsSummary:
      'Part of the massive AI infrastructure buildout wave. Solid earnings contributor but limited near-term upside catalyst.',
    ytdChange: 8,
    price: 620.5,
    sector: 'Social / Advertising',
  },
  {
    date: '2026-05-17',
    ticker: 'PLTR',
    company: 'Palantir Technologies',
    signal: 'HOLD',
    confidence: 'High',
    keyReasons: [
      '85% YoY revenue growth in Q1 — exceptional',
      '57% free cash flow margin',
      'Raised full-year guidance to 71% growth',
    ],
    riskFactors: [
      'Legal challenges and government scrutiny',
      'Extremely high valuation after massive run',
      'Profit-taking risk in any tech pullback',
    ],
    newsSummary:
      'Exceptional growth metrics but valuation stretched. Trading around $133. Analysts see 35% upside but risks remain elevated.',
    ytdChange: 45,
    price: 133.06,
    sector: 'AI / Government Tech',
  },
  {
    date: '2026-05-17',
    ticker: 'SMCI',
    company: 'Super Micro Computer',
    signal: 'SELL',
    confidence: 'Medium',
    keyReasons: [
      'Hold rating from Wall Street — bearish signal',
      'Weaker competitive moat vs Dell/HPE in AI servers',
      'Historical accounting concerns linger',
    ],
    riskFactors: [
      'Competitive pressure from Dell and HPE',
      'Valuation concerns',
      '25-30% sector correction risk',
    ],
    newsSummary:
      'Analysts cautious with Hold rating. Less differentiated in AI server space. Underperforming peers in the AI infrastructure theme.',
    ytdChange: -12,
    price: 42.8,
    sector: 'AI Servers',
  },
]

export const newsItems: NewsItem[] = [
  {
    title: 'Iran War pushes oil to $109 — energy sector +40% YTD',
    category: 'Geopolitical',
    impact: 'Bearish',
    summary:
      'Surging oil prices from the Iran conflict are causing long-term problems in financial markets. Energy is the top-performing sector in 2026.',
  },
  {
    title: 'Wall Street AI chip rotation: AMD/Intel surge while NVDA lags',
    category: 'Sector',
    impact: 'Neutral',
    summary:
      'Intel, AMD, and Micron have more than doubled in 2026, while Nvidia gained only 15%. A changing of the guard in AI chips.',
  },
  {
    title: 'Cerebras IPO raises $5.55B — largest tech IPO since Uber',
    category: 'AI',
    impact: 'Bullish',
    summary:
      'Cerebras stock soared 68% on debut day, then fell 10% on its first full trading day. Signals strong appetite for AI infrastructure.',
  },
  {
    title: 'Big Tech spending $700B on AI infrastructure in 2026',
    category: 'AI',
    impact: 'Bullish',
    summary:
      'Amazon, Alphabet, Microsoft, and Meta plan massive AI infrastructure spending, driving earnings growth above 27%.',
  },
  {
    title: 'BTIG warns of 25-30% semiconductor correction risk',
    category: 'Sector',
    impact: 'Bearish',
    summary:
      'PHLX Semiconductor Index is up 66% YTD. Analyst warns the rally may be overextended with significant downside risk.',
  },
  {
    title: 'Fed holds rates at 3.50-3.75% — 4 dissenters (rare since 1992)',
    category: 'Economy',
    impact: 'Neutral',
    summary:
      'The Fed kept rates unchanged for the third meeting. Core PCE at 3.5% remains elevated. One rate cut still expected this year.',
  },
  {
    title: 'Trump-Xi summit ends without breakthroughs — markets sell off',
    category: 'Geopolitical',
    impact: 'Bearish',
    summary:
      'Stocks fell as traders worried about lack of policy progress. S&P 500 shed 1.24% and Nasdaq dropped 1.54%.',
  },
  {
    title: 'Semiconductor market forecast raised to $1.3T for 2026',
    category: 'Sector',
    impact: 'Bullish',
    summary:
      'Bank of America raised its global semiconductor market forecast from $1T to $1.3T for 2026, potentially $2T by 2030.',
  },
]
