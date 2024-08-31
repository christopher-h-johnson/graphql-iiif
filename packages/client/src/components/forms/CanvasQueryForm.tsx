import * as React from 'react'
import { AnnotationPages } from '../AnnotationPages'
import Checkbox from 'rc-checkbox'
import { withRouter } from 'react-router-dom'
import SplitterLayout from 'react-splitter-layout'

const qs = require('query-string')

class CanvasQueryFormComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      annoPages: true,
      manifestId: '(enter Manifest URI)',
      canvasId: '(enter Canvas URI)',
      renderQueryInfo: true,
      submitted: false
    }
    this.handleManifestChange = this.handleManifestChange.bind(this)
    this.handleCanvasChange = this.handleCanvasChange.bind(this)
  }

  handleManifestChange (event) {
    this.setState({ manifestId: event.target.value })
  }

  handleCanvasChange (event) {
    this.setState({ canvasId: event.target.value })
  }

  resolveParams () {
    // @ts-ignore
    const params = qs.parse(this.props.location.search)
    if (Object.keys(params).length) {
      if (params.manifestId && params.canvasId) {
        const manifest = params.manifestId
        const canvas = params.canvasId
        this.setState({ canvasId: canvas, manifestId: manifest })
      }
    }
  }

  renderAnnoPages () {
    // @ts-ignore
    const { renderQueryInfo, annoPages, canvasId, manifestId } = this.state
    if (renderQueryInfo) {
      if (annoPages) {
        return <AnnotationPages manifestId={manifestId} canvasId={canvasId}/>
      }
    }
  }

  toggleAnnoPages = () => {
    this.setState((state) => ({
      // @ts-ignore
      annoPages: !state.annoPages
    }))
  }

  componentDidMount () {
    this.resolveParams()
  }

  componentDidUpdate (prevProps, prevState) {
    // @ts-ignore
    const { annoPages, canvasId, manifestId } = this.state
    if (canvasId !== prevState.canvasId) {
      this.resolveParams()
    }
    if (manifestId !== prevState.manifestId) {
      this.resolveParams()
    }
    if (annoPages !== prevState.annoPages) {
      if (annoPages) {
        this.setState({ renderQueryInfo: true })
      } else {
        this.setState({ renderQueryInfo: false })
      }
    }
  }

  render () {
    // @ts-ignore
    const { canvasId, manifestId } = this.state
    if (canvasId && manifestId) {
      return (<div>
        <div className='Hj59Ib'>Manifest URI</div>
        <textarea cols={100} rows={3} value={manifestId} name={manifestId} onChange={this.handleManifestChange}/>
        <div className='Hj59Ib'>Canvas URI</div>
        <textarea cols={100} rows={3} value={canvasId} name={canvasId} onChange={this.handleCanvasChange}/>
        <SplitterLayout primaryIndex={0} percentage secondaryInitialSize={80}>
          <div>
            <div className='Hj59Ib'>Annotation Pages</div>
            <Checkbox defaultChecked aria-label='summary' onChange={this.toggleAnnoPages}/>
          </div>
          <div>
            {this.renderAnnoPages()}
          </div>
        </SplitterLayout>
      </div>)
    } else {
      return null
    }
  }
}

export const CanvasQueryForm = withRouter(CanvasQueryFormComponent)
