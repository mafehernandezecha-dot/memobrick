import { describe, expect, it } from 'vitest';
import { parseLine, transcript } from './claudeCli';

describe('claudeCli', () => {
  it('reads streamed text, the final result, and errors', () => {
    expect(parseLine('{"type":"stream_event","event":{"type":"content_block_delta","delta":{"type":"text_delta","text":"Hi"}}}')).toEqual({ delta: 'Hi' });
    expect(parseLine('{"type":"result","subtype":"success","is_error":false,"result":"Hi Eden"}')).toEqual({ result: 'Hi Eden' });
    expect(parseLine('{"type":"result","is_error":true,"result":"Not logged in"}')).toEqual({ error: 'Not logged in' });
    expect(parseLine('not json')).toEqual({});
  });

  it('sends a first message as is and later ones with the history', () => {
    expect(transcript([{ role: 'user', content: 'Hello' }])).toBe('Hello');
    const t = transcript([
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi Eden' },
      { role: 'user', content: 'Thanks' },
    ]);
    expect(t).toContain('Eden: Hello');
    expect(t).toContain('Betty: Hi Eden');
    expect(t.endsWith('Thanks')).toBe(true);
  });
});
