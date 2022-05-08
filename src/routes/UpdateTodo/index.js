import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'

import styles from './UpdateTodo.module.scss'

import BtnCalendar from '../../components/BtnCalendar'
import Box from '../../components/Box'
import BtnCategory from '../../components/BtnCategory'
import BtnTask from '../../components/BtnTask'
import BtnClose from '../../components/BtnClose'

const strData = localStorage.getItem('todo')
const data = JSON.parse(strData)
const nickName = data ? data[0].userNickName : ''

function UpdateTodo() {
  const location = useLocation()
  const navigate = useNavigate()

  const [isBoxOpen, setBoxOpen] = useState(false)
  const [todo, setTodo] = useState(undefined)
  const [beforePage, setBeforePage] = useState(undefined)
  const [modify, setModify] = useState(undefined)
  const [newTask, setNewTask] = useState('')
  const [selectCategoryName, setSelectCategoryName] = useState('Select Category')
  const [selectCategoryColor, setSelectCategoryColor] = useState('#aaaaaa')

  useEffect(() => {
    if (location.state) {
      setTodo(location.state.todo)
      setBeforePage(location.state.beforePage)
      setModify(location.state.modify)
    }
  }, [location.state])

  const getDate = (date) => {
    console.log('getDate', date)
  }

  const handleClickClose = () => {
    navigate(beforePage, { replace: true })
  }

  const handleClickCategoryBtn = () => {
    setBoxOpen((prev) => !prev)
  }

  const handleChangeInput = (e) => {
    setNewTask(e.currentTarget.value)
  }

  return (
    <>
      <BtnClose handleClickClose={handleClickClose} />
      <section className={styles.textWrapper}>
        <input
          type='text'
          placeholder='Enter new task.'
          defaultValue={todo ? todo.todo : ''}
          onChange={handleChangeInput}
        />
      </section>
      <main className={styles.selectedWrapper}>
        <div className={styles.selectedBtnsWrapper}>
          <BtnCalendar getDate={getDate} forUpdateDate={todo ? todo.date : moment().format('YYYY/MM/DD')} />
          <BtnCategory
            handleClickCategoryBtn={handleClickCategoryBtn}
            todo={todo}
            data={data}
            selectCategoryName={selectCategoryName}
            selectCategoryColor={selectCategoryColor}
          />
        </div>
        <div className={styles.selectedListWrapper}>
          {isBoxOpen && (
            <Box
              setBoxOpen={setBoxOpen}
              data={data}
              setSelectCategoryName={setSelectCategoryName}
              setSelectCategoryColor={setSelectCategoryColor}
            />
          )}
        </div>
      </main>
      <BtnTask
        modify={modify}
        nickName={nickName}
        todo={todo}
        navigate={navigate}
        beforePage={beforePage}
        newTask={newTask}
      />
    </>
  )
}

export default UpdateTodo
