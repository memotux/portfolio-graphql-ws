import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { createApp, eventHandler, toNodeListener, readBody } from 'h3'
import { useServer } from 'graphql-ws/lib/use/ws'
import { graphql } from 'graphql'
import schema from './schema.js'

const app = createApp()
app.use(
  '/graphql',
  eventHandler(async (event) => {
    const body = await readBody(event)

    return graphql({
      schema,
      source: body.query,
    })
  })
)

const server = createServer(toNodeListener(app))

server.listen(3000, () => {
  const wsServer = new WebSocketServer({
    server,
    path: '/graphql',
  })
  useServer({ schema }, wsServer)
})
