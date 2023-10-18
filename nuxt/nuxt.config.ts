// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-graphql-server"],
  devServer: {
    port: 3001
  },
  app: {
    head: {
      title: 'GraphiQL',
      script: [
        {
          crossorigin: '',
          async: 'true',
          src: 'https://unpkg.com/react@18.2.0/umd/react.development.js',
        },
        {
          crossorigin: '',
          async: 'true',
          src: 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js',
        },
        {
          type: 'application/javascript',
          async: 'true',
          src: 'https://unpkg.com/graphiql@3.0.6/graphiql.min.js',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/graphiql@3.0.6/graphiql.min.css',
        },
      ],
    }
  }
})