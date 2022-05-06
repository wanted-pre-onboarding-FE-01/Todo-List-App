import PropTypes from 'prop-types'
import { FiEdit } from 'react-icons/fi'
import { MdDragIndicator } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { CheckIcon } from '../../assets/svgs'
import styles from './Todo.module.scss'

function Todo({ todo, handleTodoClick, handleChange, handleDeleteClick }) {
  // const todoColor =
  // const [openEditModal]

  return (
    <li key={todo.id} className={styles.task} onClick={handleTodoClick} aria-hidden='true'>
      <MdDragIndicator className={styles.dragIcon} color='lightgray' />
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={todo.isDone} data-id={todo.id} onChange={handleChange} readOnly />
        <CheckIcon />
      </div>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{todo.todo}</p>
        {todo.isDone ? (
          <div className={styles.lineThrough} />
        ) : (
          <div className={styles.buttonWrapper}>
            <FiEdit className={styles.editIcon} color='gray' />
            <RiDeleteBin5Fill
              className={styles.deleteIcon}
              color='gray'
              data-id={todo.id}
              onClick={handleDeleteClick}
            />
          </div>
        )}
      </div>
    </li>
  )
}

export default Todo

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    todo: PropTypes.string,
    categoryId: PropTypes.string,
    date: PropTypes.string,
    isDone: PropTypes.bool,
  }),
  handleTodoClick: PropTypes.func,
  handleChange: PropTypes.func,
  handleDeleteClick: PropTypes.func,
}
