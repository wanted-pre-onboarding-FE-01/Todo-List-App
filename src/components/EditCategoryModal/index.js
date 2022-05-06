import styles from "./EditCategoryModal.module.scss"
import PropTypes from 'prop-types'
import { IoIosClose } from 'react-icons/io'


function EditCategoryModal({ isShow = true }) {


  return(
    <div className={isShow ? styles.backBoard : styles.modalOff}>
      <div className={styles.main}>
        <div className={styles.closeBtnWrapper}>
          <IoIosClose className={styles.closeBtn} />
        </div>
        <ul className={styles.colorCircleList} >
          <li className={styles.colorCircle}><div className={styles.circle} style={{backgroundColor: '#8DB4FF'}} /></li>
          <li className={styles.colorCircle}><div className={styles.circle} style={{backgroundColor: '#FF9DB3'}} /></li>
          <li className={styles.colorCircle}><div className={styles.circle} style={{backgroundColor: '#FFAB8A'}} /></li>
          <li className={styles.colorCircle}><div className={styles.circle} style={{backgroundColor: '#FFDE79'}} /></li>
          <li className={styles.colorCircle}><div className={styles.circle} style={{backgroundColor: '#B38FEE'}} /></li>
          <li className={styles.colorCircle}><div className={styles.circle} style={{backgroundColor: '#8DB4FF'}} /></li>
          <li className={styles.colorCircle}><div className={styles.circle} style={{backgroundColor: '#FF9DB3'}} /></li>
          <li className={styles.colorCircle}><div className={styles.circle} style={{backgroundColor: '#FFAB8A'}} /></li>
          <li className={styles.colorCircle}><div className={styles.addColor} /></li>
        </ul>
        <div className={styles.inputWrapper}>
          <input type='text' placeholder='새로운 카테고리 이름'/>
        </div>
        <div className={styles.btnsWrapper}>
          <button type='button' className={styles.btn} >Edit</button>
          <button type='button' className={styles.btn} >Delete</button>
        </div>
      </div>
    </div>
  )
}

EditCategoryModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
}

export default EditCategoryModal