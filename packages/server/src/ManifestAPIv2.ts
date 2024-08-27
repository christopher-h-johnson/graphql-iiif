import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest'
import { KeyValueCache } from '@apollo/utils.keyvaluecache'

export class ManifestAPIv2 extends RESTDataSource {
  private version: string

  public constructor (options: { version: string; cache: KeyValueCache }) {
    super(options)
    this.version = options.version
  }

  public parseBody (response: any) {
    if (response.headers.get('Content-Type').includes('json')) {
      return response.json()
    } else {
      return response.text()
    }
  }

  public willSendRequest (path: string, request: AugmentedRequest) {
    // request.headers.Accept = this.version
  }

  public async getManifest (id: string) {
    const data = await this.get(`${id}`)
    const dataStr = JSON.stringify(data)
    const replaced = dataStr.replace(/@/gi, '')
    return JSON.parse(replaced)
  }
}
