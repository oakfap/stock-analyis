import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { StockAnalysis, NewsItem, MarketOverview, FilterSignal } from '../types'
import { stockAnalyses, newsItems, marketOverview } from '../data/analysisData'

interface AnalysisState {
  stocks: StockAnalysis[]
  news: NewsItem[]
  market: MarketOverview
  filterSignal: FilterSignal
  selectedTicker: string | null
  searchQuery: string
  loading: boolean
  error: string | null
  lastUpdated: string | null
  tickers: string[]
}

const DEFAULT_TICKERS = ['GOOGL', 'NVDA', 'ASML', 'LLY', 'AVGO', 'MU', 'PLTR', 'VRT', 'AMD', 'NBIS', 'RKLB', 'PLUG', 'GEV']

const initialState: AnalysisState = {
  stocks: stockAnalyses,
  news: newsItems,
  market: marketOverview,
  filterSignal: 'ALL',
  selectedTicker: null,
  searchQuery: '',
  loading: false,
  error: null,
  lastUpdated: '2026-05-17T14:00:00Z',
  tickers: DEFAULT_TICKERS,
}

export const fetchAnalysis = createAsyncThunk(
  'analysis/fetch',
  async (tickers: string[]) => {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tickers }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || err.error || 'Analysis failed')
    }
    return res.json()
  }
)

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setFilterSignal(state, action: PayloadAction<FilterSignal>) {
      state.filterSignal = action.payload
    },
    setSelectedTicker(state, action: PayloadAction<string | null>) {
      state.selectedTicker = action.payload
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    setTickers(state, action: PayloadAction<string[]>) {
      state.tickers = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysis.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnalysis.fulfilled, (state, action) => {
        state.loading = false
        state.stocks = action.payload.stocks ?? state.stocks
        state.news = action.payload.news ?? state.news
        if (action.payload.market) {
          state.market = {
            ...state.market,
            ...action.payload.market,
          }
        }
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(fetchAnalysis.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch analysis'
      })
  },
})

export const { setFilterSignal, setSelectedTicker, setSearchQuery, setTickers, clearError } =
  analysisSlice.actions
export default analysisSlice.reducer
