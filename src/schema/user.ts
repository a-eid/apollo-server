import { gql } from "apollo-server"

export default gql`
  type Query {
    me: User!
  }

  type Mutation {
    register(input: registerInput): AuthPayload!
    login(input: loginInput): AuthPayload!
  }

  type Subscription {
    userAdded: User
  }

  input loginInput {
    email: String!
    password: String!
  }

  input registerInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]!
  }
`
