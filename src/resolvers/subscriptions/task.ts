import { pubSub, channels } from "./const"

export default {
  taskAdded: {
    subscribe: (_, __, { user }) => {
      if (user) {
        return pubSub.asyncIterator([channels.userTaskAdded(user.id)])
      }

      // probably should be abstracted away....
      throw new Error("UnAuthorized Action")
    },
  },
}
