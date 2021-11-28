import * as React from 'react'
import styled from 'styled-components'
import Nav from './Nav'

const Wrapper = styled.header`
  padding: 16px;
  position: sticky;
  top: 0;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flexbox;
  background-color: ${(props) => props.theme.color.background};
  align-items: center;
`

export const Header = () => {
  return (
    <Wrapper>
      <Nav />
    </Wrapper>
  )
}
