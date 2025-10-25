import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Header from './Header.tsx'
import App from './App.tsx'
import AllReports from './AllReports.tsx'
import Footer from './Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reports" element={<AllReports />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
