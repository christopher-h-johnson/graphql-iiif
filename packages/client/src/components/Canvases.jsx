import React from 'react'
import {Link} from 'react-router-dom'
import {gql, Query} from '@apollo/client'

const uuidv4 = require('uuid/v4')

export const CanvasItem = (props) => {
  const {id, type, label, width, height, manifestId} = props
  return (<div className="Hj59Ib">
    <ul id='canvases'>
      <li className='list-group-item'>
        <div className='metadata-label'>ID:</div>
        <Link to={`/canvas?manifestId=${manifestId}&canvasId=${id}`}>{id}</Link>
        <div className='metadata-label'>Type:</div>
        <div className='list-value' dangerouslySetInnerHTML={{__html: type}}/>
        <div className='metadata-label'>Label:</div>
        <div className='list-value' dangerouslySetInnerHTML={{__html: label}}/>
        <div className='metadata-label'>Width:</div>
        <div className='list-value' dangerouslySetInnerHTML={{__html: width}}/>
        <div className='metadata-label'>Height:</div>
        <div className='list-value' dangerouslySetInnerHTML={{__html: height}}/>
      </li>
    </ul>
  </div>)
}

export class Canvases extends React.Component {
  static query () {
    return gql`
          query Canvases($manifestId: String!) {
              manifest(id: $manifestId)
            {items {id, type, label, width, height}}
          }`
  }

  render () {
    const {manifestId} = this.props
    if (manifestId) {
      return (
        <Query
          query={Canvases.query()}
          variables={{manifestId}}
        >
          {({loading, error, data}) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>Error: {error.graphQLErrors.map(({message}, i) => (<span key={i}>{message}</span>))}
              </p>
            }
            return (<div>
              <strong>Canvases</strong>
              {data.manifest ? data.manifest.items.map(
                (c) =>
                  <CanvasItem
                    manifestId={manifestId}
                    id={c.id} type={c.type}
                    label={c.label}
                    width={c.width}
                    height={c.height}
                    key={uuidv4()}
                  />) : null}
            </div>)
          }}
        </Query>)
    } else {
      return null
    }
  }
}

export default Canvases
