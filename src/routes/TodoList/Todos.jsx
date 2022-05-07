import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Todo from './Todo'
import styles from './Todos.module.scss'
import { getAllData, updateAllData, getUserByUserId } from '../../utils/data/localStorage'

import { cx } from '../../styles'
import { SearchIcon } from '../../assets/svgs'

const DATA = [
  {
    id: '1234sol',
    userNickName: 'sol',
    isLogined: true,
    data: {
      category: [
        { id: '1School', categoryName: 'School', color: '#A8A8A8' },
        { id: '2Business', categoryName: 'Business', color: '#7373eb' },
        { id: '3zip', categoryName: 'zip', color: '#FF5252' },
      ],
      todoList: [
        { id: '1아이스크림먹기', todo: '아이스크림먹기', categoryId: '1School', date: '2022/05/04', isDone: false },
        { id: '3과제하기', todo: '과제하기', categoryId: '2Business', date: '2022/05/03', isDone: false },
        { id: '12기상하기', todo: '기상하기', categoryId: '2Business', date: '2022/05/06', isDone: false },
        { id: '1234강의듣기', todo: '강의듣기', categoryId: '3zip', date: '2022/05/05', isDone: false },
        { id: '123러닝 다녀오기', todo: '러닝 다녀오기', categoryId: '3zip', date: '2022/05/05', isDone: false },
        {
          id: '1아234이스크림먹기',
          todo: '아이스크림먹기',
          categoryId: '1School',
          date: '2022/05/04',
          isDone: false,
        },
        { id: '3과232342제하기', todo: '과제하기', categoryId: '1School', date: '2022/05/03', isDone: false },
        { id: '12기상2357하기', todo: '기상하기', categoryId: '1School', date: '2022/05/06', isDone: false },
        { id: '1234강232343455의듣기', todo: '강의듣기', categoryId: '1School', date: '2022/05/05', isDone: false },
        {
          id: '123러닝324345678989867 다녀오기',
          todo: '러닝 다녀오기',
          categoryId: '1School',
          date: '2022/05/05',
          isDone: false,
        },
      ],
    },
  },
  {
    id: '1234sol33',
    userNickName: 'sol33',
    isLogined: false,
    data: {
      category: [
        { id: '1School', categoryName: 'School', color: '#A8A8A8' },
        { id: '2Business', categoryName: 'Business', color: '#7373eb' },
        { id: '3zip', categoryName: 'zip', color: '#FF5252' },
      ],
      todoList: [
        { id: '1아이스크림먹기', todo: '아이스크림먹기', categoryId: '1카테고리', date: '2022/05/04', isDone: false },
        { id: '3과제하기', todo: '과제하기', categoryId: '3카테고리', date: '2022/05/03', isDone: false },
        { id: '12기상하기', todo: '기상하기', categoryId: '1카테고리', date: '2022/05/06', isDone: false },
        { id: '1234강의듣기', todo: '강의듣기', categoryId: '2카테고리', date: '2022/05/05', isDone: false },
        { id: '123러닝 다녀오기', todo: '러닝 다녀오기', categoryId: '3카테고리', date: '2022/05/05', isDone: false },
      ],
    },
  },
]

function Todos() {
  // 현재 로그인한 사용자 정보
  const location = useLocation()
  const { state } = location
  // const { userId, isNewUser } = state

  // const DATA = getAllData()
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
          {searchOpen && <input placeholder='Search to do...' onChange={handleChangeSearchValue} />}
          <SearchIcon onClick={handleToggleSearchBar} />
        </div>
      </div>
      <div className={styles.todosWrapper}>
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
