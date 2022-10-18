import LabelContainer from '..';
import { StubLabel } from './__fixtures__/constants';

describe('Testing LabelContainer Class', () => {
    let labelInstance: LabelContainer;
    beforeAll(() => {
        const labelInstance = LabelContainer.getInstance();
        labelInstance.setLabels(StubLabel);
    });
    beforeEach(() => {
        labelInstance = LabelContainer.getInstance();
    });

    it('should return label', () => {
        expect(labelInstance.getLabel('key_a')).toBe('Hello World');
    });

    it('should return other language label with the same key', () => {
        labelInstance.setLanguage('ko');
        expect(labelInstance.getLabel('key_a')).toBe('안녕');
    });

    it('should not return label', () => {
        labelInstance.setLanguage('en');
        expect(labelInstance.getLabel('key_b')).toBe('key_b');
    });

    it('should return page specific label', () => {
        labelInstance.setPage('page_a');
        expect(labelInstance.getLabel('key_a')).toBe('Hello Page A');
    });

    it('should return en label if no language set', () => {
        labelInstance.setLanguage('ko');
        expect(labelInstance.getLabel('key_a')).toBe('Hello Page A');
    });

    it('should return language specific label if exists', () => {
        labelInstance.setLanguage('cn');
        expect(labelInstance.getLabel('key_a')).toBe('Da Jia Hao');
    });
});
