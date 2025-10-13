import { getDateRange, formatArticle } from '@/lib/utils';

describe('getDateRange', () => {
    it('returns a date range covering the provided number of days', () => {
        const { from, to } = getDateRange(7);
        expect(from).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(new Date(to).getTime() - new Date(from).getTime()).toBeGreaterThanOrEqual(6 * 24 * 60 * 60 * 1000);
    });
});

describe('formatArticle', () => {
    it('formats an article correctly', () => {
        const rawArticle = {
            id: 1,
            headline: "Sample Article",
            url: "https://example.com/sample-article",
            summary: "This is a sample summary of the article that is definitely longer than one hundred characters to test the truncation logic in the formatArticle function.",
        }
        const formatted = formatArticle(rawArticle, true, 'AAPL');
        expect(formatted.summary.endsWith('...')).toBe(true);
        expect(formatted.headline).toBe("Sample Article");
        expect(formatted.url).toBe("https://example.com/sample-article");
        expect(formatted.related).toBe('AAPL');
        });
    });