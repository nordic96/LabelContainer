/**
 * Labels Structure
 * First Layer is page -> Second Layer: Country (Language Settings)
 * -> Third Layer (label key) -> Label String (value)
 */
export type Labels = Record<string, LangLabels>;
export type LangLabels = Record<string, LabelBlock>;
export type LabelBlock = Record<string, string>;
