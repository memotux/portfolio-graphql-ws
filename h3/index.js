import { createServer } from 'node:http'
import { createApp, eventHandler, toNodeListener } from 'h3'

const app = createApp()
app.use(
  '/',
  eventHandler(() => 'Hello world!')
)

createServer(toNodeListener(app)).listen(3000)
