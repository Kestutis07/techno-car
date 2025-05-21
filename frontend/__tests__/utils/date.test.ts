import { formatDate } from '../../src/utils/data';

discribe('Get formatted date', () => {
  it('Formats date from ISO string to correct year/month/day', () => {
    const results = formatDate('2013-01-01T00:00:00.000Z');

    expect(results).toBe('2013-01-01');
  });
});
