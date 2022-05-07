import PropTypes from 'prop-types'
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs'
import styles from './Todo.module.scss'

function Todo({ todoList, category, handleTodoClick, handleChange, handleDeleteClick }) {
  const { id, todo, categoryId, date, isDone } = todoList
  const todoCategoryColor = category.filter((todoCategory) => todoCategory.id === categoryId)[0].color

  // const [openEditModal]

  return (
    <li key={id} className={styles.task} onClick={handleTodoClick} aria-hidden='true'>
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={isDone} data-id={id} onChange={handleChange} readOnly />
        {isDone ? (
          <BsCheckCircleFill className={styles.checkIcon} color={todoCategoryColor} />
        ) : (
          <BsCircle className={styles.notCheckedIcon} color={todoCategoryColor} />
        )}
      </div>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{todo}</p>
        {isDone ? (
          <div className={styles.lineThrough} />
        ) : (
          <div className={styles.buttonWrapper}>
            <button className={styles.editButton} type='button'>
              Edit
            </button>
            <button type='button' className={styles.deleteButton} data-id={id} onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default Todo

Todo.propTypes = {
  todoList: PropTypes.shape({
    id: PropTypes.string,
    todo: PropTypes.string,
    categoryId: PropTypes.string,
    date: PropTypes.string,
    isDone: PropTypes.bool,
  }),
  category: PropTypes.arrayOf(PropTypes.arrayOf),
  handleTodoClick: PropTypes.func,
  handleChange: PropTypes.func,
  handleDeleteClick: PropTypes.func,
}
