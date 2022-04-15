const LOG_PREFIX = '[🤤 dirty-scrapper]'

export const logger = (...args) => console.log(LOG_PREFIX, ...args)

export const time = (string = '') => {
  console.time(`${LOG_PREFIX} ${string}`)
  return () => console.timeEnd(`${LOG_PREFIX} ${string}`)
}
