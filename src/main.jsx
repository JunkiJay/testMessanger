import React from 'react'
import ReactDOM from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl='https://app.ufoton.xyz/tonconnect-manifest.json'>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>,
)
