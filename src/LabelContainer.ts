import { Labels } from "./types";

/**
 * @author Stephen Ko
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

    private constructor () {
        /** default language set to Eng */
        let language: string = 'en';
        this.language = language;
    }

    /** Singleton get instance method */
    public static getInstance(): LabelContainer {
        if (!this.instance) {
            this.instance = new LabelContainer();
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

    public getLabel(key: string) {
        try {
            let label: string;
            /** If no page specified in the instnace, return the global label */
            let lang = 'en';
            let page = 'GLOBAL';
            /** If Page & Language Specific Label exists, return this label */
            if (this.page) page = this.page;
            if (this.language) lang = this.language;
            if (this.labels[page][lang] === undefined) lang = 'en';
            label = this.labels[page][lang][key];

            /** If both cases above fails to load the label, return the key */
            if (label) return label;
            return key;
        } catch (e) {
            /** Any exception caught from trying the label retrieval, return the key */
            console.debug(e.message);
            return key;
        }
    }
}

export default LabelContainer;
