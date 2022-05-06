import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Todo from './Todo'
import styles from './Todos.module.scss'

const TODO_LIST = [
  {
    id: 'something',
    todo: 'todo 내용을 좀 더 길게 적어볼까 ㅏㅎ하하',
    categoryId: 'some string',
    date: '2022/00/00',
    isDone: false,
  },
  {
    id: 'must be',
    todo: '수정 버튼 구현하기 + 디자인',
    categoryId: 'some string',
    date: '2022/00/00',
    isDone: false,
  },
  {
    id: 'unique',
    todo: '카테고리 색을 prop으로 받기',
    categoryId: 'some string',
    date: '2022/00/00',
    isDone: false,
  },
]

function Todos() {
  // 현재 로그인한 사용자 정보
  // const location = useLocation()
  // const { state } = location

  const [todoList, setTodoList] = useState(TODO_LIST)
  // const grid = TODO_LIST.length

  useEffect(() => {
    // localStorage에 저장
  }, [todoList])

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

    setTodoList((prev) => {
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
    setTodoList((prev) => {
      const removedList = prev.filter((todo) => todo.id !== id)
      return removedList
    })
  }

  return (
    <ul className={styles.tasks}>
      <p className={styles.tasksTitle}>Today&apos;s</p>
      {todoList.map((todo, index) => (
        <Todo
          key={todo.id}
          data-id={todo.id}
          todo={todo}
          handleChange={handleChange}
          handleAddClick={handleAddClick}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </ul>
  )
}

export default Todos
