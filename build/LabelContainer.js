"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Stephen Ko
 * @since 14 Feb 2022
 * Centralised Label Container Class to store and retrieve label strings
 */
class LabelContainer {
    constructor() {
        /** default language set to Eng */
        let language = 'en';
        this.language = language;
    }
    /** Singleton get instance method */
    static getInstance() {
        if (!this.instance) {
            this.instance = new LabelContainer();
        }
        return this.instance;
    }
    /** setter method for labels property */
    setLabels(labels) {
        this.labels = labels;
    }
    /** getter method for labels property */
    getLabels() {
        return this.labels;
    }
    /** setter method for language property */
    setLanguage(language) {
        this.language = language;
    }
    /** getter method for language property */
    getLanguage() {
        return this.language;
    }
    getLabel(key) {
        try {
            let label;
            /** If Page & Language Specific Label exists, return this label */
            if (this.page)
                label = this.labels[this.page][this.language][key];
            /** If no page specified in the instnace, return the global label */
            label = this.labels.GLOBAL[this.language][key];
            /** If both cases above fails to load the label, return the key */
            if (label)
                return label;
            return key;
        }
        catch (e) {
            /** Any exception caught from trying the label retrieval, return the key */
            console.debug(e.message);
            return key;
        }
    }
}
exports.default = LabelContainer;
