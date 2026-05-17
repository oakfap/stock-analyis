export type Signal = 'BUY' | 'HOLD' | 'SELL'
export type Confidence = 'Low' | 'Medium' | 'High'

export interface StockAnalysis {
  date: string
  ticker: string
  company: string
  signal: Signal
  confidence: Confidence
  keyReasons: string[]
  riskFactors: string[]
  newsSummary: string
  ytdChange?: number
  price?: number
  sector?: string
}

export interface NewsItem {
  title: string
  category: 'AI' | 'Market' | 'Geopolitical' | 'Sector' | 'Economy'
  impact: 'Bullish' | 'Bearish' | 'Neutral'
  summary: string
  source?: string
  url?: string
}

export interface MarketOverview {
  date: string
  sp500: { value: number; change: number }
  nasdaq: { value: number; change: number }
  dow: { value: number; change: number }
  summary: string
  fedRate: string
  inflation: string
  oil: string
}

export type FilterSignal = Signal | 'ALL'
