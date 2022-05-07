import { useState } from 'react'
import { SearchIcon } from '../../assets/svgs'
import styles from './TodoList.module.scss'
import { cx } from '../../styles'
import { getUserByUserId } from '../../utils/data/localStorage'

function TodoList() {
  const handleAddClick = () => {
    // console.log('handleAddClick')
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

  // Test Get data from localStage
  const USER_ID = '1234sol'
  const data = getUserByUserId(USER_ID)

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
          {data.data.todoList
            .filter((todo) => {
              if (!searchValue) {
                return true
              }
              return todo.todo.includes(searchValue)
            })
            .map((todo) => (
              <div key={todo.id}>{todo.todo}</div>
            ))}
        </ul>
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
