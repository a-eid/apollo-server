import { Schema, model } from "mongoose"
import { names } from "./consts"

const schema = new Schema({
  name: String,
  email: String,
  password: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: names.task }],
})

export default model(names.user, schema)
