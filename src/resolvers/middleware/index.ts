export * from "./auth"

export const combineResolvers = (...funcs) => async (...args) => {
  const { length, [length - 1]: resolver, ...middlewares } = funcs

  for (const middleware of Object.values(middlewares)) {
    await middleware(...args)
  }

  return resolver(...args)
}
