import React from 'react'
import { useStore, purgeStore, useAuth } from 'tembolok'

const App = () => {
  const [fcm] = useStore('fcm')
  const [notif] = useStore('notif')
  const [data, setData] = useStore('data', {
    persistent: false
  })
  const auth = useAuth({  })


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
        {JSON.stringify(auth)}
      </div>
      <h1>FCM</h1>
      <p>{auth?.user?.token?.messaging  }</p>
      <div>
        {JSON.stringify(fcm)}
      </div>
      <h1>Notif</h1>
      <div>
        {JSON.stringify(notif)}
      </div>
    </div>
  )
}

export default App
