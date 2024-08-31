import { ManifestAPIv2 } from './ManifestAPIv2.js'
import { ManifestAPIv3 } from './ManifestAPIv3.js'
import { IncomingMessage } from 'http'
import { ApolloServer } from '@apollo/server'
import { resolvers } from './resolvers.js'
import { typeDefs } from './v3Schema.js'

export class ContextValue {
  public version: string
  public dataSources: {
        manifestAPIv2: ManifestAPIv2
        manifestAPIv3: ManifestAPIv3
    }

  constructor ({ req, server }: { req: IncomingMessage; server: ApolloServer<ContextValue> }) {
    const { cache } = server
    this.dataSources = {
      manifestAPIv2: new ManifestAPIv2({ version: this.version, cache }),
      manifestAPIv3: new ManifestAPIv3({ version: this.version, cache })
    }
  }
}

export const server = new ApolloServer<ContextValue>({
  resolvers,
  typeDefs
})
