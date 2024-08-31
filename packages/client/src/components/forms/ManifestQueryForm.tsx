import * as React from 'react'
import { Label } from '../Label'
import { Summary } from '../Summary'
import { Metadata } from '../Metadata'
import { Homepage } from '../Homepage'
import { Logo } from '../Logo'
import { Thumbnail } from '../Thumbnail'
import { Canvases } from '../Canvases'
import { ImageServices } from '../ImageServices'
import Checkbox from 'rc-checkbox'
import SplitterLayout from 'react-splitter-layout'
import { withRouter } from 'react-router-dom'

const qs = require('query-string')

class ManifestQueryFormComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      label: false,
      summary: false,
      metadata: false,
      homepage: false,
      logo: false,
      thumbnail: false,
      canvases: false,
      imageServices: false,
      manifestId: '(enter Manifest URI)',
      renderQueryInfo: false,
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  resolveParams () {
    // @ts-ignore
    const params = qs.parse(this.props.location.search)
    if (Object.keys(params).length) {
      if (params.manifestId) {
        const manifest = params.manifestId
        this.setState({ manifestId: manifest })
      }
    }
  }

  handleChange (event) {
    this.setState({ manifestId: event.target.value })
  }

  handleFocus (event) {
    this.setState({ manifestId: '' })
  }

  renderLabel () {
    // @ts-ignore
    const { renderQueryInfo, label, manifestId } = this.state
    if (renderQueryInfo) {
      if (label) {
        return <Label manifestId={manifestId}/>
      }
    }
  }

  renderSummary () {
    // @ts-ignore
    const { renderQueryInfo, manifestId, summary } = this.state
    if (renderQueryInfo) {
      if (summary) {
        return <Summary manifestId={manifestId}/>
      }
    }
  }

  renderMetadata () {
    // @ts-ignore
    const { renderQueryInfo, manifestId, metadata } = this.state
    if (renderQueryInfo) {
      if (metadata) {
        return <Metadata manifestId={manifestId}/>
      }
    }
  }

  renderHomepage () {
    // @ts-ignore
    const { renderQueryInfo, homepage, manifestId } = this.state
    if (renderQueryInfo) {
      if (homepage) {
        return <Homepage manifestId={manifestId}/>
      }
    }
  }

  renderLogo () {
    // @ts-ignore
    const { renderQueryInfo, logo, manifestId } = this.state
    if (renderQueryInfo) {
      if (logo) {
        return <Logo manifestId={manifestId}/>
      }
    }
  }

  renderThumbnail () {
    // @ts-ignore
    const { renderQueryInfo, thumbnail, manifestId } = this.state
    if (renderQueryInfo) {
      if (thumbnail) {
        return <Thumbnail manifestId={manifestId}/>
      }
    }
  }

  renderCanvases () {
    // @ts-ignore
    const { renderQueryInfo, canvases, manifestId } = this.state
    if (renderQueryInfo) {
      if (canvases) {
        return <Canvases manifestId={manifestId}/>
      }
    }
  }

  renderImageServices () {
    // @ts-ignore
    const { renderQueryInfo, imageServices, manifestId } = this.state
    if (renderQueryInfo) {
      if (imageServices) {
        return <ImageServices manifestId={manifestId} type='ImageService2'/>
      }
    }
  }

  toggleLabel = () => {
    this.setState((state) => ({
      // @ts-ignore
      label: !state.label
    }))
  }

  toggleSummary = () => {
    this.setState((state) => ({
      // @ts-ignore
      summary: !state.summary
    }))
  }

  toggleMetadata = () => {
    this.setState((state) => ({
      // @ts-ignore
      metadata: !state.metadata
    }))
  }

  toggleHomepage = () => {
    this.setState((state) => ({
      // @ts-ignore
      homepage: !state.homepage
    }))
  }

  toggleLogo = () => {
    this.setState((state) => ({
      // @ts-ignore
      logo: !state.logo
    }))
  }

  toggleThumbnail = () => {
    this.setState((state) => ({
      // @ts-ignore
      thumbnail: !state.thumbnail
    }))
  }

  toggleCanvases = () => {
    this.setState((state) => ({
      // @ts-ignore
      canvases: !state.canvases
    }))
  }

  toggleImageServices = () => {
    this.setState((state) => ({
      // @ts-ignore
      imageServices: !state.imageServices
    }))
  }

  componentDidMount () {
    this.resolveParams()
  }

  componentDidUpdate (prevProps, prevState) {
    // @ts-ignore
    const { manifestId, label, summary, metadata, homepage, logo, thumbnail, canvases, imageServices } = this.state
    if (manifestId !== prevState.manifestId) {
      this.resolveParams()
    }
    if (summary !== prevState.summary || label !== prevState.label || metadata !== prevState.metadata || homepage !== prevState.homepage || logo !== prevState.logo || thumbnail !== prevState.thumbnail || canvases !== prevState.canvases || imageServices !== prevState.imageServices) {
      if (summary || label || metadata || homepage || logo || thumbnail || canvases || imageServices) {
        this.setState({ renderQueryInfo: true })
      } else {
        this.setState({ renderQueryInfo: false })
      }
    }
  }

  render () {
    // @ts-ignore
    const { manifestId } = this.state
    return (
      <div>
        <div className='Hj59Ib'>Manifest URI</div>
        <textarea
          id="manifestURI"
          cols={100} rows={3}
          name={manifestId}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          value={manifestId}/>
        <SplitterLayout primaryIndex={0} percentage secondaryInitialSize={80}>
          <div>
            <div className='Hj59Ib'>Label</div>
            <Checkbox id='label' aria-label='label' onChange={this.toggleLabel}/>
            <div className='Hj59Ib'>Summary</div>
            <Checkbox id='summary' aria-label='summary' onChange={this.toggleSummary}/>
            <div className='Hj59Ib'>Metadata</div>
            <Checkbox id='metadata' aria-label='summary' onChange={this.toggleMetadata}/>
            <div className='Hj59Ib'>Homepage</div>
            <Checkbox id='homepage' aria-label='summary' onChange={this.toggleHomepage}/>
            <div className='Hj59Ib'>Logo</div>
            <Checkbox id='logo' aria-label='summary' onChange={this.toggleLogo}/>
            <div className='Hj59Ib'>Thumbnail</div>
            <Checkbox id='thumbnail' aria-label='summary' onChange={this.toggleThumbnail}/>
            <div className='Hj59Ib'>Canvases</div>
            <Checkbox id='canvases' aria-label='summary' onChange={this.toggleCanvases}/>
            <div className='Hj59Ib'>Image Services</div>
            <Checkbox id='imageServices' aria-label='summary' onChange={this.toggleImageServices}/>
          </div>
          <div>
            {this.renderLabel()}
            {this.renderSummary()}
            {this.renderMetadata()}
            {this.renderHomepage()}
            {this.renderLogo()}
            {this.renderThumbnail()}
            {this.renderCanvases()}
            {this.renderImageServices()}
          </div>
        </SplitterLayout>
      </div>)
  }
}

export const ManifestQueryForm = withRouter(ManifestQueryFormComponent)
