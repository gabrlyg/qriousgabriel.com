import * as React from 'react'
import styled from 'styled-components'

const NavWrapper = styled.nav`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const NavMenu = styled.div`
  padding-top: 64px;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: transparent;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 1;
  visibility: hidden;
  display: flexbox;
  backdrop-filter: blur(0px);
  transition: backdrop-filter 400ms, visibility 400ms;

  &.show {
    backdrop-filter: blur(10px);
    visibility: visible;
  }
`

const NavMenuList = styled.ul`
  list-style: none;
  flex-direction: column;
  width: 100%;
  z-index: 2;
  opacity: 0;
  transition: opacity 400ms;

  .show & {
    opacity: 100;
  }
`

const NavItem = styled.li`
  font-family: ${(props) => props.theme.typography.fontFamily.sans};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  line-height: ${(props) => props.theme.typography.lineHeight.relaxed};
  display: inline-flexbox;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: 0;
  visibility: inherit;
`

const NavButton = styled.button`
  background-color: ${(props) => props.theme.color.background};
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid #cccccc;
  justify-self: flex-end;
  z-index: 10;
  outline: 2px dotted transparent;
  transition: outline 400ms, background-color 400ms;

  :focus,
  :hover {
    background-color: #f2f2f2;
  }
  :focus-visible {
    outline: 2px dotted;
  }
`

const Nav = () => {
  const menuRef = React.useRef<HTMLDivElement>(null)
  const toggleNavMenu = () => {
    if (menuRef.current?.classList.contains('show')) {
      menuRef.current?.classList.remove('show')
    } else {
      menuRef.current?.classList.add('show')
    }
  }

  return (
    <NavWrapper>
      <NavButton onClick={toggleNavMenu}>💩</NavButton>
      <NavMenu ref={menuRef}>
        {/* <NavMenuBackdrop /> */}
        <NavMenuList>
          {/* <NavButton onClick={toggleNavMenu}>👾</NavButton> */}
          <NavItem>HOME</NavItem>
          <NavItem>ABOUT</NavItem>
        </NavMenuList>
      </NavMenu>
    </NavWrapper>
  )
}

export default Nav
