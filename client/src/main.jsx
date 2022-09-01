import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { theme } from '@chakra-ui/pro-theme'
import '@fontsource/inter/variable.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const myTheme = extendTheme(
  {
    colors: { ...theme.colors, brand: theme.colors.blue },
  },
  theme,
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={myTheme}>
     <App />
    </ChakraProvider>
  </React.StrictMode>
)
