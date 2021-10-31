import * as React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import config from '../../config'

const BioAvatar = styled(Image)`
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Bio = () => {
  const author = config.author

  return (
    <div className='bio'>
      <BioAvatar
        layout={'fixed'}
        src='/images/profile-pic.png'
        width={50}
        height={50}
        quality={95}
        alt='Profile picture'
      />
      {author?.name && (
        <p>
          Personal blog by <strong>{author.name}</strong>
          <br />
          {author?.summary || null}
        </p>
      )}
    </div>
  )
}

export default Bio
