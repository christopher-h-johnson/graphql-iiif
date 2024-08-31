import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

export const LogoItem = (props) => {
  const { id, type, service } = props
  const link = '<a href=' + id + '>' + id + '</a>'
  return (<li className='list-group-item'>
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
const GET_LOGO = gql`
  query Logo($manifestId: String!) {
    manifest(id: $manifestId)
    {logo{id, type, service {id, type, profile}}}
  }`

export const Logo: React.FC<any> = (props): ReactElement => {
  const { manifestId } = props
  const { data } = manifestId && useQuery(GET_LOGO, {
    variables: { manifestId }
  })

  return data
    ? (<div className="Hj59Ib">
            <strong>Logo</strong>
            <ul id='logo'>
              {data.manifest
                ? data.manifest.logo.map(
                  (logo) =>
                  <LogoItem
                    key={uuidv4()}
                    id={logo.id}
                    type={logo.type}
                    service={logo.service}
                  />)
                : null}
            </ul>
          </div>)
    : null
}
