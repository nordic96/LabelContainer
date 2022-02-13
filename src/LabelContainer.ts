/**
 * Labels Structure
 * First Layer is page -> Second Layer: Country (Language Settings)
 * -> Third Layer (label key) -> Label String (value)
 */
type Labels = Record<string, Record<string, Record<string, string>>>;

/**
 * @author Stephen Ko
 * Centralised Label Container Class to store and retrieve label strings
 */
class LabelContainer {
    private page: string;
    private language: string;
    private labels: Labels;
    private static instance: LabelContainer;

    private constructor () {}

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
}

export default LabelContainer;
