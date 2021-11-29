import * as React from 'react'

interface ThemeContextInterface {
  darkModeEnabled: boolean
  setDarkModeEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = React.createContext<ThemeContextInterface>({
  darkModeEnabled: false,
  setDarkModeEnabled: () => {},
})

export const ThemeProvider: React.FC = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = React.useState<boolean>(false)

  return (
    <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return React.useContext(ThemeContext)
}
