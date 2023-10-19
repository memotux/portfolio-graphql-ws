import { defineNuxtModule, installModule, resolvePath } from 'nuxt/kit'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';

import type { Disposable } from 'graphql-ws'

let dispose: Disposable['dispose']

const loadSchemaFromFile = (schemaPointers: string, cwd: string) => loadSchema(schemaPointers, {
  cwd,
  loaders: [new GraphQLFileLoader()]
})

export default defineNuxtModule({
  meta: {
    name: 'graphql-ws'
  },
  hooks: {
    close() {
      dispose()
    }
  },
  async setup(_, nuxt) {
    installModule('nuxt-graphql-server')

    const resolversFilePath = await resolvePath(
      '@/server/graphql/resolvers', { alias: nuxt.options.alias })
    const resolvers = await import(resolversFilePath)
    const typeDefs = await loadSchemaFromFile(
      './server/**/*.graphql', nuxt.options.rootDir)
    const schema = makeExecutableSchema({ typeDefs, resolvers })

    nuxt.hook('listen', () => {
      const wsServer = new WebSocketServer({
        port: 3002,
        path: '/graphql'
      })
      dispose = useServer({ schema }, wsServer).dispose
    })
  }
})
