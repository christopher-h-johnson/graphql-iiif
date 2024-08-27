import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

export const AnnotationItem = (props) => {
  const { id, type, motivation, target, body } = props
  const annolink = '<a href=' + id + '>' + id + '</a>'
  const targetlink = '<a href=' + target + '>' + target + '</a>'
  const bodylink = '<a href=' + body.id + '>' + body.id + '</a>'
  return (
        <div className="Hj59Ib">
            <ul id='annotation'>
                <li className='list-group-item'>
                    <div className='metadata-label'>ID:</div>
                    <div className='list-value' dangerouslySetInnerHTML={{ __html: annolink }}/>
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
                                <div className='list-value'
                                     dangerouslySetInnerHTML={{ __html: body.service && body.service.id }}/>
                            </li>
                            <li className='list-group-item'>
                                <div className='metadata-label'>Service Type:</div>
                                <div className='list-value'
                                     dangerouslySetInnerHTML={{ __html: body.service && body.service.type }}/>
                            </li>
                            <li className='list-group-item'>
                                <div className='metadata-label'>Service Profile:</div>
                                <div className='list-value'
                                     dangerouslySetInnerHTML={{ __html: body.service && body.service.profile }}/>
                            </li>
                        </ul>
                    </ul>
                </li>
            </ul>
        </div>)
}

const GET_ANNOTATION = gql`
    query Annotation($manifestId: String!, $canvasId: String!, $annotationPageId: String!, $annotationId: String!) {
        annotation(manifestId: $manifestId, canvasId: $canvasId, annotationPageId: $annotationPageId, annotationId: $annotationId),
        {id, type, motivation, target, body {id, type, format, width, height, service {id, type, profile}}}
    }`

export const Annotation: React.FC<any> = (props): ReactElement => {
  const { manifestId, canvasId, annotationPageId, annotationId } = props
  const { data } = !manifestId && useQuery(GET_ANNOTATION, {
    variables: { manifestId, canvasId, annotationPageId, annotationId }
  })

  return data
    ? (
            <div>
                <strong>Annotation</strong>
                {data.annotation
                  ? <AnnotationItem
                        manifestId={manifestId}
                        id={data.annotation.id}
                        type={data.annotation.type}
                        motivation={data.annotation.motivation}
                        target={data.annotation.target}
                        body={data.annotation.body}
                        key={uuidv4()}/>
                  : null}
            </div>
      )
    : null
}
