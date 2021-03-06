import LabelContainer from "..";
import { Labels } from "../types";

const StubLabel = {
    GLOBAL: {
        en: {
            key_a: 'Hello World',
        },
        ko: {
            key_a: '안녕',
        }
    },
    page_a : {
        en: {
            key_a: 'Hello Page A',
        },
        cn: {
            key_a: 'Da Jia Hao',
        },
    },
};

test('should return label', () => {
    const labelInstance = LabelContainer.getInstance();
    labelInstance.setLabels(StubLabel);

    expect(labelInstance.getLabel('key_a')).toBe('Hello World');
});

test('should return other language label with the same key', () => {
    const labelInstance = LabelContainer.getInstance();
    labelInstance.setLanguage('ko');

    expect(labelInstance.getLabel('key_a')).toBe('안녕');
});

test('should not return label', () => {
    const labelInstance = LabelContainer.getInstance();
    labelInstance.setLanguage('en');
    expect(labelInstance.getLabel('key_b')).toBe('key_b');
});

test('should return page specific label', () => {
    const labelInsance = LabelContainer.getInstance();
    labelInsance.setPage('page_a');
    
    expect(labelInsance.getLabel('key_a')).toBe('Hello Page A');
});

test('should return en label if no language set', () => {
    const labelInstance = LabelContainer.getInstance();
    labelInstance.setLanguage('ko');
    expect(labelInstance.getLabel('key_a')).toBe('Hello Page A');
});

test('should return language specific label if exists', () => {
    const labelInstance = LabelContainer.getInstance();
    labelInstance.setLanguage('cn');
    expect(labelInstance.getLabel('key_a')).toBe('Da Jia Hao');
})
