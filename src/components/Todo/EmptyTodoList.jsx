import styles from './EmptyTodoList.module.scss'

function EmptyTodoList() {
  return <div className={styles.emptyTask}>+ 버튼을 눌러서 추가해주세요.</div>
}

export default EmptyTodoList
