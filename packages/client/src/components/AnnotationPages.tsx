import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

export const AnnotationPageItem = (props) => {
  const { id, type, manifestId, canvasId } = props
  return (<div className="Hj59Ib">
        <ul id='annotationPage'>
            <li className='list-group-item'>
                <div className='metadata-label'>ID:</div>
                <Link className='list-value'
                      to={`/annotationPage?manifestId=${manifestId}&canvasId=${canvasId}&annotationPageId=${id}`}>{id}</Link>
                <div className='metadata-label'>Type:</div>
                <div className='list-value' dangerouslySetInnerHTML={{ __html: type }}/>
            </li>
        </ul>
    </div>)
}

const GET_ANNOTATION_PAGES = gql`
    query AnnotationPages($manifestId: String!, $canvasId: String!) {
        canvas(manifestId: $manifestId, canvasId: $canvasId),
        {items {id, type}}
    }`

export const AnnotationPages: React.FC<any> = (props): ReactElement => {
  const { manifestId, canvasId } = props
  const { data } = manifestId && useQuery(GET_ANNOTATION_PAGES, {
    variables: { manifestId, canvasId }
  })

  return data
    ? (<div>
        <strong>Annotation Pages</strong>
        {data.canvas
          ? data.canvas.items.map(
            (c) =>
                    <AnnotationPageItem
                        manifestId={manifestId}
                        canvasId={canvasId}
                        id={c.id}
                        type={c.type}
                        key={uuidv4()}
                    />)
          : null}
        </div>)
    : null
}
