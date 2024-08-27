import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

export const AnnotationsItem = (props) => {
  const { id, type, motivation, target, body, manifestId, canvasId, annotationPageId } = props
  const targetlink = '<a href=' + target + '>' + target + '</a>'
  const bodylink = body && body.id.contains('.jpg')
    ? '<img alt="" src=' + body.id + '/>'
    : '<a href=' + body.id + '>' + body.id + '</a>'
  return (
    <div className="Hj59Ib">
      <ul id='annotations'>
        <li className='list-group-item'>
          <div className='metadata-label'>ID:</div>
          <Link
            to={`/annotation?manifestId=${manifestId}&canvasId=${canvasId}&annotationPageId=${annotationPageId}&annotationId=${id}`}>{id}</Link>
          <div className='metadata-label'>Type:</div>
          <div className='list-value' dangerouslySetInnerHTML={{ __html: type }}/>
          <div className='metadata-label'>Motivation:</div>
          <div className='list-value' dangerouslySetInnerHTML={{ __html: motivation }}/>
          <div className='metadata-label'>Target:</div>
          <div className='list-value' dangerouslySetInnerHTML={{ __html: targetlink }}/>
          <div className='metadata-label'>Body:</div>
          <ul>
            <li className='list-group-item'>
              <div className='metadata-label'>Body Id:</div>
              <div className='list-value' dangerouslySetInnerHTML={{ __html: bodylink }}/>
            </li>
            <li className='list-group-item'>
              <div className='metadata-label'>Type:</div>
              <div className='list-value' dangerouslySetInnerHTML={{ __html: body && body.type }}/>
            </li>
            <li className='list-group-item'>
              <div className='metadata-label'>Format:</div>
              <div className='list-value' dangerouslySetInnerHTML={{ __html: body && body.format }}/>
            </li>
            <div className='metadata-label'>Service:</div>
            <ul>
              <li className='list-group-item'>
                <div className='metadata-label'>Service Id:</div>
                <div className='list-value' dangerouslySetInnerHTML={{ __html: body && body.service.id }}/>
              </li>
              <li className='list-group-item'>
                <div className='metadata-label'>Service Type:</div>
                <div className='list-value' dangerouslySetInnerHTML={{ __html: body && body.service.type }}/>
              </li>
              <li className='list-group-item'>
                <div className='metadata-label'>Service Profile:</div>
                <div className='list-value' dangerouslySetInnerHTML={{ __html: body && body.service.profile }}/>
              </li>
            </ul>
          </ul>
        </li>
      </ul>
    </div>)
}

const GET_ANNOTATIONS = gql`
  query Annotations($manifestId: String!, $canvasId: String!, $annotationPageId: String!) {
    annotationPage(manifestId: $manifestId, canvasId: $canvasId, annotationPageId: $annotationPageId),
    {items {id, type, motivation, target, body {id, type, format, width, height, service {id, type, profile}}}}
  }`

export const Annotations: React.FC<any> = (props): ReactElement => {
  const { manifestId, canvasId, annotationPageId } = props
  const { data } = manifestId && useQuery(GET_ANNOTATIONS, {
    variables: { manifestId, canvasId, annotationPageId }
  })

  return data
    ? (<div>
              <strong>Annotations</strong>
              {data.annotationPage
                ? data.annotationPage.items.map(
                  (c) =>
                  <AnnotationsItem
                    manifestId={manifestId}
                    canvasId={canvasId}
                    annotationPageId={annotationPageId}
                    id={c.id} type={c.type}
                    motivation={c.motivation}
                    target={c.target}
                    body={c.body}
                    key={uuidv4()}
                  />)
                : 'no annotations returned from endpoint'}
            </div>)
    : null
}

export default Annotations
