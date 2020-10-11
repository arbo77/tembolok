import React from 'react'
import { useStore, purgeStore } from 'tembolok'

const App = () => {
  const [data, setData] = useStore('data', {
    persistent: false 
  })

  const increment = () => {
    setData({
      counter: (data?.counter || 0) + 1,
    }).then(result => {
      console.log(result)
    })
  }

  const clear = () => {
    data.clear()
  }

  const purge = () => {
    purgeStore()
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>{data?.counter || 0}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={clear}>Clear</button>
      <button onClick={purge}>Purge</button>
    </div>
  )
}

export default App
