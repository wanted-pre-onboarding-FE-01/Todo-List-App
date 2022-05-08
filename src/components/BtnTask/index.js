import styles from './BtnTask.module.scss'
import PropTypes from 'prop-types'
import { updateTodo, addTodo } from '../../utils/data/localStorage'
import { MdKeyboardArrowUp } from 'react-icons/md'

function BtnTask({modify, nickName, todo, navigate, beforePage, newTask}) {
  console.log(todo)
  const handleUpdateTask = () => {
    updateTodo(
      nickName,
      todo,
      { id: todo.id, todo: '수정된 todo 제목', categoryId: '2Business', date: '2022/12/31', isDone: false },
      { id: '2Business', categoryName: 'Business', color: '#7373eb' }
    )
    navigate(beforePage, { replace: true })
  }

  const handleAddTask = () => {
    addTodo(
      nickName,
      {
        id: `${Date.now()}${newTask}`,
        todo: newTask,
        categoryId: '2Business',
        date: '2022/11/31',
        isDone: false,
      },
      { id: '2Business', categoryName: 'Business', color: '#7373eb' }
    )
    navigate('/', { replace: true })
  }

  return(
    <button 
    type='button' 
    className={styles.addNewTeskBtn}
    onClick={modify ? handleUpdateTask : handleAddTask}
    >
      <span>{modify ? 'Modify task' : 'New task'}</span>
      <MdKeyboardArrowUp size='25' className={styles.arrowBtn} />
    </button>
  )
}

BtnTask.propTypes = {
  modify: PropTypes.bool,
  nickName: PropTypes.string.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired
  }),
  navigate: PropTypes.func.isRequired,
  beforePage: PropTypes.string,
  newTask: PropTypes.string.isRequired
}

export default BtnTask