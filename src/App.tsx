import React from 'react'
import './App.scss'
import Autocomplete from './components/autocomplete/autocomplete'

function App (): JSX.Element {
  return (
      <main className="App">
        <h1>Hi, that's my autocomplete</h1>
        <Autocomplete />
      </main>
  )
}

export default App
