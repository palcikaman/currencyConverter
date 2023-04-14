import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReactQueryProvider from "./utils/ReactQueryProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>,
)
