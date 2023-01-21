
export interface Option {
    id: number;
    value: string;
}

export interface AutocompleteProps {
    delay?: number;
    placeholder?: string;
}

export interface AutocompleteConfigs extends Required<AutocompleteProps>{
    options: Option[];
    isDataLoading: boolean;
    isFocused: boolean;
    error: string;
}


export interface OptionsProps {
    options: Option[];
    isDisplayed: boolean;
    isLoading: boolean;
    currentValue: string;
    handleSelection: (value: string) => void;
}