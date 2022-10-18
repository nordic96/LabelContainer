import { LabelBlock, Labels, LangLabels } from './types';

/**
 * @since 14 Feb 2022
 * Centralised Label Container Class to store and retrieve label strings
 */
class LabelContainer {
    /** which page the component is located */
    private page: string;
    /** language preference from the browser (user/local) */
    private language: string;
    /** labels object to be used to retrieve labels */
    private labels: Labels;
    /** singleton instance */
    private static instance: LabelContainer;

    private constructor(lang?: string, page?: string) {
        /** If no page specified in the instnace, return the global label */
        this.language = lang || 'en';
        this.page = page || 'GLOBAL';
    }

    /** Singleton get instance method */
    public static getInstance(lang?: string, page?: string): LabelContainer {
        if (!this.instance) {
            this.instance = new LabelContainer(lang, page);
        }
        return this.instance;
    }

    /** setter method for labels property */
    public setLabels(labels: Labels): void {
        this.labels = labels;
    }

    /** getter method for labels property */
    public getLabels(): Labels {
        return this.labels;
    }

    /** setter method for language property */
    public setLanguage(language: string): void {
        this.language = language;
    }

    /** getter method for language property */
    public getLanguage(): string {
        return this.language;
    }

    /** setter method for page */
    public setPage(page: string): void {
        this.page = page;
    }

    /** getter method for page */
    public getPage(): string {
        return this.page;
    }

    public getLabel(key: string): string {
        try {
            let label = key;
            let pageLabels: LangLabels = this.labels[this.page];
            /** Setting LangLabels to Global if page entry does not exist */
            if (pageLabels === undefined) {
                pageLabels = this.labels['GLOBAL'];
            }
            /** Setting LabelBlock to Eng if language entry does not exist */
            let labelBlock: LabelBlock = pageLabels[this.language];
            if (labelBlock === undefined) {
                labelBlock = pageLabels['en'];
            }
            label = labelBlock[key];
            /** If both cases above fails to load the label, return the key */
            if (label == undefined) label = key;
            return label;
        } catch (e: unknown) {
            /** Any exception caught from trying the label retrieval, return the key */
            if (e instanceof Error) console.debug(e.message);
            return key;
        }
    }
}

export default LabelContainer;
