import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

const defaultLang = 'en'

export const HomepageItem = (props) => {
  const { id, type, label, format } = props
  const link = '<a href=' + id + '>' + id + '</a>'
  return (
    <li className='list-group-item'>
      <div className='metadata-label'>ID:</div>
      <div className='list-value' dangerouslySetInnerHTML={{ __html: link }}/>
      <div className='metadata-label'>Type:</div>
      <div className='list-value' dangerouslySetInnerHTML={{ __html: type }}/>
      <div className='metadata-label'>Label:</div>
      <div className='list-value' dangerouslySetInnerHTML={{ __html: label[defaultLang][0] }}/>
      <div className='metadata-label'>Format:</div>
      <div className='list-value' dangerouslySetInnerHTML={{ __html: format }}/>
    </li>)
}

const GET_HOMEPAGE = gql`
    query Homepage($manifestId: String!) {
        manifest(id: $manifestId)
        {homepage{id, type, label {${defaultLang}}, format}}
    }`

export const Homepage: React.FC<any> = (props): ReactElement => {
  const { manifestId } = props

  const { data } = manifestId && useQuery(GET_HOMEPAGE, {
    variables: { manifestId }
  })

  return data ? (
              <div className="Hj59Ib">
                <strong>Homepage</strong>
                <ul id='homepage'>
                  {data.manifest
                    ? data.manifest.homepage.map(
                      (hp) =>
                      <HomepageItem
                        key={uuidv4()}
                        id={hp.id}
                        type={hp.type}
                        label={hp.label}
                        format={hp.format}/>)
                    : null}
                </ul>
              </div>)
    : null
}
