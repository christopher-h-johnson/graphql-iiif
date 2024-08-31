import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

export const ImageServiceItem = (props) => {
  const { id } = props
  const thumbnail = id + '/full/300,/0/default.jpg'
  const link = '<a href=' + id + '>' + id + '</a>'
  return (
    <div className="Hj59Ib">
      <ul id='imageServices'>
        <li className='list-group-item'>
          <div className='metadata-label'>ID:</div>
          <div className='list-value' dangerouslySetInnerHTML={{ __html: link }}/>
          <img alt='' src={thumbnail}/>
        </li>
      </ul>
    </div>)
}

const GET_IMAGE_SERVICES = gql`
  query ImageServices($manifestId: String!, $type: String!) {
    imageServices(manifestId: $manifestId,
      type: $type)
    {id}
  }`
export const ImageServices: React.FC<any> = (props): ReactElement => {
  const { manifestId } = props
  const { data } = manifestId && useQuery(GET_IMAGE_SERVICES, {
    variables: { manifestId }
  })
  return data
    ? (<div>
          <strong>Image Services</strong>
          {data.imageServices
            ? data.imageServices.map(
              (s) =>
              <ImageServiceItem
                manifestId={manifestId}
                id={s.id}
                key={uuidv4()}
              />)
            : null}
        </div>)
    : null
}
