import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

export const CanvasItem = (props) => {
  const { id, type, label, width, height, manifestId } = props
  return (<div className="Hj59Ib">
    <ul id='canvases'>
      <li className='list-group-item'>
        <div className='metadata-label'>ID:</div>
        <Link to={`/canvas?manifestId=${manifestId}&canvasId=${id}`}>{id}</Link>
        <div className='metadata-label'>Type:</div>
        <div className='list-value' dangerouslySetInnerHTML={{ __html: type }}/>
        <div className='metadata-label'>Label:</div>
        <div className='list-value' dangerouslySetInnerHTML={{ __html: label }}/>
        <div className='metadata-label'>Width:</div>
        <div className='list-value' dangerouslySetInnerHTML={{ __html: width }}/>
        <div className='metadata-label'>Height:</div>
        <div className='list-value' dangerouslySetInnerHTML={{ __html: height }}/>
      </li>
    </ul>
  </div>)
}

const GET_CANVASES = gql`
  query Canvases($manifestId: String!) {
    manifest(id: $manifestId)
    {items {id, type, label, width, height}}
  }`

export const Canvases: React.FC<any> = (props): ReactElement => {
  const { manifestId } = props
  const { data } = manifestId && useQuery(GET_CANVASES, {
    variables: { manifestId }
  })

  return data
    ? (<div>
        <strong>Canvases</strong>
        {data.manifest
          ? data.manifest.items.map(
            (c) =>
                    <CanvasItem
                        manifestId={manifestId}
                        id={c.id} type={c.type}
                        label={c.label}
                        width={c.width}
                        height={c.height}
                        key={uuidv4()}
                    />)
          : null}
      </div>)
    : null
}
