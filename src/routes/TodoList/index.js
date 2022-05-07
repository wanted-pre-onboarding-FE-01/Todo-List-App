import { useState } from 'react'
import styles from './TodoList.module.scss'
import Categories from '../../component/Categories'

function TodoList() {
  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <Categories />
      </div>
    </div>
  )
}

export default TodoList
