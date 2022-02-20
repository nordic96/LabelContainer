/**
 * Labels Structure
 * First Layer is page -> Second Layer: Country (Language Settings)
 * -> Third Layer (label key) -> Label String (value)
 */
export declare type Labels = Record<string, Record<string, Record<string, string>>>;
