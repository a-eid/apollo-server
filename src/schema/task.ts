import { gql } from "apollo-server"

export default gql`
  extend type Query {
    task(id: String): Task
    tasks: [Task!]!
  }

  extend type Mutation {
    createTask(input: CreateTaskInput): Task!
  }

  input CreateTaskInput {
    name: String!
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`
