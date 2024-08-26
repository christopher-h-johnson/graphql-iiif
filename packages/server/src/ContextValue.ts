import { ManifestAPIv2 } from './ManifestAPIv2'
import { ManifestAPIv3 } from './ManifestAPIv3'
import { IncomingMessage } from 'http'
import { ApolloServer } from '@apollo/server'

export class ContextValue {
  public version: string
  public dataSources: {
        manifestAPIv2: ManifestAPIv2
        manifestAPIv3: ManifestAPIv3
    }

  constructor ({ req, server }: { req: IncomingMessage; server: ApolloServer<ContextValue> }) {
    const { cache } = server
    this.version = 'application/json;profile=http://iiif.io/api/presentation/3/context.json'
    this.dataSources = {
      manifestAPIv2: new ManifestAPIv2({ version: this.version, cache }),
      manifestAPIv3: new ManifestAPIv3({ version: this.version, cache })
    }
  }
}
