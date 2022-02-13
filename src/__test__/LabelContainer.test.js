import LabelContainer from "..";
import { Labels } from "../types";

const StubLabel = {
    GLOBAL: {
        en: {
            key_a: 'Hello World',
        },
    },
};

test('should return label', () => {
    global.confirm = () => true;

    const labelInstance = LabelContainer.getInstance();
    labelInstance.setLabels(StubLabel);

    expect(labelInstance.getLabel('key_a')).toBe('Hello World');
});