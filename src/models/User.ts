import { Schema, model } from "mongoose"

const schema = new Schema({
  name: String,
  email: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
})

export const NAME = "User"
export default model(NAME, schema)
