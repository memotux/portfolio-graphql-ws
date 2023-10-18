import type { Resolvers } from '#graphql/resolver'

export default <Resolvers>{
  Query: {
    hello: () => 'Hello GraphQL',
  },
  Subscription: {
    greeting: {
      resolve: (payload: string) => payload,
      subscribe: async function* () {
        for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
          yield hi
        }
      },
    },
  },
}