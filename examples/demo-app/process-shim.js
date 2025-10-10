// Process polyfill for browser
const process = {
  env: typeof window !== 'undefined' ? (window.__ENV__ || {}) : {},
  cwd: () => '/',
  platform: 'browser',
  version: '18.0.0',
  versions: { node: '18.0.0' }
};

if (typeof globalThis !== 'undefined') {
  globalThis.process = process;
} else if (typeof window !== 'undefined') {
  window.process = process;
} else if (typeof global !== 'undefined') {
  global.process = process;
}