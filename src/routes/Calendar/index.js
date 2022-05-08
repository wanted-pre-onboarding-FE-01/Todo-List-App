import styles from './Calendar.module.scss'
import moment from 'moment'
import 'moment/locale/ko'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import CalendarModal from '../../components/CalendarModal'

function Calendar() {
  const [schedule, setSchedule] = useState({})
  const [date, setDate] = useState(moment())
  const [modalState, setModalState] = useState(false)
  const [todo, setTodo] = useState({})
  const [category, setCategory] = useState({})
  const today = moment()
  const navigate = useNavigate()

  const firstWeek = date.clone().startOf('month').week()
  const lastWeek = date.clone().endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week()

  const Weeks = () => {
    return Array(7)
      .fill(0)
      .map((_, i) => (
        <th key={i} className={styles.calendar}>
          {moment().day(i).format('dd')}
        </th>
      ))
  }

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todo'))

    const loginUser = todoList.find((el) => el.isLogined)

    setSchedule(loginUser)
  }, [])

  const getCategoryInfo = (categoryId) => {
    return schedule.data.category.find((item) => item.id === categoryId)
  }

  const clickHandler = (categoryName, todoName) => {
    setCategory(categoryName)
    setTodo(todoName)
    setModalState(true)
  }

  const navigateHandler = () => {
    navigate('/', { state: { userId: schedule.id, isNewUser: false } })
  }

  const Day = () => {
    const result = []
    let week = firstWeek

    for (week; week <= lastWeek; week += 1) {
      result.push(
        <tr key={`weeks_${week}`}>
          {Array(7)
            .fill(0)
            // eslint-disable-next-line no-loop-func
            .map((_, i) => {
              const days = date.clone().week(week).startOf('week').add(i, 'day')
              const isToday = today.format('YYYYMMDD') === days.format('YYYYMMDD')
              const todayTodo = schedule?.data?.todoList.filter((item) => item.date === days.format('YYYY/MM/DD'))

              return (
                <td className={cn({ [styles.today]: isToday })} key={`days_${i}`}>
                  {days.format('D')}
                  {todayTodo?.map((item) => {
                    const getCategory = getCategoryInfo(item.categoryId)

                    return (
                      <div
                        role='button'
                        tabIndex={0}
                        key={item.id}
                        onClick={() => clickHandler(getCategory, item)}
                        style={{ backgroundColor: getCategory.color }}
                      >
                        {item.todo}
                      </div>
                    )
                  })}
                </td>
              )
            })}
        </tr>
      )
    }
    return result
  }

  const buttonHandler = (e) => {
    const { name, value } = e.currentTarget
    setDate(date.clone().add(value, name))
  }

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.header}>
        <button type='button' onClick={navigateHandler}>
          🏠
        </button>
      </div>
      <div className={styles.display}>
        <button onClick={buttonHandler} name='Y' value={-1} type='button'>
          &lt;&lt;
        </button>
        <button onClick={buttonHandler} name='M' value={-1} type='button'>
          &lt;
        </button>
        {date.format('YYYY년 MM월')}
        <button onClick={buttonHandler} name='M' value={1} type='button'>
          &gt;
        </button>
        <button onClick={buttonHandler} name='Y' value={1} type='button'>
          &gt;&gt;
        </button>
      </div>
      <table className={styles.calendarTable} width='100px'>
        <thead>
          <tr>
            <Weeks />
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <Day />
        </tbody>
      </table>
      {modalState && (
        <CalendarModal nickname={schedule.userNickName} setModalState={setModalState} todo={todo} category={category} />
      )}
    </div>
  )
}

export default Calendar
