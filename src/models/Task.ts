import { Schema, model } from "mongoose"
import { names } from "./consts"

const schema = new Schema({
  name: String,
  completed: Boolean,
  user: { type: Schema.Types.ObjectId, ref: names.user },
})

export default model(names.task, schema)
