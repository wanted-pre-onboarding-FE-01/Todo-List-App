import styles from "./EditCategoryModal.module.scss"
import PropTypes from 'prop-types'
import { IoIosClose } from 'react-icons/io'
import { useState } from "react"

/** TODO
 * MORE_COLOR_LIST와 BRIEF_COLOR_LIST는 다른 파트분들과 공통으로 사용되는 데이터이다.
 * 따라서 데이터 관리를 논의해본 뒤, 리팩토링 예정이다.
 */
const MORE_COLOR_LIST = [ 
  { color: '#d4697b', isCheck: false }, { color: '#d27a56', isCheck: false }, { color: '#d1a345', isCheck: false }, { color: '#53a787', isCheck: false },
  { color: '#566dda', isCheck: false }, { color: '#8450da', isCheck: false }, { color: '#787d84', isCheck: false }, { color: '#f7d7de', isCheck: false },
  { color: '#f8dbcb', isCheck: false }, { color: '#f7eeb3', isCheck: false }, { color: '#d4f3d6', isCheck: false }, { color: '#d0e1fc', isCheck: false },
  { color: '#e0d1f7', isCheck: false }, { color: '#d9dbdb', isCheck: false }]

const BRIEF_COLOR_LIST = [ 
  { color: '#d4697b', isCheck: false }, { color: '#d27a56', isCheck: false }, { color: '#d1a345', isCheck: false }, { color: '#53a787', isCheck: false },
  { color: '#566dda', isCheck: false }]
  /** */

function EditCategoryModal({ isShow, category, close, edit, remove }) {

  const [moreOn, setMoreOn] = useState(false)
  const [colorList, setColorList] = useState(BRIEF_COLOR_LIST)

  const [selectColor, setSelectColor] = useState(category.color)
  const [categoryName, setCategoryName] = useState(category.categoryName)
  const categoryNameChangeHandler = (e) => {
    setCategoryName(e.currentTarget.value)
  }

  const moreButtonHandler = () => {
    setMoreOn(prev => !prev)
    setColorList(prev => prev.length === MORE_COLOR_LIST.length ? BRIEF_COLOR_LIST : MORE_COLOR_LIST)
  }

  const colorSelectHandler = (e) => {
    const {dataset} = e.currentTarget
    setColorList(prev => {
      const newColorList = [...prev]
      newColorList.forEach((val) => { val.color === dataset.id ? val.isCheck = true : val.isCheck = false})
      return newColorList
    })
    setSelectColor(dataset.id)
  }

  return(
    <div className={isShow ? styles.backBoard : styles.modalOff}>
      <div className={styles.main}>
        <div className={styles.closeBtnWrapper}>
          <IoIosClose color="#A8A8A8" className={styles.closeBtn} onClick={close}/>
        </div>
        <ul className={styles.colorCircleList} >
          {colorList.map((color) => 
            <li key={`color_index_${color.id}`} className={styles.colorCircle}>
              <button
                type='button'
                aria-label="Select color"
                className={styles.circle}
                data-id={color.color}
                style={{backgroundColor: color.color, border: color.isCheck && '4px solid #A8A8A8'}} 
                onClick={colorSelectHandler}
              />
            </li>)}
          {!moreOn && 
            <li className={styles.colorCircle}>
              <button type='button' className={styles.addColor} onClick={moreButtonHandler} aria-label="More button"/>
            </li>}
        </ul>
        <div className={styles.inputWrapper}>
          <input type='text' value={categoryName} maxLength={20} placeholder={category.categoryName} onChange={categoryNameChangeHandler}/>
        </div>
        <div className={styles.btnsWrapper}>
          <button type='button' className={styles.btn} onClick={() => edit(category.id, categoryName, selectColor )}>Edit</button>
          <button type='button' className={styles.btn} onClick={() => remove(category.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

EditCategoryModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  close: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default EditCategoryModal