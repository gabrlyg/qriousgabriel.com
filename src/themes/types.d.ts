import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    spacing: number
    typography: {
      fontFamily: {
        sans: string
        serif: string
      }
      fontWeight: {
        normal: number
        medium: number
        semibold: number
        bold: number
        extraBold: number
        black: number
      }
      fontSize: {
        body: string
      }
      lineHeight: {
        none: number
        tight: number
        normal: number
        relaxed: number
      }
    }
    color: {
      primary: string
      text: string
      textLight: string
      heading: string
      headingBlack: string
      accent: string
      background: string
    }
  }
}
