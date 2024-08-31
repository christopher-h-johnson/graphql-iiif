import React, { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

const defaultLang = 'en'

const GET_METADATA = gql`
    query Metadata($manifestId: String!) {
        manifest(id: $manifestId)
        {metadata {label {${defaultLang}},value {${defaultLang}}}}
    }`

export const MetadataItem = (props) => {
  const { language, label, value } = props
  return (
    <li className='list-group-item'>
      <div className='metadata-label'>{label[language][0]}:</div>
      {value[language].map((v) => <div key={uuidv4()} className='list-value' dangerouslySetInnerHTML={{ __html: v }}/>)}
    </li>)
}

export const Metadata: React.FC<any> = (props): ReactElement => {
  const { manifestId } = props
  const { data } = manifestId && useQuery(GET_METADATA, {
    variables: { manifestId }
  })

  return data
    ? (<div className="Hj59Ib">
            <strong>Metadata</strong>
            <ul id='metadata'>
              {data.manifest
                ? data.manifest.metadata.map(
                  (metadata) =>
                  <MetadataItem
                    key={uuidv4()}
                    language={defaultLang}
                    label={metadata.label}
                    value={metadata.value}/>)
                : null}
            </ul>
          </div>)
    : null
}
