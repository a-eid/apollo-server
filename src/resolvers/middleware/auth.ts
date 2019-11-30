export function auth(_, __, { user }) {
  if (!user) throw new Error("UnAuthorized Action.")
}
