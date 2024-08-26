import React from 'react'
import {Link} from 'react-router-dom'
import {gql, Query} from '@apollo/client'

const uuidv4 = require('uuid/v4')

export const AnnotationPageItem = (props) => {
  const {id, type, manifestId, canvasId} = props
  return (<div className="Hj59Ib">
    <ul id='annotationPage'>
      <li className='list-group-item'>
        <div className='metadata-label'>ID:</div>
        <Link className='list-value'
          to={`/annotationPage?manifestId=${manifestId}&canvasId=${canvasId}&annotationPageId=${id}`}>{id}</Link>
        <div className='metadata-label'>Type:</div>
        <div className='list-value' dangerouslySetInnerHTML={{__html: type}}/>
      </li>
    </ul>
  </div>)
}

export class AnnotationPages extends React.Component {
  static query () {
    return gql`
          query AnnotationPages($manifestId: String!, $canvasId: String!) {
              canvas(manifestId: $manifestId, canvasId: $canvasId),
            {items {id, type}}
          }`
  }

  render () {
    const {manifestId, canvasId} = this.props
    if (manifestId && canvasId) {
      return (
        <Query
          query={AnnotationPages.query()}
          variables={{manifestId, canvasId}}
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
              <strong>Annotation Pages</strong>
              {data.canvas ? data.canvas.items.map(
                (c) =>
                  <AnnotationPageItem
                    manifestId={manifestId}
                    canvasId={canvasId}
                    id={c.id}
                    type={c.type}
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

export default AnnotationPages
