import './App.css'
import './main.global.css'
import { Header } from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'

import { NotFound } from './components/NotFound'
import { MainPage } from './components/MainPage'

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route index element={<MainPage />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  )
}

export default App
