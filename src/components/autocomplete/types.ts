
export interface Option {
  id: number
  value: string
}

export interface AutocompleteProps {
  delay?: number
  placeholder?: string
  displayedOptionsLimit?: number
  apiData?: ApiData
}

export interface AutocompleteConfigs extends Required<Omit<AutocompleteProps, 'apiData'>> {
  options: Option[]
  isDataLoading: boolean
  isFocused: boolean
  apiData?: ApiData
  error: string
}

export interface OptionsProps {
  options: Option[]
  isDisplayed: boolean
  isLoading: boolean
  currentValue: string
  displayedOptionsLimit: number
  handleSelection: (value: string) => void
}

export interface ApiData {
  url: string
  valueKeysNesting: string[]
}
