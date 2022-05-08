import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { deleteTodo } from '../../utils/data/localStorage'
import PropTypes from 'prop-types'
import styles from './CalendarModal.module.scss'
import { ModalCalendarIcon, ModalCheckIcon, ModalTrashIcon } from '../../assets/svgs'

const CalendarModal = function CalendarModal({ nickName, setModalState, todo, category }) {
  const handleCloseModal = () => {
    setModalState(false)
  }

  const handleDeleteTodo = () => {
    deleteTodo(nickName, todo)
    setModalState(false)
  }

  const changeDateFormat = (date) => {
    const changedFormatDate = date.split('/').join('-')
    return changedFormatDate
  }
  const changedDate = useMemo(() => changeDateFormat(todo.date), [todo])

  return (
    <>
      <div className={styles.modalBackground} />
      <section className={styles.modalMain}>
        {/* Children Part */}
        <p className={styles.modalCategory} style={{ backgroundColor: category.color }}>
          {category.categoryName}
        </p>
        <label htmlFor='todoName'>내용</label>
        <p id='todoName' className={styles.modalContent}>
          {todo.todo}
        </p>
        <label htmlFor='todoDate'>일정</label>
        <p id='todoDate' className={styles.modalContent}>
          {changedDate}
        </p>
        <div className={styles.buttonList}>
          <button type='button' onClick={handleCloseModal}>
            <ModalCheckIcon />
          </button>
          <button type='button'>
            <Link to='/updateTodo' state={{ todo, beforePage: '/calendar', modify: true }}>
              <ModalCalendarIcon />
            </Link>
          </button>
          <button type='button' onClick={handleDeleteTodo}>
            <ModalTrashIcon />
          </button>
        </div>
      </section>
    </>
  )
}

CalendarModal.propTypes = {
  nickName: PropTypes.string.isRequired,
  setModalState: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    categoryId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    todo: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default CalendarModal
