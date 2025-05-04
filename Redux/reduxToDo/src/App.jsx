import React from 'react'
import AddTodos from './components/AddTodos'
import Todos from './components/Todos'
import './App.css'

const App = () => {
  return (
    <div>
      <h1>Redux</h1>
      <AddTodos/>
      <Todos/>
    </div>
  )
}

export default App
