import { useState } from 'react'
import { CheckIcon } from '../../assets/svgs'
import styles from './TodoList.module.scss'
import Todos from './Todos'

function TodoList() {
  const handleAddClick = (e) => {
    // console.log('handleAddClick')
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <h1>Hi! this is your assignment.</h1>
        <Todos />
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
