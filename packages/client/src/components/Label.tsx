import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

const defaultLang = 'en'

const GET_LABEL = gql`
    query Label($manifestId: String!) {
        manifest(id: $manifestId)
        {label {${defaultLang}}}
    }`
export const Label: React.FC<any> = (props): ReactElement => {
  const { manifestId } = props
  const { data } = manifestId && useQuery(GET_LABEL, {
    variables: { manifestId }
  })
  return data
    ? (<div className="Hj59Ib">
              <strong>Label</strong>
              <ul id='label'>
                <li className='list-group-item'>
                  {data.manifest ? data.manifest.label[defaultLang][0] : null}
                </li>
              </ul>
            </div>)
    : null
}

