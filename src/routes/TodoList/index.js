import styles from './TodoList.module.scss'
import Todos from '../../components/Todo/Todos'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CheckIcon } from '../../assets/svgs'
import Categories from '../../components/Categories'
import { getAllData, updateAllData, getUserByUserId } from '../../utils/data/localStorage'
/* addCategory */
import AddCategory from '../../components/addCategoryModal/addCategoryModal'
import AddCategoryModalSubmit from '../../components/addCategoryModal/addCategoryModalSubmit'

function TodoList() {
  // 현재 로그인한 사용자 정보
  const location = useLocation()
  const { state } = location
  // const { userId, isNewUser } = state
  // const DATA = getAllData()
  /* addCategory */
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
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
  ]

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
        <Categories
          currentLoginedUser={currentLoginedUser}
          todoListState={todoListState}
          setTodoListState={setTodoListState}
          category={category}
        />
        <Todos todoListState={todoListState} setTodoListState={setTodoListState} category={category} />
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
