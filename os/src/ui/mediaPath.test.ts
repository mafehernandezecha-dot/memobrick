import { describe, expect, it } from 'vitest';
import { resolveMediaSrc, resolveRepoPath } from './mediaPath';

const doc = 'marketing/email/campaign-writer/2026-10-22-photo-tips.md';

describe('resolveRepoPath', () => {
  it('resolves next to the doc', () => {
    expect(resolveRepoPath('2026-10-22-photo-tips-preview.png', doc)).toBe('marketing/email/campaign-writer/2026-10-22-photo-tips-preview.png');
  });
  it('handles ./ and ../', () => {
    expect(resolveRepoPath('./img/a.png', doc)).toBe('marketing/email/campaign-writer/img/a.png');
    expect(resolveRepoPath('../flow-optimizer/b.png', doc)).toBe('marketing/email/flow-optimizer/b.png');
  });
  it('decodes escaped names', () => {
    expect(resolveRepoPath('my%20photo.png', doc)).toBe('marketing/email/campaign-writer/my photo.png');
  });
  it('refuses to climb above the repo root', () => {
    expect(resolveRepoPath('../../../../x.png', doc)).toBeNull();
  });
});

describe('resolveMediaSrc', () => {
  it('maps relative images to the media route', () => {
    expect(resolveMediaSrc('preview.png', doc)).toBe(`/api/media?path=${encodeURIComponent('marketing/email/campaign-writer/preview.png')}`);
  });
  it('leaves absolute URLs alone', () => {
    expect(resolveMediaSrc('https://cdn.example.com/a.png', doc)).toBe('https://cdn.example.com/a.png');
    expect(resolveMediaSrc('data:image/png;base64,AAAA', doc)).toBe('data:image/png;base64,AAAA');
    expect(resolveMediaSrc('/avatars/betty.png', doc)).toBe('/avatars/betty.png');
  });
  it('returns null for paths outside the repo', () => {
    expect(resolveMediaSrc('../../../../../etc/x.png', doc)).toBeNull();
  });
});
