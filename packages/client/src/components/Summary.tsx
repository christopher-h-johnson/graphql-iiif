import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_SUMMARY = gql`
    query Summary($manifestId: String!) {
        manifest(id: $manifestId)
        {summary}
    }`

export const Summary: React.FC<any> = (props): ReactElement => {
  const { manifestId } = props
  const { data } = manifestId && useQuery(GET_SUMMARY, {
    variables: { manifestId }
  })
  return data
    ? (<div className="Hj59Ib">
      <strong>Summary</strong>
      <ul id='summary'>
        <li className='list-group-item'>
          {data.manifest ? data.manifest.summary : null}
        </li>
      </ul>
    </div>)
    : null
}
