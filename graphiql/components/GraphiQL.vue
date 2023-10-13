<script setup>
import { createClient } from 'graphql-ws'
onMounted(() => {
  if (window.ReactDOM) {
    const fetcher = window.GraphiQL.createFetcher({
      url: 'http://localhost:3000/graphql',
      wsClient: createClient({
        url: 'ws://localhost:3000/graphql',
      }),
    })
    const root = window.ReactDOM.createRoot(document.getElementById('graphiql'))
    root.render(
      window.React.createElement(window.GraphiQL, {
        fetcher,
        defaultEditorToolsVisibility: true,
      })
    )
  }
})
</script>

<template>
  <div
    id="graphiql"
    class="h-full w-full"
  >
    Loading...
  </div>
</template>
