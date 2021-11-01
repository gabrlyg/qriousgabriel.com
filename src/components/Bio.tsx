import * as React from 'react'
import Image, { ImageProps } from 'next/image'
import styled from 'styled-components'
import config from '@config'

const BioAvatarWrapper = styled.div`
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 50%;
`

const BioAvatar = ({
  layout,
  src,
  width,
  height,
  quality,
  alt,
}: ImageProps) => {
  return (
    <BioAvatarWrapper>
      <Image
        layout={layout}
        src={src}
        width={width}
        height={height}
        quality={quality}
        alt={alt}
      />
    </BioAvatarWrapper>
  )
}

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
      {
        <p>
          Personal blog by <strong>{author.name}</strong>
          <br />
          {author?.summary || null}
        </p>
      }
    </div>
  )
}

export default Bio
