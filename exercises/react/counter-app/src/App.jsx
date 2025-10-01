import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>React Counter App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>
      <p className="read-the-docs">
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div>
  )
}

export default App

