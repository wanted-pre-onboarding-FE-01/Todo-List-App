import styles from './TodoList.module.scss'
import Todos from './Todos'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getAllData, updateAllData, getUserByUserId } from '../../utils/data/localStorage'

function TodoList() {
  // 현재 로그인한 사용자 정보
  const location = useLocation()
  const { state } = location
  // const { userId, isNewUser } = state

  const DATA = getAllData()
  const currentLoginedUser = DATA.filter((data) => data.isLogined)[0]
  const currentLoginedUserData = currentLoginedUser.data
  const { category, todoList } = currentLoginedUserData

  const [todoListState, setTodoListState] = useState(todoList)
  // const USER_ID = getUserByUserId(TODO_LIST)

  useEffect(() => {
    // localStorage에 저장
    DATA.forEach((data) => {
      // console.log(data.id, data.data.todoList)
      // if (data.id === userId) {
      if (data.id === '1234sol') {
        data.data.todoList = todoListState
      }
    })
    updateAllData(DATA)
  }, [todoListState])

  const handleAddClick = () => {
    // console.log('handleAddClick')
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <h1>Hi! this is your assignment.</h1>
        <Todos todoListState={todoListState} setTodoListState={setTodoListState} category={category} />
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
