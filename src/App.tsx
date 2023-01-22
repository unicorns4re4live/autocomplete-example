import React from 'react'
import './App.scss'
import Autocomplete from './components/autocomplete/autocomplete'

function App (): JSX.Element {
  return (
        <main className="App">
            <h1>Hi, that's my autocomplete</h1>
            <h2>Local Data autocomplete</h2>
            <Autocomplete/>
            <h2>From Api</h2>
            <Autocomplete placeholder={ 'Samsung' } apiData={ {
              url: 'https://dummyjson.com/products/search?q=',
              valueKeysNesting: ['products', 'title']
            } }/>
        </main>
  )
}

export default App
