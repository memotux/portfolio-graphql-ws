import { graphql } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { schema as typeDefs } from '#graphql/schema'
import resolvers from '@/server/graphql/resolvers'

export default defineEventHandler(async (event) => {
  handleCors(event, {})
  const body = await readBody(event)
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  return graphql({
    schema,
    source: body.query,
  })
})
