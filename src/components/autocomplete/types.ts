export interface Option {
    displayValue: string;
    value: string;
}

export interface AutocompleteConfigs {
    delay: number;
    placeholder: string;
    options: Option[];
}