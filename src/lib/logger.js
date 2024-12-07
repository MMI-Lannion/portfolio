export const logger = (scope = '') => ({
  info: console.info.bind(null, `[${scope}]:`),
  debug: console.debug.bind(null, `[${scope}]:`),
  warn: console.warn.bind(null, `[${scope}]:`),
  error: console.error.bind(null, `[${scope}]:`),
})
