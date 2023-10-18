import { graphql } from 'graphql'
import schema from '../graphql/schema'

export default eventHandler(async (event) => {
  handleCors(event, {})
  const body = await readBody(event)

  return graphql({
    schema,
    source: body.query,
  })
})
