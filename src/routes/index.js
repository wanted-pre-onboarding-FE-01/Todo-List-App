import { Navigate, Route, Routes } from 'react-router-dom'
import Calendar from './Calendar'
import Login from './Login'
import styles from './Routes.module.scss'
import TodoList from './TodoList'
import UpdateTodo from './UpdateTodo'
import {useState} from 'react'

function App() {

  const [currentUserName, setCurrentUserName] = useState(localStorage.getItem('currentUserName'))

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Routes>
          <Route path='/login' element={<Login userNcurrentUserNameames={currentUserName} setCurrentUserName={setCurrentUserName} />} />
          <Route path='/' element={ currentUserName !== null ? <TodoList /> : <Navigate to='/login' />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/updateTodo' element={<UpdateTodo />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
