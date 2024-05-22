import './App.css'
import './main.global.css'
import { Header } from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFound } from './components/NotFound'
import { MainPage } from './components/MainPage'
import { Timer } from './components/Timer'
import { Statistic } from './components/Statistic'
import { useStatistic } from './store/useStatisctic'


const MainComponent = () => {
  const addStat = useStatistic(state => state.addStatistic)
  addStat()

  return (
    <MainPage>
      <Routes >
        <Route path='/' element={<Timer />} />
        <Route index element={<Timer />} />
        <Route path='stat' element={<Statistic />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </MainPage>
  )
}

function App() {
  return (
    <>
      <Header />
      <MainComponent />
    </>
  )
}

export default App
