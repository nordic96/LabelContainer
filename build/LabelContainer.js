"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Stephen Ko
 * @since 14 Feb 2022
 * Centralised Label Container Class to store and retrieve label strings
 */
var LabelContainer = /** @class */ (function () {
    function LabelContainer() {
        /** default language set to Eng */
        var language = 'en';
        this.language = language;
    }
    /** Singleton get instance method */
    LabelContainer.getInstance = function () {
        if (!this.instance) {
            this.instance = new LabelContainer();
        }
        return this.instance;
    };
    /** setter method for labels property */
    LabelContainer.prototype.setLabels = function (labels) {
        this.labels = labels;
    };
    /** getter method for labels property */
    LabelContainer.prototype.getLabels = function () {
        return this.labels;
    };
    /** setter method for language property */
    LabelContainer.prototype.setLanguage = function (language) {
        this.language = language;
    };
    /** getter method for language property */
    LabelContainer.prototype.getLanguage = function () {
        return this.language;
    };
    /** setter method for page */
    LabelContainer.prototype.setPage = function (page) {
        this.page = page;
    };
    /** getter method for page */
    LabelContainer.prototype.getPage = function () {
        return this.page;
    };
    LabelContainer.prototype.getLabel = function (key) {
        try {
            /** If no page specified in the instnace, return the global label */
            var lang = 'en';
            var page = 'GLOBAL';
            /** If Page & Language Specific Label exists, return this label */
            if (this.page)
                page = this.page;
            if (this.language)
                lang = this.language;
            if (this.labels[page][lang] === undefined)
                lang = 'en';
            var label = this.labels[page][lang][key];
            /** If both cases above fails to load the label, return the key */
            if (label)
                return label;
            return key;
        }
        catch (e) {
            /** Any exception caught from trying the label retrieval, return the key */
            if (e instanceof Error)
                console.debug(e.message);
            return key;
        }
    };
    return LabelContainer;
}());
exports.default = LabelContainer;
