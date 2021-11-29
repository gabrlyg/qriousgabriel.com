import * as React from 'react'
import styled from 'styled-components'
import { DarkModeToggleButton } from './DarkModeToggleButton'
import Nav from './Nav'

const Wrapper = styled.header`
  padding: var(--spacing-8);
  width: var(--maxWidth-full);
  display: flexbox;
  background-color: var(--color-background);
  align-items: center;
  justify-content: space-between;
  max-width: 42rem;
  transition: all 250ms;
`

export const Header = () => {
  return (
    <Wrapper>
      <Nav />
      <DarkModeToggleButton />
    </Wrapper>
  )
}
