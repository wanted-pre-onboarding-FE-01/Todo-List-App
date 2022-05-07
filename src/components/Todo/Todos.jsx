import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Todo from './Todo'
import styles from './Todos.module.scss'
import { getAllData, updateAllData, getUserByUserId } from '../../utils/data/localStorage'
import PropTypes from 'prop-types'

import { cx } from '../../styles'
import { SearchIcon } from '../../assets/svgs'
import EmptyTodoList from './EmptyTodoList'

function Todos({ todoListState, setTodoListState, category }) {
  const handleAddClick = (e) => {
    // console.log('handleAddClick')
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const handleChange = (e) => {
    const { dataset, checked } = e.currentTarget
    const { id } = dataset

    setTodoListState((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === id)
      const firstDoneTodoIndex = prev.findIndex((todo) => todo.isDone)
      const newList = [...prev]
      newList[targetIndex].isDone = checked

      if (!checked && firstDoneTodoIndex > -1) {
        if (targetIndex === 0 && firstDoneTodoIndex === prev.length) {
          return newList
        }
        const reorderedList = reorder(prev, targetIndex, firstDoneTodoIndex)
        return reorderedList
      }

      if (checked) {
        const reorderedList = reorder(prev, targetIndex, prev.length - 1)
        return reorderedList
      }

      return newList
    })
  }

  const handleDeleteClick = (e) => {
    const { dataset } = e.currentTarget
    const { id } = dataset
    setTodoListState((prev) => {
      const removedList = prev.filter((todo) => todo.id !== id)
      return removedList
    })
  }

  // search state and functions
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
    <ul className={styles.tasks}>
      <div className={styles.header}>
        <p className={styles.tasksTitle}>Today&apos;s</p>
        <div className={cx(styles.searchContainer, searchOpen && styles.searchOpen)}>
          {searchOpen && (
            <input className={styles.searchInput} placeholder='Search to do...' onChange={handleChangeSearchValue} />
          )}
          <SearchIcon onClick={handleToggleSearchBar} />
        </div>
      </div>
      <div className={styles.todosWrapper}>
        {todoListState.length === 0 && <EmptyTodoList />}
        {todoListState
          .filter((todo) => {
            if (!searchValue) {
              return true
            }
            return todo.todo.includes(searchValue)
          })
          .map((todo) => (
            <Todo
              key={todo.id}
              data-id={todo.id}
              todoList={todo}
              category={category}
              handleChange={handleChange}
              handleAddClick={handleAddClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
      </div>
    </ul>
  )
}

export default Todos

Todos.propTypes = {
  todoListState: PropTypes.arrayOf(PropTypes.arrayOf),
  setTodoListState: PropTypes.func,
  category: PropTypes.arrayOf(PropTypes.arrayOf),
}
