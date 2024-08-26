export const resolvers = {
  Query: {
    annotation (parent, args, contextValue, info) {
      return contextValue.dataSources.manifestAPIv3.getManifest(args.manifestId).then((res: any) => {
        return res.items.filter((item: any) => item.id === args.canvasId)[0]
      }).then((res: any) => {
        return res.items.filter((item: any) => item.id === args.annotationPageId)[0]
      }).then((res: any) => {
        return res.items.filter((item: any) => item.id === args.annotationId)[0]
      })
    },
    annotationPage (parent, args, contextValue, info) {
      return contextValue.dataSources.manifestAPIv3.getManifest(args.manifestId).then((res: any) => {
        return res.items.filter((item: any) => item.id === args.canvasId)[0]
      }).then((res: any) => {
        return res.items.filter((item: any) => item.id === args.annotationPageId)[0]
      })
    },
    canvas (parent, args, contextValue, info) {
      return contextValue.dataSources.manifestAPIv3.getManifest(args.manifestId).then((res: any) => {
        return res.items.filter((item: any) => item.id === args.canvasId)[0]
      })
    },
    imageServices (parent, args, contextValue, info) {
      return contextValue.dataSources.manifestAPIv3.getManifest(args.manifestId).then((res: any) => {
        return res.items && res.items.reduce((accumulator: any, currentValue: any) => {
          return [...accumulator, ...currentValue.items]
        }, []).reduce((accumulator: any, currentValue: any) => {
          return [...accumulator, ...currentValue.items]
        }, []).map((a: any) => a.body.service).filter((s: any) => s.type === args.type)
      })
    },
    manifest (parent, args, contextValue, info) {
      return contextValue.dataSources.manifestAPIv3.getManifest(args.id)
    },
    manifestv2 (parent, args, contextValue, info) {
      return contextValue.dataSources.manifestAPIv2.getManifest(args.id)
    },
    imageServicesv2 (parent, args, contextValue, info) {
      return contextValue.dataSources.manifestAPIv2.getManifest(args.manifestId).then((res: any) => {
        return res.sequences && res.sequences.reduce((accumulator: any, currentValue: any) => {
          return [...accumulator, ...currentValue.canvases]
        }, []).reduce((accumulator: any, currentValue: any) => {
          return [...accumulator, ...currentValue.images]
        }, []).map((a: any) => a.resource.service).filter((s: any) => s.profile === args.profile)
      })
    },
    imageServicesv2NoProfile (parent, args, contextValue, info) {
      return contextValue.dataSources.manifestAPIv2.getManifest(args.manifestId).then((res: any) => {
        return res.sequences && res.sequences.reduce((accumulator: any, currentValue: any) => {
          return [...accumulator, ...currentValue.canvases]
        }, []).reduce((accumulator: any, currentValue: any) => {
          return [...accumulator, ...currentValue.images]
        }, []).map((a: any) => a.resource.service)
      })
    }
  }
}
