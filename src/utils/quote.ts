import { StringBodyTarget } from '../services/parser';

const quotes = {
  '"': {
    next: "'",
    current: '"',
    previous: "`",
  },
  "'": {
    next: "`",
    current: "'",
    previous: '"',
  },
  '`': {
    next: '"',
    current: '`',
    previous: "'",
  }
}

export function getNextQuotes(activeTarget: StringBodyTarget) : string {
  const quote = quotes[activeTarget.opening];
  const currentEscaped = new RegExp('\\\\' + quote.current, 'g');
  const nextToEscape = new RegExp(quote.next, 'g');
  const final = activeTarget.body
    .replace(currentEscaped, quote.current)
    .replace(nextToEscape, '\\' + quote.next);

  return quote.next + final + quote.next;
}