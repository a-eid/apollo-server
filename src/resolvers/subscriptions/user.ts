import { pubSub, channels } from "./const"
export default {
  userAdded: {
    subscribe: () => pubSub.asyncIterator([channels.userAdded()]),
  },
}
