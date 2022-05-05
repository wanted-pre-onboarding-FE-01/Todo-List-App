import { useState } from 'react'
import { CheckIcon, SearchIcon } from '../../assets/svgs'
import styles from './TodoList.module.scss'
import { cx } from '../../styles'

const INIT_TODO = [
  {
    id: 1,
    todo: '계란 2판 사기',
    isDone: false,
    date: new Date(),
    categoryId: 1,
  },
  {
    id: 2,
    todo: '맥북 프로 M1 Max CTO 버전 사기',
    isDone: false,
    date: new Date(),
    categoryId: 1,
  },
  {
    id: 3,
    todo: '오늘의 TIL 작성하기',
    isDone: false,
    date: new Date(),
    categoryId: 1,
  },
]

function TodoList() {
  const [todoList, setTodoList] = useState(INIT_TODO)

  const handleAddClick = () => {
    // console.log('handleAddClick')
  }

  const handleChange = (e) => {
    const { dataset, checked } = e.currentTarget
    const { id } = dataset

    setTodoList((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === Number(id))
      const newList = [...prev]
      newList[targetIndex].done = checked
      return newList
    })
  }

  const [searchOpen, setSearchOpen] = useState(false)

  const handleToggleSearchBar = () => setSearchOpen((prev) => !prev)

  const [searchValue, setSearchValue] = useState()

  const handleChangeSearchValue = (e) => {
    const {
      currentTarget: { value },
    } = e
    setSearchValue(value)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <h1>Hi! this is your assignment.</h1>
        <ul className={styles.tasks}>
          <div className={styles.header}>
            <p className={styles.tasksTitle}>Today&apos;s</p>
            <div className={cx(styles.searchContainer, searchOpen && styles.searchOpen)}>
              {searchOpen && <input placeholder='Search to do...' onChange={handleChangeSearchValue} />}
              <SearchIcon onClick={handleToggleSearchBar} />
            </div>
          </div>
          {todoList
            .filter((todo) => {
              if (!searchValue) {
                return true
              }
              return todo.todo.includes(searchValue)
            })
            .map((todo) => (
              <li key={`todo-${todo.id}`} className={styles.task}>
                <div className={styles.checkboxWrapper}>
                  <input type='checkbox' checked={todo.done} data-id={todo.id} onChange={handleChange} />
                  <CheckIcon />
                </div>
                <p className={styles.title}>{todo.todo}</p>
              </li>
            ))}
        </ul>
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
