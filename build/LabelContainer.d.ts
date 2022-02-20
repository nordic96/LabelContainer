import { Labels } from "./types";
/**
 * @author Stephen Ko
 * @since 14 Feb 2022
 * Centralised Label Container Class to store and retrieve label strings
 */
declare class LabelContainer {
    /** which page the component is located */
    private page;
    /** language preference from the browser (user/local) */
    private language;
    /** labels object to be used to retrieve labels */
    private labels;
    /** singleton instance */
    private static instance;
    private constructor();
    /** Singleton get instance method */
    static getInstance(): LabelContainer;
    /** setter method for labels property */
    setLabels(labels: Labels): void;
    /** getter method for labels property */
    getLabels(): Labels;
    /** setter method for language property */
    setLanguage(language: string): void;
    /** getter method for language property */
    getLanguage(): string;
    /** setter method for page */
    setPage(page: string): void;
    /** getter method for page */
    getPage(): string;
    getLabel(key: string): string;
}
export default LabelContainer;
