import { Labels } from "./types";

/**
 * @author Stephen Ko
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
    public setLabels(labels: Labels) {
        this.labels = labels;
    }

    /** getter method for labels property */
    public getLabels(): Labels {
        return this.labels;
    }

    /** setter method for language property */
    public setLanguage(language: string) {
        this.language = language;
    }

    /** getter method for language property */
    public getLanguage() {
        return this.language;
    }

    public getLabel(key: string) {
        try {
            let label: string;
            /** If Page & Language Specific Label exists, return this label */
            if (this.page) label = this.labels[this.page][this.language][key];
            /** If no page specified in the instnace, return the global label */
            label = this.labels.GLOBAL[this.language][key];

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
