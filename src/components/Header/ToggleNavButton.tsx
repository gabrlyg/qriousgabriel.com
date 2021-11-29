import { ForwardedRef } from 'hoist-non-react-statics/node_modules/@types/react'
import * as React from 'react'
import styled from 'styled-components'

const ToggleNavButtonWrapper = styled.button`
  width: 48px;
  height: 48px;
  display: inline-flexbox;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: transparent;
  border: none;
  outline: 2px dotted transparent;
  border-radius: 8px;
  transition: all 400ms;

  :focus-visible {
    outline: 2px dotted var(--color-text-light);
  }
`
const ToggleNavButtonContent = styled.div`
  height: 2px;
  width: 24px;
  background-color: var(--color-text);
  display: block;
  position: relative;
  transform: rotate(0deg);
  transition: transform 400ms, bottom 400ms, width 400ms;

  &:before {
    content: '';
    background-color: var(--color-text);
    height: 2px;
    width: 24px;
    display: block;
    position: absolute;
    top: -10px;
    opacity: 1;
    transition: opacity 100ms;
  }
  &:after {
    content: '';
    background-color: var(--color-text);
    height: 2px;
    width: 24px;
    display: block;
    position: absolute;
    bottom: -10px;
  }

  .active & {
    transform: rotate(225deg);
    width: 33px;

    &:before {
      opacity: 0;
    }
    &:after {
      transform: rotate(-90deg);
      bottom: 0;
      width: 33px;
    }
  }
`

// eslint-disable-next-line react/display-name
export const ToggleNavButton = React.forwardRef(
  (
    props: { onClick: React.MouseEventHandler<HTMLButtonElement> },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <ToggleNavButtonWrapper onClick={props.onClick} ref={ref}>
        <ToggleNavButtonContent />
      </ToggleNavButtonWrapper>
    )
  }
)
