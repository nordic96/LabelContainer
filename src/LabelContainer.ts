import { Labels } from "./types";

/**
 * @author Stephen Ko
 * Centralised Label Container Class to store and retrieve label strings
 */
class LabelContainer {
    private page: string;
    private language: string;
    private labels: Labels;
    private static instance: LabelContainer;

    private constructor () {
        /** default language set to Eng */
        let language: string = 'en';
        this.language = language;
    }

    public static getInstance(): LabelContainer {
        if (!this.instance) {
            this.instance = new LabelContainer();
        }
        return this.instance;
    }

    public setLabels(labels: Labels) {
        this.labels = labels;
    }

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
            if (this.page) return this.labels[this.page][this.language][key];    
            return this.labels.GLOBAL[this.language][key];
        } catch (e) {
            console.debug(e.message);
            return key;
        }
    }
}

export default LabelContainer;
