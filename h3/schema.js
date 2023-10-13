import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello GraphQL',
  },
}

export default makeExecutableSchema({ typeDefs, resolvers })
