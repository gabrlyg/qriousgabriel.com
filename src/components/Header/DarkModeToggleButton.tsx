import * as React from 'react'
import { useTheme } from 'src/providers/ThemeProvider'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: var(--color-background);
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
    background-color: var(--color-background-light);
  }
  :focus-visible {
    outline: 2px dotted var(--color-text-light);
  }
`

export const DarkModeToggleButton = () => {
  const { darkModeEnabled, setDarkModeEnabled } = useTheme()
  const toggleDarkMode = React.useCallback(() => {
    setDarkModeEnabled(!darkModeEnabled)
  }, [darkModeEnabled, setDarkModeEnabled])

  return (
    <StyledButton
      onClick={toggleDarkMode}
      aria-label={darkModeEnabled ? 'Turn off dark mode' : 'Turn on dark mode'}
    >
      {darkModeEnabled ? '🌛' : '🌞'}
    </StyledButton>
  )
}
