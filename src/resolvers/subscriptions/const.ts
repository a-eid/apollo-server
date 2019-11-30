import { PubSub } from "apollo-server"

export const pubSub = new PubSub()

export const channels = {
  userAdded: () => `userAdded`,
  userTaskAdded: id => `${id}-taskAdded`,
}
