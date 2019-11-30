export * from "./auth"

export const combineResolvers = (...funcs) => async (...args) => {
  let resolvedValue = null

  for (const fn of funcs) {
    resolvedValue = await fn(...args)
  }

  return resolvedValue
}
