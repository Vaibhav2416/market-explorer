import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calendar from './components/Calender/Calender'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Market Seasonality Explorer</h1>
      <Calendar currentMonth={'July 2025'} />
    </>
  )
}

export default App
