import * as React from 'react'
import styled from 'styled-components'
import { ToggleNavButton } from './ToggleNavButton'

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
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
    backdrop-filter: blur(20px);
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
  font-family: var(--fontFamily-sans);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-relaxed);
  display: inline-flexbox;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: 0;
  visibility: inherit;
`

const Nav = () => {
  const menuRef = React.useRef<HTMLDivElement>(null)
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null)
  const toggleNavMenu = () => {
    if (menuRef.current?.classList.contains('show')) {
      menuRef.current?.classList.remove('show')
    } else {
      menuRef.current?.classList.add('show')
    }
    if (toggleButtonRef.current?.classList.contains('active')) {
      toggleButtonRef.current?.classList.remove('active')
    } else {
      toggleButtonRef.current?.classList.add('active')
    }
  }

  return (
    <NavWrapper>
      <ToggleNavButton onClick={toggleNavMenu} ref={toggleButtonRef} />
      <NavMenu ref={menuRef}>
        <NavMenuList>
          <NavItem>HOME</NavItem>
          <NavItem>ABOUT</NavItem>
        </NavMenuList>
      </NavMenu>
    </NavWrapper>
  )
}

export default Nav
