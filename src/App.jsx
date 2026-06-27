import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Germany Move Quest</h1>
          
            

<h2>Dein Weg nach Deutschland</h2>

<p>Your personal guide to relocating
and settling into Germany.</p>

<p>[ Begin Your Journey ]</p>
          
        </div>
        
      </section>

      
      
    </>
  )
}

export default App
