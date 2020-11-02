import React from 'react'
import { useStore, purgeStore, useAuth } from 'tembolok'

const App = () => {
  const [data, setData] = useStore('data', {
    persistent: false
  })
  const auth = useAuth({
    apiKey: "AIzaSyAXZpSaDTqgRFYP16WpRJKvlRgT3e-OQIE",
    authDomain: "app.bubo.id",
    databaseURL: "https://bubokcd6.firebaseio.com",
    projectId: "bubokcd6",
    storageBucket: "bubokcd6.appspot.com",
    messagingSenderId: "929887876776",
    appId: "1:929887876776:web:048335f8df690a059af49d",
    measurementId: "G-5CGHPVV7NZ"
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
    <div style={{ textAlign: 'center' }}>
      <h1>{data?.counter || 0}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={clear}>Clear</button>
      <button onClick={purge}>Purge</button>
      <button onClick={auth.signIn}>Signin</button>
      <h1>Auth</h1>
      <div>
        {JSON.stringify(auth.user)}
      </div>
    </div>
  )
}

export default App
