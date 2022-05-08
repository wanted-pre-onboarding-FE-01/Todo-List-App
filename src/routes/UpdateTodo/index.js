import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'

import styles from './UpdateTodo.module.scss'

import Box from '../../components/Box'
import BtnCategory from '../../components/BtnCategory'
import BtnTask from '../../components/BtnTask'
import BtnClose from '../../components/BtnClose'

const strData = localStorage.getItem('todo')
const data = JSON.parse(strData)
const nickName = data[0].userNickName

function TodoList() {
  const location = useLocation()
  const navigate = useNavigate()

  const [isBoxOpen, setBoxOpen] = useState(false)
  const [todo, setTodo] = useState(undefined)
  const [beforePage, setBeforePage] = useState(undefined)
  const [modify, setModify] = useState(undefined)
  const [selectCategoryName, setSelectCategoryName] = useState('Select Category')
  const [selectCategoryColor, setSelectCategoryColor] = useState('#aaaaaa')

  useEffect(() => {
    if (location.state) {
      setTodo(location.state.todo)
      setBeforePage(location.state.beforePage)
      setModify(location.state.modify)
    }
  }, [location.state])

  const handleClickClose = () => {
    navigate(beforePage, { replace: true })
  }

  const handleClickCategoryBtn = () => {
    setBoxOpen(prev => !prev)
  }

  return (
    <>
      <BtnClose handleClickClose={handleClickClose} />
      <section className={styles.textWrapper}>
        <input type='text' placeholder='Enter new task.' defaultValue={todo ? todo.todo : ''} />
      </section>
      <main className={styles.selectedWrapper}>
        <div className={styles.selectedBtnsWrapper}>
          {/* 추후에 변경 */}
          {/* <BtnCalendar forUpdateDate={moment().format('YYYY/MM/DD')}/> */}
          <button type='button' className={styles.delete}>{todo ? todo.date : moment().format('YYYY/MM/DD')}</button>
          <BtnCategory 
            handleClickCategoryBtn={handleClickCategoryBtn}
            todo={todo}
            data={data}
            selectCategoryName={selectCategoryName}
            selectCategoryColor={selectCategoryColor} 
          />
        </div>
        <div className={styles.selectedListWrapper}>
          {isBoxOpen && 
            <Box 
              setBoxOpen={setBoxOpen} 
              data={data}
              setSelectCategoryName={setSelectCategoryName}
              setSelectCategoryColor={setSelectCategoryColor}
            />}
        </div>
      </main>
      <BtnTask 
        modify={modify} 
        nickName={nickName} 
        todo={todo}
        navigate={navigate}
        beforePage={beforePage}
      />
    </>
  )
}

export default TodoList
