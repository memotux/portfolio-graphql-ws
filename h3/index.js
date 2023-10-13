import { createServer } from 'node:http'
import { createApp, eventHandler, toNodeListener, readBody } from 'h3'
import { graphql } from 'graphql'
import schema from './schema.js'

const app = createApp()
app.use(
  '/',
  eventHandler(async (event) => {
    const body = await readBody(event)

    return graphql({
      schema,
      source: body.query,
    })
  })
)

createServer(toNodeListener(app)).listen(3000)
