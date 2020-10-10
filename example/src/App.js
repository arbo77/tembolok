import React from 'react'
import { useStore } from 'tembolok'

const App = () => {
  const [data, setData] = useStore('data')

  const increment = () => {
    setData({
      counter: (data?.counter || 0) + 1,
    })
  }

  return (
    <div>
      <h1>{data.counter || 0}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default App
