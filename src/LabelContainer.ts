import { Labels } from "./types";

const GLOBAL = 'GLOBAL';
const LANG_EN = 'en';

/**
 * @since 14 Feb 2022
 * Centralised Label Container Class to store and retrieve label strings
 */
class LabelContainer {
    private labels: Labels = {};
    private page = GLOBAL;
    private language = LANG_EN;
    private static instance: LabelContainer;

    constructor(initial?: { labels?: Labels, page?: string, language?: string }) {
        if (initial?.labels) this.labels = initial.labels;
        if (initial?.page) this.page = initial.page;
        if (initial?.language) this.language = initial.language;
    }

    /** Singleton get instance method */
    static getInstance(initial?: { labels?: Labels, page?: string, language?: string }): LabelContainer {
        if (!this.instance) {
            this.instance = new LabelContainer(initial);
        }
        return this.instance;
    }

    setLabels(labels: Labels) { this.labels = labels; }
    setPage(page: string) { this.page = page; }
    setLanguage(lang: string) { this.language = lang };

    /**
     * Label Extraction function
     * @param key Label key user wish to extract the label from labels storage
     * @returns desired value from the key provided to the labels storage
     */
    getLabel(key: string): string {
        const pageBlock = this.labels[this.page] ?? this.labels[GLOBAL];
        const langBlock = pageBlock?.[this.language] ?? pageBlock?.[LANG_EN];
        return langBlock?.[key] ?? key;
    }

    /**
     * Helper function to check if label exists
     * @param key Label Key user wish to check if exists in labels storage
     * @returns true if key exists
     */
    hasLabel(key: string): boolean {
        const pageBlock = this.labels[this.page] ?? this.labels[GLOBAL];
        const langBlock = pageBlock?.[this.language] ?? pageBlock?.[LANG_EN];
        return !!langBlock?.[key];
    }

    /**
     * Helper function to return a list of languages set in labels
     * @type {string[]}
     * @returns languages as string array
     */
    getAllLanguages(): string[] {
        return Object.keys(this.labels) || [];
    }
}

export default LabelContainer;
