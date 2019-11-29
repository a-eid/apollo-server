import { gql } from "apollo-server"

export default gql`
  type Query {
    user(id: String): User
    users: [User!]!
  }

  type Mutation {
    createUser(input: CreateUserInput): User!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]!
  }
`
