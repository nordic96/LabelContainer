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
    /** setter method for page */
    setPage(page) {
        this.page = page;
    }
    /** getter method for page */
    getPage() {
        return this.page;
    }
    getLabel(key) {
        try {
            let label;
            /** If no page specified in the instnace, return the global label */
            let lang = 'en';
            let page = 'GLOBAL';
            /** If Page & Language Specific Label exists, return this label */
            if (this.page)
                page = this.page;
            if (this.language)
                lang = this.language;
            if (this.labels[page][lang] === undefined)
                lang = 'en';
            label = this.labels[page][lang][key];
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
