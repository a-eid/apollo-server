import { User } from "../../models"

async function fetchUsers(ids: [string]) {
  const cache = {}
  const idsx = {}
  ids.forEach(id => (idsx[id] = true))

  //
  ;(await User.find({ _id: { $in: Object.keys(idsx) } })).forEach(user => {
    cache[user.id] = user
  })

  return ids.map(id => cache[id])
}

export default {
  fetchUsers,
}
