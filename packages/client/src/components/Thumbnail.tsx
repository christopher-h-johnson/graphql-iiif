import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

export const ThumbnailItem = (props) => {
  const { id, type, service } = props
  const link = '<a href=' + id + '>' + id + '</a>'
  return (
    <li className='list-group-item'>
      <div className='metadata-label'>ID:</div>
      <div className='list-value' dangerouslySetInnerHTML={{ __html: link }}/>
      <img alt='logo' src={id}/>
      <div className='metadata-label'>Type:</div>
      <div className='list-value' dangerouslySetInnerHTML={{ __html: type }}/>
      <div className='metadata-label'>Service:</div>
      <ul>
        <li>
          <div className='metadata-label'>ID:</div>
          <div className='list-value' dangerouslySetInnerHTML={{ __html: service.id }}/>
        </li>
        <li>
          <div className='metadata-label'>Type:</div>
          <div className='list-value' dangerouslySetInnerHTML={{ __html: service.type }}/>
        </li>
        <li>
          <div className='metadata-label'>Profile:</div>
          <div className='list-value' dangerouslySetInnerHTML={{ __html: service.profile }}/>
        </li>
      </ul>
    </li>)
}

const GET_THUMBNAIL = gql`
    query Thumbnail($manifestId: String!) {
        manifest(id: $manifestId)
        {thumbnail{id, type, service {id, profile}}}
    }`

export const Thumbnail: React.FC<any> = (props): ReactElement => {
  const { manifestId } = props

  const { data } = manifestId && useQuery(GET_THUMBNAIL, {
    variables: { manifestId }
  })

  return data
    ? (<div className="Hj59Ib">
          <strong>Thumbnail</strong>
          <ul id='thumbnail'>
            {data.manifest
              ? data.manifest.thumbnail.map(
                (t) =>
                <ThumbnailItem
                  key={uuidv4()}
                  id={t.id}
                  type={t.type}
                  service={t.service}
                />)
              : null}
          </ul>
        </div>)
    : null
}
