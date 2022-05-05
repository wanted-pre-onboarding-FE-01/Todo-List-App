import styles from './Login.module.scss'

function Login() {
  return (
    <div className={styles.loginWrapper}>
      <p className={styles.loginTitle}>닉네임을 입력해주세요</p>
      <input className={styles.loginInput} />
      <p className={styles.warningMessasge}>닉네임은 15자 이하로 설정해주세요</p>
      <div className={styles.loginBtn}>Login</div>
    </div>
  )
}

export default Login
