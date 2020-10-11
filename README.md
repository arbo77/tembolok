# Tembolok

Persistent state management for React 

[![NPM](https://img.shields.io/npm/v/tembolok.svg)](https://www.npmjs.com/package/tembolok) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add tembolok
```

or, if you using npm

```bash
npm install --save tembolok
```

## useStore in action

![useStore](./sample.gif "Title")

## Sample code

```jsx
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

```

## Remove store from localStorage

In case you want to clear some state, just use ```clear()``` function within the state object. 

```jsx
import React from 'react'
import { useStore } from 'tembolok'

const App = () => {
  const [data, setData] = useStore('data')

  const increment = () => {
    setData({
      counter: (data?.counter || 0) + 1,
    })
  }
  
  const clear = () => {
    data.clear()
  }

  return (
    <div>
      <h1>{data.counter || 0}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={clear}>Clear</button>
    </div>
  )
}

export default App

```

## Clearing all registered states

Use ```purgeStore``` hook for safe clean up the ```localStorage``` instead using ```localStorage.clear```  

```jsx
import { useStore, purgeStore } from 'tembolok'

const App = () => {
  ...
  ...
  const purge = () => {
    purgeStore()
  }
  ...
  ...
}

export default App

```

## License

MIT © [arbo77](https://github.com/arbo77)
