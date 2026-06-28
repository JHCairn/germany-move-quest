import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/symbol.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero-icon">
          <img src={heroImg} alt="journey" height="100" width="100" />
        </div>
        <div>
          <h1>Germany Move Quest</h1>

          <h2>Dein Weg nach Deutschland</h2>

          <p>Your personal guide to relocating
            and settling into Germany.</p>

          <button className="button-icon">
            Begin Your Journey
          </button>

        </div>

      </section>



    </>
  )
}

export default App
