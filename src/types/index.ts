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
  sector?: string
}

export interface NewsItem {
  title: string
  category: 'AI' | 'Market' | 'Geopolitical' | 'Sector' | 'Economy'
  impact: 'Bullish' | 'Bearish' | 'Neutral'
  summary: string
}

export interface WeeklyNews {
  previousWeek: NewsItem[]
  currentWeek: NewsItem[]
  nextWeek: NewsItem[]
}

export interface MarketOverview {
  weekOf: string
  summary: string
  fedRate: string
  inflation: string
  oil: string
}

export type FilterSignal = Signal | 'ALL'
