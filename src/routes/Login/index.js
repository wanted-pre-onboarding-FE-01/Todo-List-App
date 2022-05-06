import React, { useState } from 'react'
import { cx } from '../../styles'
import styles from './Login.module.scss'

function Login() {
  const [userName, setUserName] = useState('')
  const [isAvailableName, setIsAvailableName] = useState(false)

  const checkUserNameValidation = (nickName) => {
    const regExp = /^[가-힣a-z0-9_-]{1,15}$/
    return regExp.test(nickName)
  }

  const onChangeInputValue = (e) => {
    setUserName(e.currentTarget.value)
    setIsAvailableName(checkUserNameValidation(e.currentTarget.value))
  }

  console.log(isAvailableName)

  return (
    <div className={styles.loginWrapper}>
      <p className={styles.loginTitle}>닉네임을 입력해주세요</p>
      <input maxLength={15} onChange={onChangeInputValue} className={styles.loginInput} />
      {/* <p className={`${styles.warningMessage} ${isAvailableName ? styles.displayNone : ''}`}>
        닉네임 형식에 맞지 않습니다
      </p> */}
      <p className={cx('warningMessage')}>닉네임 형식에 맞지 않습니다</p>
      <div className={styles.loginBtn}>Login</div>
    </div>
  )
}

export default Login
