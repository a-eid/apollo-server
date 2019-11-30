import { gql } from "apollo-server"

export default gql`
  extend type Query {
    task(id: String): Task
    tasks(pagination: paginationInput): TaskFeed!
  }

  type TaskFeed {
    data: [Task!]!
    pagination: PaginationInfo!
  }

  type PaginationInfo {
    cursor: String
    hasMore: Boolean!
  }

  extend type Mutation {
    createTask(input: CreateTaskInput!): Task!
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

  input paginationInput {
    cursor: String
    limit: Int
  }
`
