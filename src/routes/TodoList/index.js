import styles from './TodoList.module.scss'
import Todos from '../../components/Todo/Todos'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CheckIcon } from '../../assets/svgs'
import Categories from '../../components/Categories'

import { getIsLoginedUserByUserId, getTodayTodosByUserId, getTodayTodosByNickName, getCategoryByNickNameAndCategoryId, getPastTodosByNickName, updateTodosByUserId } from '../../utils/data/localStorage'

/* addCategory */

import AddCategory from '../../components/addCategoryModal/addCategoryModal'
import AddCategoryModalSubmit from '../../components/addCategoryModal/addCategoryModalSubmit'
import PastTodoModal from '../../components/PastTodoModal'
import { usePastTodoModal } from '../../hooks/PastTodoModal'

function TodoList() {
  // 현재 로그인한 사용자 정보
  const location = useLocation()
  const { state } = location

  /** TODO !
   * const { userId, isNewUser } = state 
   * 로그인 페이지 연결하면서 주석 해제하여 사용하도록 합니다.
   * newUser일 경우에 대한 35라인 getIsLoginedUserByUserId(..) 호출에 분기를 추가해야합니다.
  */

  const userId = '1234sol'

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
        <Categories userId={userId} nickName={currentLoginedUser.userNickName} setTodoListState={setTodoListState}/>
        <Todos todoListState={todoListState} setTodoListState={setTodoListState} category={category} />
        <PastTodoModal isShow={isShow} data={getPastTodosByNickName(currentLoginedUser.userNickName)} nickName={currentLoginedUser.userNickName} close={close} submit={submit} getCategoryByNickNameAndId={getCategoryByNickNameAndCategoryId} />
        <button type='button' className={styles.addButton} onClick={openModal} aria-label='Add button' />
        <AddCategory open={modalOpen} close={closeModal}>
          <AddCategoryModalSubmit />
        </AddCategory>
      </div>
    </div>
  )
}

export default TodoList
