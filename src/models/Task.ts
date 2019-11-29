import { Schema, model } from "mongoose"
import { NAME as user } from "./User"

const schema = new Schema({
  name: String,
  completed: Boolean,
  user: { type: Schema.Types.ObjectId, ref: user },
})

export const NAME = "Task"
export default model(NAME, schema)
