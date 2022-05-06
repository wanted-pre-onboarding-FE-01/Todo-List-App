import React, { useState } from 'react'
import { cx } from '../../styles'
import styles from './Login.module.scss'

const BASIC_DATA = {
  id: '',
  userNickName: '',
  isLogined: false,
  data: {
    category: [],
    todoList: [],
  },
}

function Login() {
  const [userName, setUserName] = useState('')
  const [isAvailableName, setIsAvailableName] = useState(true)
  const [userId, setUserId] = useState('')

  const checkUserNameValidation = (nickName) => {
    const regExp = /^[가-힣a-z0-9_-]{1,15}$/
    return regExp.test(nickName)
  }

  const onChangeInputValue = (e) => {
    setUserName(e.currentTarget.value)
    setIsAvailableName(checkUserNameValidation(e.currentTarget.value))
  }

  const onClickLoginBtn = () => {
    const item = JSON.parse(localStorage.getItem('todo'))
    try {
      if (item === null) {
        const newUser = { ...BASIC_DATA, userNickName: userName, id: `${new Date().getMilliseconds()}${userName}` }
        localStorage.setItem('todo', JSON.stringify([newUser]))
      } else if (item.map((el) => el.userNickName).includes(userName)) {
        const loginUser = item.find((el) => el.userNickName === userName)
        setUserId(loginUser.id)
      } else {
        const newUser = { ...BASIC_DATA, userNickName: userName, id: `${new Date().getMilliseconds()}${userName}` }
        localStorage.setItem('todo', JSON.stringify([...item, newUser]))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <p className={styles.loginTitle}>닉네임을 입력해주세요</p>
      <input maxLength={15} onChange={onChangeInputValue} className={styles.loginInput} />
      <p className={cx(styles.warningMessage, isAvailableName ? styles.displayNone : null)}>
        닉네임 형식에 맞게 입력해주세요.
      </p>
      <button type='button' onClick={onClickLoginBtn} className={styles.loginBtn}>
        Login
      </button>
    </div>
  )
}

export default Login
