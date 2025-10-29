/**
 * Labels Structure
 * First Layer is page -> Second Layer: Country (Language Settings)
 * -> Third Layer (label key) -> Label String (value)
 */
/**
 * @type {Record<string, string>}
 */
export type LabelBlock = Record<string, string>;
/**
 * @type {Record<string, LabelBlock>}
 */
export type LangLabels = Record<string, LabelBlock>;
/**
 * @type {Record<string, LangLabels>}
 */
export type Labels = Record<string, LangLabels>;
