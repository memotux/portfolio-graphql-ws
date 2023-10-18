import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { listen } from "listhen";
import schema from '../graphql/schema'

export default defineNitroPlugin(async (nitro) => {
  const { server } = await listen(toNodeListener(nitro.h3App), { port: 3002, showURL: false })
  const wsServer = new WebSocketServer({
    server,
    path: '/',
  })
  useServer({ schema }, wsServer)
})