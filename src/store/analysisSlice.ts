import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { StockAnalysis, NewsItem, MarketOverview, FilterSignal } from '../types'
import { stockAnalyses, newsItems, marketOverview } from '../data/analysisData'

interface AnalysisState {
  stocks: StockAnalysis[]
  news: NewsItem[]
  market: MarketOverview
  filterSignal: FilterSignal
  selectedTicker: string | null
  searchQuery: string
}

const initialState: AnalysisState = {
  stocks: stockAnalyses,
  news: newsItems,
  market: marketOverview,
  filterSignal: 'ALL',
  selectedTicker: null,
  searchQuery: '',
}

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
  },
})

export const { setFilterSignal, setSelectedTicker, setSearchQuery } = analysisSlice.actions
export default analysisSlice.reducer
