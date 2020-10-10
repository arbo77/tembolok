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

![useStore](./sample.png "Title")

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

## License

MIT © [arbo77](https://github.com/arbo77)
