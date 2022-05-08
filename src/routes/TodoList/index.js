import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Categories from '../../components/Categories'
import PastTodoModal from '../../components/PastTodoModal'
import Todos from '../../components/Todo/Todos'
import { usePastTodoModal } from '../../hooks/PastTodoModal'
import {
  getCategoryByNickNameAndCategoryId,
  getIsLoginedUserByUserId,
  getPastTodosByNickName,
  getTodayTodosByUserId,
  updateTodosByUserId,
} from '../../utils/data/localStorage'
import styles from './TodoList.module.scss'

function TodoList() {
  // 현재 로그인한 사용자 정보
  const location = useLocation()
  const { state } = location

  /** TODO !
   * const { userId, isNewUser } = state
   * 로그인 페이지 연결하면서 주석 해제하여 사용하도록 합니다.
   * newUser일 경우에 대한 35라인 getIsLoginedUserByUserId(..) 호출에 분기를 추가해야합니다.
   */
  const { userId, isNewUser } = state

  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  const currentLoginedUser = getIsLoginedUserByUserId(userId)

  const currentLoginedUserData = currentLoginedUser.data
  const { category, todoList } = currentLoginedUserData

  const [todoListState, setTodoListState] = useState(getTodayTodosByUserId(userId))
  // const USER_ID = getUserByUserId(TODO_LIST)

  const [isShow, submit, close] = usePastTodoModal(currentLoginedUser.userNickName, setTodoListState)

  useEffect(() => {
    updateTodosByUserId(userId, todoListState)
  }, [todoListState])

  const handleAddClick = () => {
    // console.log('handleAddClick')
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <Categories
          userId={userId}
          isNewUser={isNewUser}
          nickName={currentLoginedUser.userNickName}
          setTodoListState={setTodoListState}
        />
        <Todos todoListState={todoListState} setTodoListState={setTodoListState} category={category} />
        <PastTodoModal
          isShow={isShow}
          data={getPastTodosByNickName(currentLoginedUser.userNickName)}
          nickName={currentLoginedUser.userNickName}
          close={close}
          submit={submit}
          getCategoryByNickNameAndId={getCategoryByNickNameAndCategoryId}
        />
        <Link to='/updateTodo' state={{todoListState, todoList, beforePage: '/calendar', modify: false }}>
          <button type='button' className={styles.addButton} onClick={openModal} aria-label='Add button' />
        </Link>
        {/* <button type='button' className={styles.addButton} onClick={openModal} aria-label='Add button' /> */}
      </div>
    </div>
  )
}

export default TodoList
