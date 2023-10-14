<script setup>
import { createClient } from 'graphql-ws'
import { WebSocket } from 'ws'

const greetings = ref([])

const client = createClient({
  url: 'ws://localhost:3000/graphql',
  webSocketImpl: WebSocket,
})

const subscription = client.iterate({
  query: 'subscription { greeting }',
})

onMounted(async () => {
  for await (const result of subscription) {
    greetings.value.push(result.data?.greeting)
    console.log(greetings.value)
  }
})

onUnmounted(() => {
  subscription.return?.()
})
</script>

<template>
  <UContainer
    as="main"
    class="p-8"
    :ui="{
      constrained: 'max-w-[100dvw] h-full',
    }"
  >
    <GraphiQL />
  </UContainer>
</template>
