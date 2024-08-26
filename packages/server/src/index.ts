import { server, ContextValue } from './server.js'
import { startStandaloneServer } from '@apollo/server/standalone'
export * from './ManifestAPIv3.js'
export * from './ManifestAPIv2.js'
export * from './resolvers.js'
export * from './v3Schema.js'

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => new ContextValue({ req, server }),
  listen: { port: 4000 }
})

console.log(`🚀  Server ready at ${url}`)
