import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String
  }
  type Subscription {
    greeting: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello GraphQL',
  },
  Subscription: {
    greeting: {
      resolve: (payload) => payload,
      subscribe: async function* () {
        for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
          yield hi
        }
      },
    },
  },
}

export default makeExecutableSchema({ typeDefs, resolvers })
