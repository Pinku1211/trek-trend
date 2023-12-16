import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <section>
        <List />
        <Map />
      </section>

    </>
  )
}

export default App
